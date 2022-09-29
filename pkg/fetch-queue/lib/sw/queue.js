import { EventEmitter } from 'events';

const EVENT_LOCK = 'lock';
const EVENT_UNLOCK = 'unlock';
const EVENT_PUSH = 'push';

export class Queue {
  _ee = new EventEmitter();
  _isLocked = false;
  _queue = [];

  constructor() {
    this._handleLock = this._handleLock.bind(this);
    this._handleUnlock = this._handleUnlock.bind(this);
    this._handlePush = this._handlePush.bind(this);

    this._ee.on(EVENT_LOCK, this._handleLock);
    this._ee.on(EVENT_UNLOCK, this._handleUnlock);
    this._ee.on(EVENT_PUSH, this._handlePush);
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

  _handlePush(req) {
    // add callback for queue to be unlocked if queue is locked
    if (this._isLocked) {
      this._ee.once(EVENT_UNLOCK, () => this.push(req));
      return;
    }

    this.lock();
    this._queue.push(req);
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

  shift() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this._queue.shift();
  }

  isEmpty() {
    return this._queue.length === 0;
  }
}
