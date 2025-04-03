import { useTranslation } from "react-i18next";

// providers
import { useManager } from "../../../providers/ManagerProvider";

// hooks
import useFormDialog from "../../../hooks/useFormDialog";

// utils
import { ReactQueryKeys } from "../../../utils/queryKey";
import useDoMovementAction from "./actions/useDoMovementAction";

function useDoMovement() {
  const { t } = useTranslation();

  const manager = useManager();

  const { control, isLoading, handleSubmit, open, close, onClick, dialogFn } =
    useFormDialog({
      getFunction: (id) => manager.Products.getById(id),
      mutationFn: (data) => manager.Products.doMovement(data),
      onSuccessMessage: t("_pages:products.actions.doMovement.successMessage"),
      queryKey: ReactQueryKeys.Products,
      onError: (error) => {
        console.log(error);
      },
    });

  const action = useDoMovementAction({ onClick });

  return {
    onClick,
    title: t("_pages:products.forms.edit"),
    open,
    control,
    isLoading,
    handleSubmit: handleSubmit((data) => dialogFn.mutate(data)),
    handleClose: close,
    action,
  };
}

export default useDoMovement;
