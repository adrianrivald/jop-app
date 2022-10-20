/* eslint-disable no-restricted-globals */

import { Queue } from './queue';
import { Network } from './network';
import { FetchQueue } from './fetch-queue';
import { MessageChannel } from './message-channel';
import { Strategy, StrategyHandler } from 'workbox-strategies';

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

  /**
   * @type {string[]}
   * @private
   */
  _whitelistedURL;

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
    this.capture = this.capture.bind(this);
  }

  _handle(request, handler) {
    return this._fetchQueue.wbHandler(request, handler);
  }

  /**
   * @param {Request} request
   * @return {boolean}
   */
  capture({ request }) {
    const url = new URL(request.url);
    const parsedUrl = url.origin + url.pathname;

    if (this._whitelistedURL.includes(parsedUrl)) {
      return false;
    }

    return !['no-cors', 'navigate'].includes(request.mode) && url.origin !== self.location.origin;
  }

  /**
   * @param {string[]} whitelistedURL
   * @return {SW}
   */
  static register(whitelistedURL) {
    const fq = new SW();
    return fq._register(whitelistedURL);
  }

  /**
   * @param {string[]} whitelistedURL
   * @return {SW}
   */
  _register(whitelistedURL) {
    this._whitelistedURL = whitelistedURL || [];

    this._messageChannel.register();

    this._network.register();

    this._fetchQueue.register();

    return this;
  }
}
