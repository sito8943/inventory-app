export class Notification {
  /**
   *
   * @param {object} options notification options
   */
  constructor(options) {
    const { message, type } = options;
    this.message = message;
    this.type = type;
    this.id = new Date().getTime();
  }
}

export class NotificationContextType {
  notification = [];
  removeNotification = () => {};
  showErrorNotification = () => {};
  showNotification = () => {};
  showStackNotifications = () => {};
  showSuccessNotification = () => {};
}
