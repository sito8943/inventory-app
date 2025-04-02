import { useTranslation } from "react-i18next";

// providers
import { useManager } from "../../../providers/ManagerProvider";

// hooks
import useDialogForm from "../../../hooks/useDialogForm";

// utils
import { ReactQueryKeys } from "../../../utils/queryKey";

function useEditCategory() {
  const { t } = useTranslation();

  const manager = useManager();

  const { control, isLoading, handleSubmit, open, close, onClick, dialogFn } =
    useDialogForm({
      getFunction: (id) => manager.Categories.getById(id),
      mutationFn: (data) => manager.Categories.update(data),
      onSuccessMessage: t("_pages:categories.messages.saved"),
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

export default useEditCategory;
