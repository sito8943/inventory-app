import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// utils
import { ReactQueryKeys } from "../../utils/queryKey";

// providers
import { useManager, queryClient } from "../../providers/ManagerProvider";
import { useNotification } from "../../providers/NotificationProvider";

// hooks
import useDialog from "../useDialog";
import useDeleteAction from "../actions/useDeleteAction";

function useDeleteDialog() {
  const { t } = useTranslation();
  const { showErrorNotification, showSuccessNotification } = useNotification();

  const manager = useManager();

  const { open, handleClose, handleOpen } = useDialog();

  const [id, setId] = useState(0);

  const close = () => {
    handleClose();
    setId(0);
  };

  const onClick = async (id) => {
    setId(id);
    handleOpen();
  };

  const action = useDeleteAction({ onClick });

  const deleteFn = useMutation({
    mutationFn: (data) => manager.Categories.softDelete(data),
    onError: (error) => {
      console.error(error);
      showErrorNotification({ message: error });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([ReactQueryKeys.Categories]);
      close();
      showSuccessNotification({
        message: t("_pages:common.actions.delete.successMessage"),
      });
    },
  });

  return {
    onClick,
    title: t("_pages:common.actions.delete.dialog.title"),
    open,
    isLoading: deleteFn.isPending,
    handleSubmit: () => deleteFn.mutate([id]),
    handleClose: close,
    action,
  };
}

export default useDeleteDialog;
