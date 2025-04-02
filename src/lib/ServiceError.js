export default class ServiceError {
  /**
   *
   * @param {object} options error options
   */
  constructor(options) {
    const { key } = options;
    this.key = key;
  }
}
