import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

// @emotion/css
import { css } from "@emotion/css";

function Dialog(props) {
  const { t } = useTranslation();
  const { open = false, title, children, handleClose } = props;

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const onKeyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && open) handleClose();
    },
    [open, handleClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyPress);
    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };
  }, [onKeyPress]);

  const onWindowsResize = useCallback(() => {
    setWindowSize(window.innerWidth);
  });

  useEffect(() => {
    window.addEventListener("resize", onWindowsResize);
    return () => {
      window.removeEventListener("resize", onWindowsResize);
    };
  }, [onWindowsResize]);

  const styles = useMemo(() => css({ width: `${windowSize}px` }));

  return (
    <div
      name={t("_accessibility:buttons.closeDialog")}
      aria-label={t("_accessibility:ariaLabels.closeDialog")}
      className={`dialog ${styles} h-screen ${
        open ? "" : "pointer-events-none"
      } fixed left-0 top-0 flex items-center justify-center z-10`}
    >
      <div
        className={`relative min-w-70 bg-alt-background p-5 rounded-2xl border-border border-2 animated ${
          open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <button className="icon-button absolute top-2 right-2 text-red-400" onClick={handleClose}>
          <FontAwesomeIcon icon={faClose} />
        </button>
        <h3 className="mb-5 text-white text-xl">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export default Dialog;
