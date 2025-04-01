import { useTranslation } from "react-i18next";

// providers
import { queryClient, useManager } from "../../../providers/ManagerProvider";

// hooks
import useDialogForm from "../../../hooks/useDialogForm";

// utils
import { ReactQueryKeys } from "../../../utils/queryKey";

function useEditProduct() {
  const { t } = useTranslation();

  const manager = useManager();

  const { control, isLoading, handleSubmit, open, close, onClick, dialogFn } =
    useDialogForm({
      getFunction: manager.Products.getById,
      mutationFn: (data) => manager.Products.update(data),
      onSuccessMessage: t("_pages:products.messages.saved"),
      queryKey: ReactQueryKeys.Products,
      onSuccess: () => queryClient.invalidateQueries([ReactQueryKeys.Products]),
    });

  return {
    onClick,
    title: t("_pages:products.forms.edit"),
    open,
    control,
    isLoading,
    handleSubmit: handleSubmit((data) => dialogFn.mutate(data)),
    handleClose: close,
  };
}

export default useEditProduct;
