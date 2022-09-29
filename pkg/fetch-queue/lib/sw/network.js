import { EventEmitter } from 'events';
import { MESSAGE_TYPE, NETWORK_STATE } from '../CONSTANTS';
import Message from '../dto/Message';

export class Network extends EventEmitter {
  _isOnline = false;

  constructor(props) {
    super(props);

    this._isOnline = navigator.onLine;

    this._onOnline = this._onOnline.bind(this);
    this._onOffline = this._onOffline.bind(this);
    this._onSWMessage = this._onSWMessage.bind(this);
    this.register = this.register.bind(this);
  }

  _onOffline() {
    if (this._isOnline) {
      this._isOnline = false;
      this.emit('offline');
    }
  }

  _onOnline() {
    if (!this._isOnline) {
      this._isOnline = true;
      this.emit('online');
    }
  }

  /**
   * @param {MessageEvent} e
   * @private
   */
  _onSWMessage(e) {
    const message = Message.fromObject(e.data);
    if (message.type === MESSAGE_TYPE.NETWORK_STATE) {
      switch (message.data) {
        case NETWORK_STATE.ONLINE:
          return this._onOnline();
        case NETWORK_STATE.OFFLINE:
          return this._onOffline();
      }
    }
  }

  get isOnline() {
    return this._isOnline;
  }

  register() {
    if (typeof self === 'undefined') {
      console.error('cannot listen, self undefined!');
      return;
    }

    self.addEventListener('message', this._onSWMessage);

    console.info('Network listener registered!');
  }
}
