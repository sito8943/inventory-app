import { useTranslation } from "react-i18next";

// providers
import { useManager } from "providers";

// hooks
import { useFormDialog, MovementsQueryKeys } from "hooks";
import { AddMovementDto } from "lib";

export function useAddMovement() {
  const { t } = useTranslation();

  const manager = useManager();

  const { handleSubmit, dialogFn, ...rest } = useFormDialog<
    AddMovementDto,
    AddMovementDto
  >({
    mutationFn: (data) => manager.Movements.insert(data),
    onSuccessMessage: t("_pages:common.actions.add.successMessage"),
    title: t("_pages:movements.forms.add"),
    ...MovementsQueryKeys.all(),
  });

  return {
    handleSubmit: handleSubmit((data) => dialogFn.mutate(data)),
    ...rest,
  };
}
