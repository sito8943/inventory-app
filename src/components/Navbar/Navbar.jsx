import React, { useEffect, useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faClose,
  faWindowMinimize,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

const appWindow = getCurrentWindow();

function Navbar(props) {
  const { t } = useTranslation();

  const { openDrawer } = props;

  const init = async () => {};

  const [isMaximized, setIsMaximized] = useState(false);
  const [windowProps, setWindowProps] = useState({});

  useEffect(() => {
    init();
  }, []);

  const toggleRestoreMaximize = async (e) => {
    if (
      e.buttons === 1 &&
      (e.target.nodeName === "HEADER" || e.target.nodeName === "DIV")
    ) {
      // Primary (left) button
      if (e.detail === 2) {
        if (!isMaximized) {
          setIsMaximized(true);
          const position = await appWindow.outerPosition();
          const size = await appWindow.outerSize();

          setWindowProps({ position, size });
          appWindow.toggleMaximize(); // Maximize on double click
        } else {
          setIsMaximized(false);
          appWindow.setPosition(windowProps.position);
          appWindow.setSize(windowProps.size);
        }
      } else appWindow.startDragging(); // Else start dragging
    }
  };

  return (
    <header
      onMouseDown={(e) => toggleRestoreMaximize(e)}
      className="flex items-center justify-between bg-background"
    >
      <div className="flex gap-2 items-center">
        <button
          type="button"
          name="open-menu"
          aria-label="open-menu"
          onClick={openDrawer}
          className="button menu animated"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h1 className="text-lg text-white pointer-events-none">
          {t("_pages:home.appName")}
        </h1>
      </div>
      <ul className="toolbar flex items-center justify-end">
        <button
          onClick={() => appWindow.minimize()}
          className="button animated"
        >
          <FontAwesomeIcon className="text-xs mb-2" icon={faWindowMinimize} />
        </button>
        <button
          onClick={() => {
            if (isMaximized) setIsMaximized(false);
            else setIsMaximized(true);
            appWindow.toggleMaximize();
          }}
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
          className="button close animated"
        >
          <FontAwesomeIcon className="" icon={faClose} />
        </button>
      </ul>
    </header>
  );
}

export default Navbar;
