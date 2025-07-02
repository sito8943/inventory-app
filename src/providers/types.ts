import {ReactNode} from "react";

// lib
import {BaseEntityDto, NotificationType} from "lib"

// db
import {Tables} from "../db/types"
import Manager from "../db/Manager";

export type BasicProviderPropTypes = {
    children: ReactNode;
};

export type ManagerProviderContextType = {
    client: Manager;
};

export type ConfigProviderContextType = {
    data?: FileDataType;
    updateCache: <T = BaseEntityDto>(key: Tables, data: T[]) => void;
    loadCache: <T = BaseEntityDto>(key: Tables) => Promise<T[] | null>;
};

export type FileDataType = {
    [key in Tables]: BaseEntityDto[];
};

export type NotificationContextType = {
    notification: NotificationType[];
    removeNotification: (index?: number) => void;
    showErrorNotification: (options: NotificationType) => void;
    showNotification: (options: NotificationType) => void;
    showSuccessNotification: (options: NotificationType) => void;
    showStackNotifications: (notifications: NotificationType[]) => void;
};

export type NetworkProviderContextType = {
    connected: boolean;
    isLoading: boolean;
    sendPing: () => void;
}