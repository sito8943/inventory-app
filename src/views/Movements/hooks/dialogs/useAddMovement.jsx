import { useTranslation } from "react-i18next";

// providers
import { useManager } from "../../../../providers/ManagerProvider";

// utils
import { ReactQueryKeys } from "../../../../utils/queryKey";

// hooks
import useFormDialog from "../../../../hooks/useFormDialog";

export function useAddMovement() {
  const { t } = useTranslation();

  const manager = useManager();

  const { control, handleSubmit, open, close, onClick, dialogFn } =
    useFormDialog({
      mutationFn: (data) => manager.Movements.insert(data),
      onSuccessMessage: t("_pages:common.actions.add.successMessage"),
      queryKey: ReactQueryKeys.Movements,
    });

  return {
    onClick,
    title: t("_pages:movements.forms.add"),
    open,
    control,
    handleSubmit: handleSubmit((data) => dialogFn.mutate(data)),
    handleClose: close,
  };
}
