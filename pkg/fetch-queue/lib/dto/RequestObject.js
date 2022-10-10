const _SAFE_METHOD = ['GET', 'HEAD'];

export default class RequestObject {
  /** @type {string} */
  body;

  /** @type {Record<string, string>} */
  headers;

  /** @type {string} */
  url;

  /** @type {RequestCache} */
  cache;

  /** @type {RequestCredentials} */
  credentials;

  /** @type {string} */
  integrity;

  /** @type {boolean} */
  keepalive;

  /** @type {string} */
  method;

  /** @type {RequestMode} */
  mode;

  /** @type {RequestRedirect} */
  redirect;

  /** @type {ReferrerPolicy} */
  referrer;

  /** @type {ReferrerPolicy} */
  referrerPolicy;

  /**
   * @param {RequestObjectJSON} req
   */
  constructor(req) {
    Object.assign(this, req);
  }

  /**
   * @param {Request} req
   * @return {Promise<RequestObject>}
   */
  static async fromRequest(req) {
    const reqClone = req.clone();

    const body = await reqClone.text();
    const headers = {};
    for (const pair of reqClone.headers.entries()) {
      headers[pair[0]] = pair[1];
    }

    return new RequestObject({
      body,
      headers,
      url: reqClone.url,
      cache: reqClone.cache,
      credentials: reqClone.credentials,
      integrity: reqClone.integrity,
      keepalive: reqClone.keepalive,
      method: reqClone.method,
      mode: reqClone.mode,
      redirect: reqClone.redirect,
      referrer: reqClone.referrer,
      referrerPolicy: reqClone.referrerPolicy,
    });
  }

  /**
   * @param {RequestObjectJSON} json
   * @return {RequestObject}
   */
  static fromJSON(json) {
    return new RequestObject(json);
  }

  /**
   * @return {RequestObjectJSON}
   */
  toJSON() {
    return {
      body: this.body,
      headers: this.headers,
      url: this.url,
      cache: this.cache,
      credentials: this.credentials,
      integrity: this.integrity,
      keepalive: this.keepalive,
      method: this.method,
      mode: this.mode,
      redirect: this.redirect,
      referrer: this.referrer,
      referrerPolicy: this.referrerPolicy,
    };
  }

  /**
   * @return {Request}
   */
  toRequest() {
    if (_SAFE_METHOD.includes(this.method)) {
      return new Request(new URL(this.url), {
        headers: this.headers,
        cache: this.cache,
        credentials: this.credentials,
        integrity: this.integrity,
        keepalive: this.keepalive,
        method: this.method,
        mode: this.mode,
        redirect: this.redirect,
        referrer: this.referrer,
        referrerPolicy: this.referrerPolicy,
      });
    }

    return new Request(new URL(this.url), {
      body: this.body,
      headers: this.headers,
      cache: this.cache,
      credentials: this.credentials,
      integrity: this.integrity,
      keepalive: this.keepalive,
      method: this.method,
      mode: this.mode,
      redirect: this.redirect,
      referrer: this.referrer,
      referrerPolicy: this.referrerPolicy,
    });
  }
}

/**
 * @typedef {Object} RequestObjectJSON
 *   @property{string} [body]
 *   @property{Record<string, string>} [headers]
 *   @property{string} url
 *   @property{RequestCache} [cache]
 *   @property{RequestCredentials} [credentials]
 *   @property{string} [integrity]
 *   @property{boolean} [keepalive]
 *   @property{string} method
 *   @property{RequestMode} [mode]
 *   @property{RequestRedirect} [redirect]
 *   @property{string} [referrer]
 *   @property{ReferrerPolicy} [referrerPolicy]
 */
