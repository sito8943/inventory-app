import { ReactNode } from "react";

// lib
import { NotificationType } from "lib";

// db
import Manager from "../db/Manager";

export type BasicProviderPropTypes = {
  children: ReactNode;
};

export type ManagerProviderContextType = {
  client: Manager;
};

export type ConfigProviderContextType = {
  data: FileDataType;
};

export type FileDataType = {};

export type NotificationContextType = {
  notification: NotificationType[];
  removeNotification: (index?: number) => void;
  showErrorNotification: (options: NotificationType) => void;
  showNotification: (options: NotificationType) => void;
  showSuccessNotification: (options: NotificationType) => void;
  showStackNotifications: (notifications: NotificationType[]) => void;
};
