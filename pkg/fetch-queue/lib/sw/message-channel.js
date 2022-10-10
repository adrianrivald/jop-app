import { BC_NAME } from '../CONSTANTS';

export class MessageChannel {
  /**
   * @type {WindowClient}
   * @private
   */
  _clientListenerPort;

  /**
   * @type {BroadcastChannel}
   * @private
   */
  _bc;

  register() {
    this._bc = new BroadcastChannel(BC_NAME);
  }

  /**
   * @param {Message} message
   */
  postMessage(message) {
    this._bc.postMessage(message.toObject());
  }
}
