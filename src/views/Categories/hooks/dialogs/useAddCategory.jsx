import { useTranslation } from "react-i18next";

// providers
import { useManager } from "../../../../providers/ManagerProvider";

// utils
import { ReactQueryKeys } from "../../../../utils/queryKey";

// hooks
import useFormDialog from "../../../../hooks/useFormDialog";

export function useAddCategory() {
  const { t } = useTranslation();

  const manager = useManager();

  const { handleSubmit, close, dialogFn, ...rest } = useFormDialog({
    mutationFn: (data) => manager.Categories.insert(data),
    onSuccessMessage: t("_pages:common.actions.add.successMessage"),
    queryKey: ReactQueryKeys.Categories,
  });

  return {
    title: t("_pages:categories.forms.add"),
    handleSubmit: handleSubmit((data) => dialogFn.mutate(data)),
    handleClose: close,
    ...rest,
  };
}
