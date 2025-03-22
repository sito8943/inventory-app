import React from "react";
import { useTranslation } from "react-i18next";

function AddDialog(props) {
  const { t } = useTranslation();
  const { open = false, title, children, handleSubmit, handleClose } = props;

  return (
    <div
      name={t("_accessibility:buttons.closeDialog")}
      aria-label={t("_accessibility:ariaLabels.closeDialog")}
      className={`${
        open ? "w-screen h-screen" : "pointer-events-none"
      } fixed top-0 flex items-center justify-center z-10`}
      onClick={() => handleClose()}
    >
      <div
        className={`min-w-50 bg-alt-background p-5 rounded-2xl border-border border-2 ${
          open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <h3>{title}</h3>
        <form onSubmit={handleSubmit}>
          {children}
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
              className="outlined"
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
