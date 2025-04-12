import { useTranslation } from "react-i18next";

// providers
import { useManager } from "../../../../providers/ManagerProvider";

// hooks
import useFormDialog from "../../../../hooks/useFormDialog";

// utils
import { ReactQueryKeys } from "../../../../utils/queryKey";

export function useEditMovement() {
  const { t } = useTranslation();

  const manager = useManager();

  const { handleSubmit, close, dialogFn, ...rest } = useFormDialog({
    getFunction: (id) => manager.Movements.getById(id),
    mutationFn: (data) => manager.Movements.update(data),
    onSuccessMessage: t("_pages:common.actions.add.successMessage"),
    queryKey: ReactQueryKeys.Movements,
  });

  return {
    title: t("_pages:movements.forms.edit"),
    handleSubmit: handleSubmit((data) => dialogFn.mutate(data)),
    handleClose: close,
    ...rest,
  };
}
