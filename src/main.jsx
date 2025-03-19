import React from "react";
import ReactDOM from "react-dom/client";

// app
import App from "./App";

// fonts
import "@fontsource/poppins";
import "@fontsource/roboto";

//i18
import "./i18";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
