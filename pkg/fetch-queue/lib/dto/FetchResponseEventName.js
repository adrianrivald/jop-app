import md5 from 'md5';

export default class FetchResponseEventName {
  /**
   * @type {string}
   * @private
   */
  method;

  /**
   * @type {!string}
   * @private
   */
  url;

  /**
   * @param {string} url
   * @param {string} method
   */
  constructor({ url, method }) {
    this.url = url;
    this.method = method;
  }

  /**
   * @param {string} url
   * @param {string} method
   */
  static create({ url, method }) {
    return new FetchResponseEventName({ url, method });
  }

  toString() {
    return md5(`${this.method.toLowerCase()} ${this.url}`);
  }
}
