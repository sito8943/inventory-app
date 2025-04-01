import { useTranslation } from "react-i18next";

// providers
import { queryClient, useManager } from "../../../providers/ManagerProvider";

// utils
import { ReactQueryKeys } from "../../../utils/queryKey";

// hooks
import useDialogForm from "../../../hooks/useDialogForm";

function useAddProduct() {
  const { t } = useTranslation();

  const manager = useManager();

  const {
    control,
    handleSubmit,
    open,
    close,
    onClick,
    releaseFormError,
    dialogFn,
    isLoading,
  } = useDialogForm({
    mutationFn: (data) => manager.Products.insert(data),
    onSuccessMessage: t("_pages:products.messages.saved"),
    queryKey: ReactQueryKeys.Products,
  });

  return {
    onClick,
    title: t("_pages:products.forms.add"),
    open,
    control,
    handleSubmit: handleSubmit((data) => {
      releaseFormError();
      dialogFn.mutate(data);
    }),
    isLoading,
    handleClose: close,
  };
}

export default useAddProduct;
