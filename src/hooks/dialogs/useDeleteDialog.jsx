import { useTranslation } from "react-i18next";

// providers
import { useManager } from "../../providers/ManagerProvider";
import { useNotification } from "../../providers/NotificationProvider";

// lib
import { Notification } from "../../lib/Notification";

// hooks
import useDeleteAction from "../actions/useDeleteAction";
import useConfirmationForm from "../useConfirmationForm";

function useDeleteDialog(props) {
  const { mutationFn } = props;

  const { showStackNotifications } = useNotification();
  const { t } = useTranslation();

  const { open, onClick, close, dialogFn, isLoading } = useConfirmationForm({
    mutationFn,
    onSuccessMessage: t("_pages:common.actions.delete.successMessage"),
    onError: (error) => {
      if (error.errors)
        showStackNotifications(
          error.errors.map(
            ([key, message]) =>
              new Notification({
                message: t(`_pages:${key}.errors.${message}`),
                type: "error",
              })
          )
        );
      close();
    },
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
