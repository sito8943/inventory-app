import { useTranslation } from "react-i18next";

// component
import { Dialog } from "./Dialog";

// types
import { ConfirmationDialogPropsType } from "./types.ts";

export const ConfirmationDialog = (props: ConfirmationDialogPropsType) => {
  const { t } = useTranslation();

  const { children, handleSubmit, handleClose, ...rest } = props;

  return (
    <Dialog {...rest} handleClose={handleClose}>
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
        <button
          type="button"
          onClick={handleClose}
          className="button outlined"
          name={t("_accessibility:buttons.cancel")}
          aria-label={t("_accessibility:ariaLabels.cancel")}
        >
          {t("_accessibility:buttons.cancel")}
        </button>
      </div>
    </Dialog>
  );
};
