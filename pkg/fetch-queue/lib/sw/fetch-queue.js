import { Queue } from './queue';
import { Network } from './network';
import { ACCEPTED_STATUS_CODE, FETCH_TIMEOUT, MESSAGE_TYPE, NOT_MODIFIED_STATUS_CODE } from '../CONSTANTS';
import { MessageChannel } from './message-channel';
import Message from '../dto/Message';
import FetchResponseMessageData from '../dto/FetchResponseMessageData';
import RequestObject from '../dto/RequestObject';

const _SAFE_METHOD = ['GET', 'HEAD'];
const _CACHE_NAME = 'FETCH_QUEUE';

/**
 * @param {Request} request
 * @param timeout
 * @return {Promise<Response<any, Record<string, any>, number>>}
 */
async function fetchWithTimeout(request, timeout = FETCH_TIMEOUT) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(request, {
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
}

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
  async _handle(request, noCache = false) {
    const isSafeMethod = _SAFE_METHOD.includes(request.method);
    const clonedRequest = request.clone();
    try {
      const res = await fetchWithTimeout(request);

      if (res.status === 502) {
        return this._onRequestError(clonedRequest, new Error('server gateway error'));
      }

      if (isSafeMethod) {
        const cache = await caches.open(_CACHE_NAME);
        await cache.put(clonedRequest, res.clone());
      }

      return res;
    } catch (err) {
      if (isSafeMethod) {
        if (noCache) {
          return this._onRequestError(clonedRequest, err);
        }

        const cache = await caches.open(_CACHE_NAME);
        const res = await cache.match(clonedRequest);
        if (res) {
          return res;
        }
      }

      return this._onRequestError(clonedRequest, err);
    }
  }

  async wbHandler(request, handler) {
    return this._handle(request);
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

      this._handle(req, true).then(async (res) => {
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
