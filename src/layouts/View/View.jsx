import { Outlet } from "react-router-dom";

// components
import Header from "./Header";
import Footer from "./Footer";

function View() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default View;
