import { Queue } from './queue';
import { Network } from './network';
import { MESSAGE_TYPE, PENDING_STATUS_CODE } from '../CONSTANTS';
import { MessageChannel } from './message-channel';
import Message from '../dto/Message';
import FetchResponseMessageData from '../dto/FetchResponseMessageData';

export class FetchQueue {
  /**
   * @type {Queue}
   */
  _queue;

  /**
   * @type {Network}
   */
  _network;

  /**
   * @type {MessageChannel}
   * @private
   */
  _messageChannel;

  /**
   *
   * @param {Network} network
   * @param {Queue} queue
   * @param {MessageChannel} messageChannel
   */

  constructor(network, queue, messageChannel) {
    this._queue = queue;
    this._network = network;
    this._messageChannel = messageChannel;

    this._onFetch = this._onFetch.bind(this);
    this.register = this.register.bind(this);
    this._didOnline = this._didOnline.bind(this);
  }

  register() {
    if (typeof self === 'undefined') {
      console.error('cannot listen, self undefined!');
      return;
    }

    self.addEventListener('fetch', this._onFetch);
    this._network.on('online', this._didOnline);

    console.info('Fetch listener registered!');
  }

  _didOnline() {
    for (let req = this._queue.shift(); req !== undefined; req = this._queue.shift()) {
      fetch(req)
        .then((res) => {
          res.text().then((t) => {
            this._messageChannel.postMessage(
              Message.create({
                type: MESSAGE_TYPE.FETCH_RESPONSE,
                data: FetchResponseMessageData.create({
                  url: req.url,
                  method: req.method,
                  status: res.status,
                  body: t,
                  contentType: res.headers.get('content-type'),
                }),
              })
            );
          });
        })
        .catch((err) => {
          this._messageChannel.postMessage(
            Message.create({
              type: MESSAGE_TYPE.FETCH_RESPONSE,
              data: FetchResponseMessageData.create({ url: req.url, method: req.method, error: err }),
            })
          );
        });
    }
  }

  /**
   * @param {FetchEvent} e
   * @private
   */
  _onFetch = async (e) => {
    if (e.request.mode === 'navigate') return;

    if (!navigator.onLine) {
      try {
        this._queue.push(e.request);
        return e.respondWith(
          new Response(null, {
            status: PENDING_STATUS_CODE,
            statusText: 'pending',
          })
        );
      } catch (err) {
        return e.respondWith(
          new Response(err.message, {
            status: PENDING_STATUS_CODE,
            statusText: 'pending',
          })
        );
      }
    }
  };
}
