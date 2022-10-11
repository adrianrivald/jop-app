import { EventEmitter } from 'events';

const EVENT_LOCK = 'lock';
const EVENT_UNLOCK = 'unlock';
const EVENT_PUSH = 'push';
const _IDB_NAME = 'queue';
const _IDB_STORE_NAME = 'queueContainer';

export class Queue {
  _ee = new EventEmitter();
  _isLocked = false;
  _localQueue = [];

  _IDBTempQueue = [];

  /**
   * @type {IDBDatabase}
   * @private
   */
  _db;

  constructor() {
    this._handleLock = this._handleLock.bind(this);
    this._handleUnlock = this._handleUnlock.bind(this);
    this._handlePush = this._handlePush.bind(this);
    this._handleIDBSuccess = this._handleIDBSuccess.bind(this);
    this._handleIDBUpgradeNeeded = this._handleIDBUpgradeNeeded.bind(this);

    this._ee.on(EVENT_LOCK, this._handleLock);
    this._ee.on(EVENT_UNLOCK, this._handleUnlock);
    this._ee.on(EVENT_PUSH, this._handlePush);

    const dbReq = indexedDB.open(_IDB_NAME, 1);
    dbReq.onsuccess = this._handleIDBSuccess;
    dbReq.onupgradeneeded = this._handleIDBUpgradeNeeded;
  }

  _handleIDBSuccess(e) {
    this._db = e.target.result;

    console.info('IDB instantiated!');
  }

  _handleIDBUpgradeNeeded(e) {
    const thisDB = e.target.result;

    if (!thisDB.objectStoreNames.contains(_IDB_STORE_NAME)) {
      thisDB.createObjectStore(_IDB_STORE_NAME, { autoIncrement: true });
    }

    if (this._localQueue.length) {
      const tx = thisDB.transaction(_IDB_STORE_NAME, 'readwrite');
      const store = tx.objectStore(_IDB_STORE_NAME);
      for (let req = this._localShift(); req !== undefined; req = this._localShift()) {
        store.add(req);
      }
    }

    console.info('IDB upgraded!');
  }

  _handleLock() {
    if (this._isLocked) {
      return;
    }

    this._isLocked = true;
  }

  _handleUnlock() {
    if (!this._isLocked) {
      return;
    }

    this._isLocked = false;
  }

  async _handlePush(req) {
    // add callback for queue to be unlocked if queue is locked
    if (this._isLocked) {
      this._ee.once(EVENT_UNLOCK, () => this.push(req));
      return;
    }

    this.lock();
    if (!this._db) {
      this._localQueue.push(req);
    } else {
      const tx = this._db.transaction(_IDB_STORE_NAME, 'readwrite');
      try {
        await new Promise((resolve, reject) => {
          const store = tx.objectStore(_IDB_STORE_NAME);
          const add = store.add(req);
          add.onsuccess = () => resolve();
          add.onerror = (err) => {
            reject(err);
          };
        });
        tx.commit();
      } catch (err) {
        console.error(err);
      }
    }
    this.unlock();
  }

  lock() {
    if (!this._isLocked) {
      this._ee.emit(EVENT_LOCK);
    }
  }

  unlock() {
    if (this._isLocked) {
      this._ee.emit(EVENT_UNLOCK);
    }
  }

  push(req) {
    this._ee.emit(EVENT_PUSH, req);
  }

  async *entries() {
    if (!this._db) {
      for (let req = this._localShift(); req !== undefined; req = this._localShift()) {
        yield await Promise.resolve(req);
      }

      return;
    }

    const tx = this._db.transaction(_IDB_STORE_NAME, 'readwrite');
    const store = tx.objectStore(_IDB_STORE_NAME);

    const queueKeys = await new Promise((resolve, reject) => {
      const data = store.getAllKeys();
      data.onsuccess = (e) => resolve(e.target.result);
      data.onerror = (e) => reject(e);
    });

    for (let key of queueKeys) {
      yield await new Promise((resolve, reject) => {
        const data = store.get(key);
        data.onsuccess = (e) => {
          const value = e.target.result;
          const req = store.delete(key);
          req.onsuccess = () => resolve(value);
        };
        data.onerror = (e) => reject(e);
      });
    }
  }

  _localShift() {
    if (this._localIsEmpty()) {
      return undefined;
    }
    return this._localQueue.shift();
  }

  _localIsEmpty() {
    return this._localQueue.length === 0;
  }
}
