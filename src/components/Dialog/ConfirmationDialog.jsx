import React from "react";

function ConfirmationDialog() {
  return (
    <Dialog>
      {children}
      <div className="flex gap-2 mt-5">
        <button
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
