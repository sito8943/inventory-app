import ReactDOM from "react-dom/client";
import "react-tooltip/dist/react-tooltip.css";

// app
import App from "./App";

// fonts
import "@fontsource/poppins";
import "@fontsource/roboto";

// providers
import {
  ManagerProvider,
  NotificationProvider,
  LocalCacheProvider,
  NetworkProvider,
  FileCacheProvider,
} from "providers";

//i18
import "./i18";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ManagerProvider>
    <NetworkProvider>
      <FileCacheProvider>
        <LocalCacheProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </LocalCacheProvider>
      </FileCacheProvider>
    </NetworkProvider>
  </ManagerProvider>
);
