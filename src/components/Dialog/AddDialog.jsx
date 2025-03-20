import React from "react";
import { useTranslation } from "react-i18next";

function AddDialog(props) {
  const { t } = useTranslation();
  const { open = true, title, handleSubmit, handleClose } = props;

  return (
    <div
      name={t("_accessibility:buttons.closeDialog")}
      aria-label={t("_accessibility:ariaLabels.closeDialog")}
      className={`${
        open ? "w-screen h-screen" : "pointer-events-none"
      } fixed top-0 flex items-center justify-center z-10`}
      onClick={() => handleClose()}
    >
      <div className={`${open ? "opacity-100" : "opacity-0"}`}>
        <h3>{}</h3>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <button
              type="submit"
              className="submit primary"
              name={t("_accessibility:buttons.submit")}
              aria-label={t("_accessibility:ariaLabels.insert")}
            >
              {t("_accessibility:buttons.submit")}
            </button>
            <button
              type="button"
              onClick={handleClose}
              name={t("_accessibility:buttons.cancel")}
              aria-label={t("_accessibility:ariaLabels.cancel")}
            >
              {t("_accessibility:buttons.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDialog;
