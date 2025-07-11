import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";

// components
import { Loading } from "components";

// providers
import { useNetwork } from "providers";

// styles
import "./styles.css";

export const Network = () => {
  const { connected, isLoading, sendPing } = useNetwork();
  const [show, setShow] = useState(true);

  const { t } = useTranslation();

  const message = useMemo(() => {
    if (isLoading) return t("_pages:network.retrying");
    if (connected) return t("_pages:network.connected");
    if (!connected) return t("_pages:network.notConnected");
  }, [t, connected, isLoading]);

  const bodyBg = useMemo(() => {
    if (!connected || isLoading) return "bg-bg-error";
    return "bg-bg-success";
  }, [connected, isLoading]);

  const fontStyles = useMemo(() => {
    if (!connected) return "!text-error";
    return "!text-success";
  }, [connected]);

  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      console.log(show);
      if (connected || !show) root.style.gridTemplateRows = "40px 0 1fr 40px";
      if (!connected && show)
        root.style.gridTemplateRows = "40px 40px 1fr 40px";
    }
  }, [connected, show]);

  return (
    <div className={`flex items-center justify-start pl-4 network ${bodyBg}`}>
      {isLoading && show ? <Loading color="text-white" /> : null}
      {!isLoading && !connected && show ? (
        <button
          className="text-white"
          onClick={() => sendPing()}
          aria-label={t("_accessibility:buttons.retry")}
        >
          <FontAwesomeIcon icon={faArrowRotateLeft} />
        </button>
      ) : null}
      <p className={`ml-3 ${fontStyles}`}>{message}</p>
      <button
        className="text-white underline ml-3"
        onClick={() => setShow(false)}
        aria-label={t("_accessibility:buttons.workOffline")}
      >
        {t("_accessibility:buttons.workOffline")}
      </button>
    </div>
  );
};
