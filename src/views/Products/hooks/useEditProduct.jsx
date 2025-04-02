import { useTranslation } from "react-i18next";

// providers
import { queryClient, useManager } from "../../../providers/ManagerProvider";

// hooks
import useFormDialog from "../../../hooks/useFormDialog";

// utils
import { ReactQueryKeys } from "../../../utils/queryKey";

function useEditProduct() {
  const { t } = useTranslation();

  const manager = useManager();

  const { control, isLoading, handleSubmit, open, close, onClick, dialogFn } =
    useFormDialog({
      getFunction: (id) => manager.Products.getById(id),
      mutationFn: (data) => manager.Products.update(data),
      onSuccessMessage: t("_pages:common.actions.add.successMessage"),
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
