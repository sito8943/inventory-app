import { Outlet } from "react-router-dom";
import { Tooltip } from "react-tooltip";

// components
import Header from "./Header";
import Footer from "./Footer";
import Notification from "../../components/Notification/Notification";

function View() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Notification />
      <Tooltip id="tooltip" />
    </>
  );
}

export default View;
