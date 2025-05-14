import { useTranslation } from "react-i18next";

// providers
import { useNotification } from "../../providers/NotificationProvider";

// lib
import { NotificationEnumType, NotificationType, ValidationError } from "lib";

// hooks
import useDeleteAction from "../actions/useDeleteAction";
import useConfirmationForm from "../forms/useConfirmationForm.tsx";

// types
import { UseDeleteDialogPropsType } from "./types.js";

export const useDeleteDialog = (props: UseDeleteDialogPropsType) => {
  const { mutationFn, queryKey } = props;

  const { showStackNotifications } = useNotification();
  const { t } = useTranslation();

  const { open, onClick, close, dialogFn, isLoading } = useConfirmationForm<
    number,
    ValidationError
  >({
    mutationFn,
    onSuccessMessage: t("_pages:common.actions.delete.successMessage"),
    onError: (error: ValidationError) => {
      if (error.errors)
        showStackNotifications(
          error.errors.map(
            ([key, message]) =>
              ({
                message: t(`_pages:${key}.errors.${message}`),
                type: NotificationEnumType.error,
              }) as NotificationType,
          ),
        );
      close();
    },
    queryKey,
  });

  const action = useDeleteAction({ onClick });

  return {
    onClick,
    title: t("_pages:common.actions.delete.dialog.title"),
    open,
    isLoading,
    handleSubmit: () => dialogFn.mutate(),
    handleClose: close,
    action,
  };
};
