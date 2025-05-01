import ReactDOM from "react-dom/client";
import 'react-tooltip/dist/react-tooltip.css'

// app
import App from "./App";

// fonts
// @ts-ignore
import "@fontsource/poppins";
// @ts-ignore
import "@fontsource/roboto";

// provider
import {ManagerProvider} from "./providers/ManagerProvider";
import {NotificationProvider} from "./providers/NotificationProvider";

//i18
import "./i18";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ManagerProvider>
        <NotificationProvider>
            <App/>
        </NotificationProvider>
    </ManagerProvider>
);
