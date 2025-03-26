import React from "react";
import { useTranslation } from "react-i18next";

// providers
import { useManager } from "../../providers/ManagerProvider";

// hooks
import useDialog from "../useDialog";

function useDeleteAction() {
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
    title: t("_pages:common.actions.edit"),
    open,
    control,
    isLoading,
    handleSubmit: () => deleteFn.mutate([id]),
    handleClose: close,
  };
}

export default useDeleteAction;
