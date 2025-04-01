import { useTranslation } from "react-i18next";

// providers
import { queryClient, useManager } from "../../../providers/ManagerProvider";

// utils
import { ReactQueryKeys } from "../../../utils/queryKey";

// hooks
import useDialogForm from "../../../hooks/useDialogForm";

function useAddCategory() {
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
  } = useDialogForm({
    mutationFn: (data) => manager.Categories.insert(data),
    onSuccessMessage: t("_pages:categories.messages.saved"),
    queryKey: ReactQueryKeys.Categories,
  });

  return {
    onClick,
    title: t("_pages:categories.forms.add"),
    open,
    control,
    handleSubmit: handleSubmit((data) => {
      releaseFormError();
      dialogFn.mutate(data);
    }),
    handleClose: close,
  };
}

export default useAddCategory;
