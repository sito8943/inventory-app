import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

// providers
import { useConfig } from "providers";

// components
import Loading from "../Loading/Loading.tsx";

// styles
import "./styles.css";

export const Network = () => {
  const { connected, pingServer } = useConfig();

  const { t } = useTranslation();

  const isLoading = useMemo(
    () => pingServer.isLoading || pingServer.isPending,
    [pingServer.isLoading, pingServer.isPending],
  );

  const message = useMemo(() => {
    if (isLoading) return t("_pages:network.retrying");
    if (connected) return t("_pages:network.connected");
    if (!connected) return t("_pages:network.notConnected");
  }, [t, connected, isLoading]);

  const bodyBg = useMemo(() => {
    if (!connected) return "bg-bg-errors";
    if (connected) return "bg-bg-success";
  }, [connected]);

  const fontStyles = useMemo(() => {
    if (!connected) return "!text-errors";
    if (connected) return "!text-success";
  }, [connected]);

  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      if (connected) root.style.gridTemplateRows = "40px 0 1fr 40px";
      if (!connected) root.style.gridTemplateRows = "40px 40px 1fr 40px";
    }
  }, [connected]);

  return (
    <div
      className={`flex items-center justify-start pl-4 gap-4 network ${bodyBg}`}
    >
      <p className={fontStyles}>{message}</p>
      {isLoading ? <Loading color="text-dark" /> : null}
    </div>
  );
};
