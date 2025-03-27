import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// utils
import { ReactQueryKeys } from "../../utils/queryKey";

// providers
import { useManager, queryClient } from "../../providers/ManagerProvider";

// hooks
import useDialog from "../useDialog";
import useDeleteAction from "../actions/useDeleteAction";

function useDeleteDialog() {
  const { t } = useTranslation();

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
      //TODO THROW NOTIFICATION HERE
    },
    onSuccess: () => {
      queryClient.invalidateQueries([ReactQueryKeys.Categories]);
      close();
      //TODO THROW NOTIFICATION HERE
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
