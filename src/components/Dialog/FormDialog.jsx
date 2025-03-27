import { useTranslation } from "react-i18next";

// component
import Dialog from "./Dialog";

function FormDialog(props) {
  const { t } = useTranslation();
  const { children, handleSubmit, handleClose, ...rest } = props;

  return (
    <Dialog {...rest} handleClose={handleClose}>
      <form onSubmit={handleSubmit}>
        {children}
        <div className="flex gap-2 mt-5">
          <button
            type="submit"
            className="button submit primary"
            name={t("_accessibility:buttons.submit")}
            aria-label={t("_accessibility:ariaLabels.insert")}
          >
            {t("_accessibility:buttons.submit")}
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
      </form>
    </Dialog>
  );
}

export default FormDialog;
