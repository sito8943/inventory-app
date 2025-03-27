import { useTranslation } from "react-i18next";

// component
import Dialog from "./Dialog";

function ConfirmationDialog(props) {
  const { t } = useTranslation();

  const { children, handleSubmit, ...rest } = props;

  return (
    <Dialog {...rest}>
      {children}
      <div className="flex gap-2 mt-5">
        <button
          onClick={handleSubmit}
          className="button submit primary"
          name={t("_accessibility:buttons.ok")}
          aria-label={t("_accessibility:ariaLabels.ok")}
        >
          {t("_accessibility:buttons.ok")}
        </button>
      </div>
    </Dialog>
  );
}

export default ConfirmationDialog;
