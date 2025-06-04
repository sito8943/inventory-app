import {useEffect, useMemo} from "react";
import {useTranslation} from "react-i18next";

// icons
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRotateLeft} from "@fortawesome/free-solid-svg-icons";

// providers
import {useNetwork} from "providers";

// components
import Loading from "../Loading/Loading.tsx";

// styles
import "./styles.css";

export const Network = () => {
    const {connected, isLoading, sendPing} = useNetwork();

    const {t} = useTranslation();

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
            if (connected) root.style.gridTemplateRows = "40px 0 1fr 40px";
            if (!connected) root.style.gridTemplateRows = "40px 40px 1fr 40px";
        }
    }, [connected]);

    return (
        <div
            className={`flex items-center justify-start pl-4 network ${bodyBg}`}
        >
            {isLoading ? <Loading color="text-white"/> : null}
            {!isLoading && !connected ?
                <button className="text-white" onClick={() => sendPing()}
                        aria-label={t("_accessibility:buttons.retry")}><FontAwesomeIcon
                    icon={faArrowRotateLeft}/></button> : null}
            <p className={`ml-3 ${fontStyles}`}>{message}</p>

        </div>
    );
};
