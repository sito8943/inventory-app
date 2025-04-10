import { useTranslation } from "react-i18next";

// providers
import { queryClient, useManager } from "../../../../providers/ManagerProvider";

// utils
import { ReactQueryKeys } from "../../../../utils/queryKey";

// hooks
import useFormDialog from "../../../../hooks/useFormDialog";

export function useAddProduct() {
  const { t } = useTranslation();

  const manager = useManager();

  const { control, handleSubmit, open, close, onClick, dialogFn, isLoading } =
    useFormDialog({
      mutationFn: (data) => manager.Products.insert(data),
      onSuccessMessage: t("_pages:common.actions.add.successMessage"),
      queryKey: ReactQueryKeys.Products,
    });

  return {
    onClick,
    title: t("_pages:products.forms.add"),
    open,
    control,
    handleSubmit: handleSubmit((data) => dialogFn.mutate(data)),
    isLoading,
    handleClose: close,
  };
}
