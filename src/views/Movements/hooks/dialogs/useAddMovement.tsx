import { useTranslation } from "react-i18next";

// providers
import { queryClient, useManager } from "providers";

// hooks
import { useFormDialog, MovementsQueryKeys } from "hooks";

// types
import { MovementFormType } from "../../types";
import { AddMovementDto, MovementDto } from "lib";

// types
import { emptyMovement, formToDto, dtoToForm } from "../../utils";

export function useAddMovement() {
  const { t } = useTranslation();

  const manager = useManager();

  return useFormDialog<
    MovementDto,
    AddMovementDto,
    MovementDto,
    MovementFormType
  >({
    formToDto,
    dtoToForm,
    defaultValues: emptyMovement,
    mutationFn: (data) => manager.Movements.insert(data),
    onSuccessMessage: t("_pages:common.actions.add.successMessage"),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ ...MovementsQueryKeys.all() });
    },
    title: t("_pages:movements.forms.add"),
  });
}
