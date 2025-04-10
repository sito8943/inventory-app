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

  const { control, isLoading, handleSubmit, open, close, onClick, dialogFn } =
    useFormDialog({
      getFunction: (id) => manager.Categories.getById(id),
      mutationFn: (data) => manager.Categories.update(data),
      onSuccessMessage: t("_pages:common.actions.add.successMessage"),
      queryKey: ReactQueryKeys.Categories,
    });

  return {
    onClick,
    title: t("_pages:categories.forms.edit"),
    open,
    control,
    isLoading,
    handleSubmit: handleSubmit((data) => dialogFn.mutate(data)),
    handleClose: close,
  };
}
