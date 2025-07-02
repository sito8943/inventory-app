import ReactDOM from "react-dom/client";
import "react-tooltip/dist/react-tooltip.css";

// app
import App from "./App";

// fonts
// @ts-ignore
import "@fontsource/poppins";
// @ts-ignore
import "@fontsource/roboto";

// providers
import {
    ManagerProvider,
    NotificationProvider,
    CacheProvider,
    NetworkProvider
} from "providers";

//i18
import "./i18";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ManagerProvider>
        <NetworkProvider>
            <CacheProvider>
                <NotificationProvider>
                    <App/>
                </NotificationProvider>
            </CacheProvider>
        </NetworkProvider>
    </ManagerProvider>,
);
