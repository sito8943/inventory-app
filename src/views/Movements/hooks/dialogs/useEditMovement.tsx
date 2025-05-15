import { useTranslation } from "react-i18next";

// providers
import { useManager } from "providers";

// hooks
import { useFormDialog, MovementsQueryKeys } from "hooks";

export function useEditMovement() {
  const { t } = useTranslation();

  const manager = useManager();

  const { handleSubmit, dialogFn, ...rest } = useFormDialog({
    getFunction: (id) => manager.Movements.getById(id),
    mutationFn: (data) => manager.Movements.update(data),
    onSuccessMessage: t("_pages:common.actions.add.successMessage"),
    title: t("_pages:movements.forms.edit"),
    ...MovementsQueryKeys.all(),
  });

  return {
    handleSubmit: handleSubmit((data) => dialogFn.mutate(data)),
    ...rest,
  };
}
