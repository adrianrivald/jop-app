/* eslint-disable no-restricted-globals */

import { Queue } from './queue';
import { Network } from './network';
import { FetchQueue } from './fetch-queue';
import { MessageChannel } from './message-channel';
import { Strategy } from 'workbox-strategies';

export default class SW extends Strategy {
  /**
   * @type {Network}
   * @private
   */
  _network;

  /**
   * @type {Queue}
   * @private
   */
  _queue;

  /**
   * @type {FetchQueue}
   * @private
   */
  _fetchQueue;

  /**
   * @type {MessageChannel}
   * @private
   */
  _messageChannel;

  constructor() {
    super();
    // Message Channel
    this._messageChannel = new MessageChannel();

    // Network listener
    this._network = new Network();

    // Queue
    this._queue = new Queue();

    // Fetch Queue
    this._fetchQueue = new FetchQueue(this._network, this._queue, this._messageChannel);

    this._register = this._register.bind(this);
  }

  _handle(request, handler) {
    return this._fetchQueue.wbHandler(request, handler);
  }

  static capture({ request }) {
    return !['no-cors', 'navigate'].includes(request.mode);
  }

  static register() {
    const fq = new SW();
    return fq._register();
  }

  _register() {
    this._messageChannel.register();

    this._network.register();

    this._fetchQueue.register();

    return this;
  }
}
