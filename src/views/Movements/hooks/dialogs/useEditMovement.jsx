import { useTranslation } from "react-i18next";

// providers
import { useManager } from "../../../../providers/ManagerProvider";

// hooks
import useFormDialog from "../../../../hooks/useFormDialog";

// utils
import { ReactQueryKeys } from "../../../../utils/queryKey";

function useEditMovement() {
  const { t } = useTranslation();

  const manager = useManager();

  const { control, isLoading, handleSubmit, open, close, onClick, dialogFn } =
    useFormDialog({
      getFunction: (id) => manager.Movements.getById(id),
      mutationFn: (data) => manager.Movements.update(data),
      onSuccessMessage: t("_pages:common.actions.add.successMessage"),
      queryKey: ReactQueryKeys.Movements,
    });

  return {
    onClick,
    title: t("_pages:movements.forms.edit"),
    open,
    control,
    isLoading,
    handleSubmit: handleSubmit((data) => dialogFn.mutate(data)),
    handleClose: close,
  };
}

export default useEditMovement;
