class ServiceErrorOptions {
  key = "";
  message = "";
}

export default class ServiceError {
  /**
   *
   * @param {ServiceErrorOptions} options error options
   */
  constructor(options) {
    const { key, message } = options;

    this.key = key;
    this.message = message;
  }
}
