export default class Message {
  /**
   * @type {number}
   * @private
   */
  type;

  /**
   * @type {any}
   * @private
   */
  data;

  /**
   * @param {number} type
   * @param {*} data
   */
  constructor({ type, data }) {
    this.type = type;
    this.data = data;
  }

  /**
   * @param {number} type
   * @param {*} data
   * @returns {Message}
   */
  static create({ type, data }) {
    return new Message({ type, data });
  }

  toObject() {
    return {
      data: this.data,
      type: this.type,
    };
  }

  /**
   * @param {Object} [obj]
   * @returns {Message}
   */
  static fromObject(obj) {
    if (typeof obj !== 'object') {
      return Message.create({ type: 0 });
    }

    if (Array.isArray(obj)) {
      return Message.create({ type: 0 });
    }

    return Message.create({ type: parseInt(obj.type), data: obj.data });
  }
}
