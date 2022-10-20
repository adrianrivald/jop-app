import { Queue } from './queue';
import { Network } from './network';
import { ACCEPTED_STATUS_CODE, INTERNAL_ERROR_STATUS_CODE, MESSAGE_TYPE, NOT_MODIFIED_STATUS_CODE } from '../CONSTANTS';
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
    this._onRequestError = this._onRequestError.bind(this);
    this._handle = this._handle.bind(this);
    this.wbHandler = this.wbHandler.bind(this);
    this.registerSyncListener = this.registerSyncListener.bind(this);
  }

  /**
   * @param {Request} request
   * @param {Error} error
   * @return {Promise<Response<any, Record<string, any>, number>>}
   * @private
   */
  async _onRequestError(request, error) {
    const isSafeMethod = _SAFE_METHOD.includes(request.method);

    const reqObj = await RequestObject.fromRequest(request);
    this._queue.push(reqObj.toJSON());

    if (isSafeMethod) {
      return new Response(null, {
        status: NOT_MODIFIED_STATUS_CODE,
        statusText: error.message,
      });
    }
    return new Response(error.message, {
      status: ACCEPTED_STATUS_CODE,
      statusText: 'pending',
    });
  }

  /**
   * @param {Request} request
   * @param {fetch} thisFetch
   * @param {boolean} noCache
   * @return {Promise<Response>}
   * @private
   */
  async _handle(request, thisFetch, noCache = false) {
    const isSafeMethod = _SAFE_METHOD.includes(request.method);
    try {
      const res = await thisFetch(request);

      if (res.status === 502) {
        return this._onRequestError(request, new Error('server gateway error'));
      }

      if (isSafeMethod) {
        const cache = await caches.open(_CACHE_NAME);
        await cache.put(request, res.clone());
      }

      return res;
    } catch (err) {
      if (isSafeMethod) {
        if (noCache) {
          return this._onRequestError(request, err);
        }

        const cache = await caches.open(_CACHE_NAME);
        const res = await cache.match(request);
        if (res) {
          return res;
        }
      }

      return this._onRequestError(request, err);
    }
  }

  async wbHandler(request, handler) {
    return this._handle(request, handler.fetch.bind(handler));
  }

  registerSyncListener() {
    self.addEventListener('sync', async (event) => {
      if (event.tag === 'sync-fetch') {
        event.waitUntil(this._didOnline());
      }
    });
  }

  register() {
    if (typeof self === 'undefined') {
      console.error('cannot listen, self undefined!');
      return;
    }

    this._network.on('online', this._didOnline);
    this.registerSyncListener();

    console.info('Fetch listener registered!');
  }

  async _didOnline() {
    for await (const reqObj of this._queue.entries()) {
      const req = RequestObject.fromJSON(reqObj).toRequest();

      this._handle(req, fetch, true).then(async (res) => {
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
      });
    }
  }
}
