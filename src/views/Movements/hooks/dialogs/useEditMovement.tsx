import { useTranslation } from "react-i18next";

// providers
import { queryClient, useManager } from "providers";

// hooks
import { useFormDialog, MovementsQueryKeys } from "hooks";

// utils
import { emptyMovement, formToDto, dtoToForm } from "../../utils";

export function useEditMovement() {
  const { t } = useTranslation();

  const manager = useManager();

  return useFormDialog({
    formToDto,
    dtoToForm,
    defaultValues: emptyMovement,
    getFunction: (id) => manager.Movements.getById(id),
    mutationFn: (data) => manager.Movements.update(data),
    onSuccessMessage: t("_pages:common.actions.add.successMessage"),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ ...MovementsQueryKeys.all() });
    },
    title: t("_pages:movements.forms.edit"),
  });
}
