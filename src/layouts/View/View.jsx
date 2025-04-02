import { Outlet } from "react-router-dom";

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
    </>
  );
}

export default View;
