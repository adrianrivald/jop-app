import { Queue } from './queue';
import { Network } from './network';
import { MESSAGE_TYPE, NOT_MODIFIED_STATUS_CODE, ACCEPTED_STATUS_CODE, INTERNAL_ERROR_STATUS_CODE } from '../CONSTANTS';
import { MessageChannel } from './message-channel';
import Message from '../dto/Message';
import FetchResponseMessageData from '../dto/FetchResponseMessageData';
import RequestObject from '../dto/RequestObject';

const _SAFE_METHOD = ['GET', 'HEAD'];
const _CACHE_NAME = 'FETCH_QUEUE';

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

    this.register = this.register.bind(this);
    this._didOnline = this._didOnline.bind(this);
    this.registerPeriodicSync = this.registerPeriodicSync.bind(this);
  }

  async wbHandler(request, handler) {
    const isSafeMethod = _SAFE_METHOD.includes(request.method);
    if (navigator.onLine) {
      if (isSafeMethod) {
        return await handler.fetchAndCachePut(request);
      }

      return handler.fetch(request);
    }

    // On offline
    if (isSafeMethod) {
      const res = await handler.cacheMatch(request);
      if (res) {
        return res;
      }
    }

    try {
      const reqObj = await RequestObject.fromRequest(request);
      this._queue.push(reqObj.toJSON());

      if (isSafeMethod) {
        return new Response(null, {
          status: NOT_MODIFIED_STATUS_CODE,
          statusText: 'pending',
        });
      }
      return new Response(null, {
        status: ACCEPTED_STATUS_CODE,
        statusText: 'pending',
      });
    } catch (err) {
      if (isSafeMethod) {
        return new Response(err.message, {
          status: INTERNAL_ERROR_STATUS_CODE,
          statusText: 'pending',
        });
      }
      return new Response(err.message, {
        status: INTERNAL_ERROR_STATUS_CODE,
        statusText: 'pending',
      });
    }
  }

  registerPeriodicSync() {
    self.addEventListener('sync', (event) => {
      if (event.tag === 'sync-fetch') {
        if (navigator.onLine) {
          event.waitUntil(this._didOnline());
        }
      }
    });
  }

  register() {
    if (typeof self === 'undefined') {
      console.error('cannot listen, self undefined!');
      return;
    }

    this._network.on('online', this._didOnline);
    this.registerPeriodicSync();

    console.info('Fetch listener registered!');
  }

  async _didOnline() {
    for await (const reqObj of this._queue.entries()) {
      const req = RequestObject.fromJSON(reqObj).toRequest();
      fetch(req)
        .then(async (res) => {
          if (_SAFE_METHOD.includes(req.method)) {
            const cache = await caches.open(_CACHE_NAME);
            await cache.put(req, res.clone());
          }

          const t = await res.text();

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
}
