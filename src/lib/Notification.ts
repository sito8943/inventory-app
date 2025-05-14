export enum NotificationEnumType {
  success,
  error,
}

export type NotificationType = {
  message: string;
  type: NotificationEnumType;
  id: number;
};
