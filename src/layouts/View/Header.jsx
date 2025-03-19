import { useState } from "react";

// components
import Drawer from "../../components/Drawer/Drawer";
import Navbar from "../../components/Navbar/Navbar";

function Header() {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      <Drawer
        open={showDrawer}
        onClose={() => {
          setShowDrawer(false);
        }}
      />
      <Navbar openDrawer={() => setShowDrawer(true)} />
    </>
  );
}

export default Header;
