import { useTranslation } from "react-i18next";

// providers
import { useManager } from "../../providers/ManagerProvider";

// hooks
import useDeleteAction from "../actions/useDeleteAction";
import useConfirmationForm from "../useConfirmationForm";

function useDeleteDialog() {
  const { t } = useTranslation();

  const manager = useManager();

  const { open, onClick, close, dialogFn, isLoading } = useConfirmationForm({
    mutationFn: (data) => manager.Categories.softDelete(data),
    onSuccessMessage: t("_pages:common.actions.delete.successMessage"),
  });

  const action = useDeleteAction({ onClick });

  return {
    onClick,
    title: t("_pages:common.actions.delete.dialog.title"),
    open,
    isLoading,
    handleSubmit: (data) => dialogFn.mutate(data),
    handleClose: close,
    action,
  };
}

export default useDeleteDialog;
