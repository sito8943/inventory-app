import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

// provider
import { useNotification } from "../../providers/NotificationProvider";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWarning,
  faCircleCheck,
  faClose,
} from "@fortawesome/free-solid-svg-icons";

function Notification() {
  const { t } = useTranslation();

  const { notification, removeNotification, timer } = useNotification();

  const onClose = (index) => removeNotification(index);

  const renderIcon = useCallback((type) => {
    switch (type) {
      case "error":
        return faWarning;
      default: // success
        return faCircleCheck;
    }
  }, []);

  const textColor = useCallback((type) => {
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
    if (timer) setTimeout(() => onClose(), timer);
  }, [timer, onClose]);

  return (
    <div
      onClick={() => onClose()}
      name={t("_accessibility:buttons.closeOutsideNotification")}
      aria-label={t("_accessibility:ariaLabels.closeOutsideNotification")}
      className={`bottom-0 left-0 p-2 gap-2 flex flex-col justify-end items-start fixed z-10 ${
        notification?.length ? "w-screen h-screen" : "pointer-events-none"
      }`}
    >
      {notification?.length
        ? notification?.map(({ id, type, message }, i) => (
            <div
              key={id}
              className={`relative apparition z-10 bg-alt-background p-4 pl-2.5 rounded-2xl ${textColor(
                type
              )} flex justify-between gap-2 items-center min-w-40 max-xs:w-full`}
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
    </div>
  );
}

export default Notification;
