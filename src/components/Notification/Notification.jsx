import { useEffect, useMemo } from "react";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

function Notification(props) {
  const { t } = useTranslation();

  const { type, timer, message, visible, onClose } = props;

  const renderIcon = useMemo(() => {
    switch (type) {
      case "error":
        return faWarning;
      default: // success
        return faCircleCheck;
    }
  }, [type]);

  const textColor = useMemo(() => {
    switch (type) {
      case "error":
        return "text-red-400";
      case "success":
        return "text-green-600";
      default:
        return "text-primary";
    }
  });

  useEffect(() => {
    if (timer && visible) setTimeout(() => onClose(), timer);
  }, [timer, onClose, visible]);

  return (
    <div
      onClick={onClose}
      name={visible ? t("_accessibility:buttons.closeNotification") : ""}
      aria-label={
        visible ? t("_accessibility:ariaLabels.closeNotification") : ""
      }
      className={`top-0 left-0 fixed ${
        visible ? "w-screen h-screen" : "pointer-events-none"
      }`}
    >
      <div
        className={`transition-all ease-in-out duration-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        } fixed z-10 left-[50%] -translate-x-[50%] bottom-18 bg-alt-background p-4 pl-2.5 rounded-2xl ${textColor} flex gap-2 items-center`}
      >
        <FontAwesomeIcon icon={renderIcon} />
        <p className="whitespace-nowrap">{message}</p>
      </div>
    </div>
  );
}

export default Notification;
