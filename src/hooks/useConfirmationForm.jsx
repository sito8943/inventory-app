import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";

// hooks
import useDialog from "./useDialog";

// providers
import { useNotification } from "../providers/NotificationProvider";
import { queryClient } from "../providers/ManagerProvider";

function useConfirmationForm(props) {
  const { t } = useTranslation();
  const { showErrorNotification, showSuccessNotification } = useNotification();

  const { mutationFn, onError, onSuccess, queryKey, onSuccessMessage } = props;

  const [id, setId] = useState(0);

  const { open, handleClose, handleOpen } = useDialog();

  const close = () => {
    handleClose();
    setId(0);
  };

  const onClick = async (id) => {
    setId(id);
    handleOpen();
  };

  const dialogFn = useMutation({
    mutationFn: () => mutationFn([id]),
    onError: (error) => {
      console.error(error);
      if (error.key)
        showErrorNotification({
          message: t(`_pages:common.errors.${error.key}`),
        });
      if (onError) onError(error);
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries([queryKey]);
      if (onSuccess) onSuccess(result);
      showSuccessNotification({ message: onSuccessMessage });
      close();
    },
  });

  return { open, onClick, close, dialogFn, isLoading: dialogFn.isPending };
}

export default useConfirmationForm;
