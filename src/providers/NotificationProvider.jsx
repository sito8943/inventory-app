import { useContext, createContext, useReducer } from "react";

// lib
import { Notification, NotificationContext } from "../lib/Notification";

const NotificationContext = createContext({});

export function NotificationProvider(props) {
  const { children } = props;

  const [notification, dispatch] = useReducer((state, action) => {
    const { type, items, index } = action;

    switch (type) {
      case "set":
        return items;
      case "remove":
        if (index) return state.filter((_, i) => i !== index);
        return [];
    }
    return state;
  }, []);

  const showErrorNotification = (options) =>
    dispatch({
      type: "set",
      items: [new Notification({ ...options, type: "error" })],
    });

  const showNotification = (options) =>
    dispatch({
      type: "set",
      items: [new Notification({ ...options })],
    });

  const showStackNotifications = (notifications) =>
    dispatch({ type: "set", items: notifications });

  const showSuccessNotification = (options) =>
    dispatch({
      type: "set",
      items: [new Notification({ ...options, type: "success" })],
    });

  const removeNotification = (index) => dispatch({ type: "remove", index });

  return (
    <NotificationContext.Provider
      value={{
        notification,
        removeNotification,
        showErrorNotification,
        showNotification,
        showSuccessNotification,
        showStackNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

/**
 *
 * @returns {NotificationContext} notification context
 */
export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (context === undefined)
    throw new Error("NotificationContext must be used within a Provider");
  return context;
};
