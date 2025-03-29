export default class ValidationError {
  /**
   *
   * @param {object} errors list of errors
   */
  constructor(errors) {
    this.errors = [errors];
  }
}
