import { Outlet } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { ErrorBoundary } from "react-error-boundary";

// components
import Header from "./Header";
import Footer from "./Footer";
import { Notification, Error, Network } from "../../components/";

function View() {
  return (
    <>
      <Header />
      <Network />
      <ErrorBoundary
        fallback={
          <main>
            <Error />
          </main>
        }
      >
        <Outlet />
      </ErrorBoundary>
      <Footer />
      <Notification />
      <Tooltip id="tooltip" />
    </>
  );
}

export default View;
