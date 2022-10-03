export default class FetchResponseMessageData {
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
   * @type {?Error}
   * @private
   */
  error;

  /**
   * @type {number}
   * @private
   */
  status;

  /**
   * @type {string}
   * @private
   */
  body;

  /**
   * @type {string}
   * @private
   */
  contentType;

  /**
   * @param {string} url
   * @param {string} method
   * @param {number} status
   * @param {string} body
   * @param {string} contentType
   * @param {Error} [error]
   */
  constructor({ url, method, status, body, contentType, error }) {
    this.url = url;
    this.error = error;
    this.method = method;
    this.status = status;
    this.body = body;
    this.contentType = contentType;
  }

  /**
   * @param {string} url
   * @param {string} method
   * @param {number} [status]
   * @param {string} [body]
   * @param {string} [contentType]
   * @param {Error} [error]
   */
  static create({ url, method, status, body, contentType, error }) {
    return new FetchResponseMessageData({
      url,
      method,
      status: status || 500,
      body: body || '',
      contentType: contentType || '',
      error,
    });
  }

  /**
   * @param {Object} [obj]
   * @returns {FetchResponseMessageData}
   */
  static fromObject(obj) {
    if (typeof obj !== 'object') {
      return FetchResponseMessageData.create({
        url: '',
        method: '',
        error: new Error('event data not an object'),
        status: 500,
        contentType: 'text/html',
      });
    }

    if (Array.isArray(obj)) {
      return FetchResponseMessageData.create({
        url: '',
        method: '',
        error: new Error('event data is an array'),
        status: 500,
        contentType: 'text/html',
      });
    }

    return FetchResponseMessageData.create(obj);
  }
}
