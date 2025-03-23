import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

function AddDialog(props) {
  const { t } = useTranslation();
  const { open = false, title, children, handleSubmit, handleClose } = props;

  const onKeyPress = useCallback(
    (e) => {
      if (e.keyCode === 27 && open) {
        handleClose();
      }
    },
    [open, handleClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyPress);
    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };
  }, [onKeyPress]);

  return (
    <div
      name={t("_accessibility:buttons.closeDialog")}
      aria-label={t("_accessibility:ariaLabels.closeDialog")}
      className={`w-screen h-screen ${
        open ? "" : "pointer-events-none"
      } fixed top-0 flex items-center justify-center z-10`}
    >
      <div
        className={`min-w-70 bg-alt-background p-5 rounded-2xl border-border border-2 animated ${
          open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <h3 className="mb-5 text-white text-xl">{title}</h3>
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
      </div>
    </div>
  );
}

export default AddDialog;
