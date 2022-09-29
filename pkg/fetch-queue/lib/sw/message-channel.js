import { MESSAGE_TYPE } from '../CONSTANTS';
import Message from '../dto/Message';

export class MessageChannel {
  /**
   * @type {WindowClient}
   * @private
   */
  _clientListenerPort;

  register() {}

  /**
   * @param {Message} message
   */
  postMessage(message) {
    self.clients
      .matchAll({
        includeUncontrolled: true,
        type: 'window',
      })
      .then((clients) => {
        if (clients && clients.length) {
          clients[0].postMessage(message.toObject());
          this._clientListenerPort = clients[0];
        } else {
          console.error("can't post message! client listener port undefined");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
