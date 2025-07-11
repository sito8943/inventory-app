import {
  faWindowMinimize,
  faSquare,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PhysicalPosition, PhysicalSize } from "@tauri-apps/api/dpi";
import { getCurrentWindow, Window } from "@tauri-apps/api/window";
import { t } from "i18next";
import { useState, useEffect, useCallback } from "react";

let appWindow: Window;

try {
  appWindow = getCurrentWindow();
} catch (err) {
  console.error(err);
}

// tauri types
type WindowProps = {
  position: PhysicalPosition;
  size: PhysicalSize;
};

export function DesktopToolbar() {
  const [isMaximized, setIsMaximized] = useState(false);
  const [windowProps, setWindowProps] = useState<WindowProps>(
    {} as WindowProps
  );

  const toggleRestoreMaximize = useCallback(
    async (e: globalThis.MouseEvent) => {
      if (
        e.buttons === 1 &&
        ((e.target as Node).nodeName === "HEADER" ||
          (e.target as Node).nodeName === "DIV")
      ) {
        // Primary (left) button
        if (e.detail === 2) {
          if (!isMaximized) {
            setIsMaximized(true);
            const position = await appWindow.outerPosition();
            const size = await appWindow.outerSize();

            setWindowProps({ position, size });
            await appWindow.toggleMaximize(); // Maximize on double click
          } else {
            setIsMaximized(false);
            await appWindow.setPosition(windowProps.position);
            await appWindow.setSize(windowProps.size);
          }
        } else await appWindow.startDragging(); // Else start dragging
      }
    },
    [isMaximized, windowProps.position, windowProps.size]
  );

  useEffect(() => {
    const header = document.getElementById("header");
    if (header) {
      header.addEventListener("mousedown", toggleRestoreMaximize);
    }
    return () => {
      if (header) {
        header.removeEventListener("mousedown", toggleRestoreMaximize);
      }
    };
  }, [toggleRestoreMaximize]);

  return (
    appWindow && (
      <ul className="toolbar">
        <button
          name={t("_accessibility:buttons.minimize")}
          aria-label={t("_accessibility:ariaLabels.minimize")}
          onClick={() => appWindow.minimize()}
          className="button animated"
        >
          <FontAwesomeIcon className="text-xs mb-2" icon={faWindowMinimize} />
        </button>
        <button
          onClick={async () => {
            if (isMaximized) setIsMaximized(false);
            else setIsMaximized(true);
            await appWindow.toggleMaximize();
          }}
          name={t("_accessibility:buttons.toggleMaximize")}
          aria-label={t("_accessibility:ariaLabels.toggleMaximize")}
          className="button animated"
        >
          {isMaximized ? (
            <div className="relative w-3 h-3">
              <FontAwesomeIcon
                className="text-xs absolute -top-0.5 -ml-[2px]"
                icon={faSquare}
              />
              <FontAwesomeIcon
                className="text-xs absolute z-10 right-[1px] bg-background"
                icon={faSquare}
              />
            </div>
          ) : (
            <FontAwesomeIcon className="text-xs" icon={faSquare} />
          )}
        </button>
        <button
          onClick={() => appWindow.close()}
          name={t("_accessibility:buttons.closeApp")}
          aria-label={t("_accessibility:ariaLabels.closeApp")}
          className="button close animated"
        >
          <FontAwesomeIcon className="" icon={faClose} />
        </button>
      </ul>
    )
  );
}
