import { useTranslation } from "react-i18next";

// providers
import { useManager } from "../../../../providers/ManagerProvider";

// hooks
import useFormDialog from "../../../../hooks/useFormDialog";

// utils
import { ReactQueryKeys } from "../../../../utils/queryKey";

export function useEditCategory() {
  const { t } = useTranslation();

  const manager = useManager();

  const { handleSubmit, close, dialogFn, ...rest } = useFormDialog({
    getFunction: (id) => manager.Categories.getById(id),
    mutationFn: (data) => manager.Categories.update(data),
    onSuccessMessage: t("_pages:common.actions.add.successMessage"),
    queryKey: [ReactQueryKeys.Categories],
      
  });

  return {
    title: t("_pages:categories.forms.edit"),
    handleSubmit: handleSubmit((data) => dialogFn.mutate(data)),
    handleClose: close,
    ...rest,
  };
}
