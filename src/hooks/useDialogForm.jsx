import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

// hooks
import useDialog from "./useDialog";

function useDialogForm(props) {
  const { t } = useTranslation();

  const { defaultValues } = props;

  const { open, handleClose, handleOpen } = useDialog();

  const { control, handleSubmit, reset, setError } = useForm(defaultValues);

  const parseFormError = useCallback((error) => {
    const valError = error?.errors;
    if (valError) {
      valError.forEach(([key, message]) => {
        const input = document.querySelector(`[name="${key}"]`);
        if (input) {
          input.focus();
          input.classList.add("error");
        }
      });
    }
  }, []);

  const releaseFormError = useCallback(() => {
    const inputs = document.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      input.classList.remove("error");
    });
  }, []);

  const onClick = () => handleOpen();

  const close = useCallback(() => {
    releaseFormError();
    handleClose();
    reset();
  }, [reset, releaseFormError]);

  return {
    open,
    onClick,
    close,
    control,
    handleSubmit,
    reset,
    setError,
    parseFormError,
    releaseFormError,
  };
}

export default useDialogForm;
