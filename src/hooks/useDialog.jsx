import { useState } from "react";

function useDialog() {
  const [open, setOpen] = useState();

  const handleClose = () => setOpen(false);

  const handleOpen = () => setOpen(true);

  return { open, setOpen, handleClose, handleOpen };
}

export default useDialog;
