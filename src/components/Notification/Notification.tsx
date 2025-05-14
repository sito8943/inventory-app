import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";

// provider
import { useNotification } from "../../providers/NotificationProvider";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWarning,
  faCircleCheck,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { NotificationEnumType } from "../../lib";

function Notification() {
  const { t } = useTranslation();

  const { notification, removeNotification } = useNotification();

  const onClose = useCallback(
    (index?: number) => removeNotification(index),
    [removeNotification],
  );

  const renderIcon = useCallback((type: NotificationEnumType) => {
    switch (type) {
      case NotificationEnumType.error:
        return faWarning;
      default: // success
        return faCircleCheck;
    }
  }, []);

  const textColor = useCallback((type: string) => {
    switch (type) {
      case "error":
        return "text-red-400";
      case "success":
        return "text-green-600";
      default:
        return "text-primary";
    }
  }, []);

  useEffect(() => {
    if (notification?.length) window.addEventListener("click", () => onClose());
    return () => {
      if (notification?.length)
        window.removeEventListener("click", () => onClose());
    };
  }, [notification, onClose]);

  return createPortal(
    <div
      className={`bottom-0 left-0 p-2 gap-2 flex flex-col justify-end items-start fixed z-30 ${
        notification?.length ? "w-screen h-screen" : ""
      } pointer-events-none`}
    >
      {notification?.length
        ? notification?.map(({ id, type, message }, i) => (
            <div
              key={id}
              className={`relative apparition z-10 bg-alt-background p-4 pl-2.5 rounded-2xl ${textColor(
                NotificationEnumType[type],
              )} pointer-events-auto flex justify-between gap-2 items-center min-w-40 max-xs:w-full`}
            >
              <div className="flex gap-3 items-center">
                <FontAwesomeIcon icon={renderIcon(type)} />
                <p className="whitespace-nowrap">{message}</p>
              </div>
              <button
                type="button"
                name={t("_accessibility:buttons.closeNotification")}
                aria-label={t("_accessibility:ariaLabels.closeNotification")}
              >
                <FontAwesomeIcon
                  icon={faClose}
                  className="text-primary hover:text-red-400 cursor-pointer"
                  onClick={() => onClose(i)}
                />
              </button>
            </div>
          ))
        : null}
    </div>,
    document.body,
  );
}

export default Notification;
