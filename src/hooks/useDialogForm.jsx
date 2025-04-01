import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation } from "@tanstack/react-query";

// providers
import { queryClient } from "../providers/ManagerProvider";

// hooks
import useDialog from "./useDialog";

function useDialogForm(props) {
  const { t } = useTranslation();

  const {
    defaultValues,
    getFunction,
    mutationFn,
    onError,
    onSuccess,
    queryKey,
    onSuccessMessage,
  } = props;

  const [id, setId] = useState(0);

  const { open, handleClose, handleOpen } = useDialog();

  const { control, handleSubmit, reset, setError } = useForm(defaultValues);

  const { data, isLoading } = useQuery({
    queryFn: () => {
      return getFunction?.(id);
    },
    queryKey: [queryKey, id],
    enabled: !!getFunction && !!queryKey && !!id,
  });

  useEffect(() => {
    if (data && data.length) reset({ ...data[0] });
  }, [data]);

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

  const onClick = (id) => {
    setId(id);
    handleOpen();
  };

  const close = useCallback(() => {
    releaseFormError();
    handleClose();
    reset();
  }, [reset, releaseFormError]);

  const dialogFn = useMutation({
    mutationFn,
    onError: (error) => {
      console.error(error);
      parseFormError(error);
      //TODO THROW NOTIFICATION HERE
      // onSuccessMessage
      if (onError) onError(error);
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries([queryKey]);
      if (onSuccess) onSuccess(result);
      //TODO THROW NOTIFICATION HERE
      close();
    },
  });

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
    dialogFn,
    isLoading,
  };
}

export default useDialogForm;
