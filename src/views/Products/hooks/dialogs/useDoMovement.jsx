import {useTranslation} from "react-i18next";

// providers
import {useManager} from "../../../../providers/ManagerProvider";

// hooks
import useFormDialog from "../../../../hooks/useFormDialog";
import useDoMovementAction from "../actions/useDoMovementAction";

// utils
import {ProductsQueryKeys} from "../../../../hooks/queries/useProducts.jsx";

export function useDoMovement() {
  const { t } = useTranslation();

  const manager = useManager();

  const {
    control,
    getValues,
    isLoading,
    handleSubmit,
    open,
    close,
    onClick,
    dialogFn,
  } = useFormDialog({
    getFunction: (id) => manager.Products.getById(id, "id"),
    mutationFn: (data) => manager.Products.doMovement(data),
    onSuccessMessage: t("_pages:products.actions.doMovement.successMessage"),
    ...ProductsQueryKeys.all,
    onError: (error) => {
      console.error(error);
    },
  });

  const action = useDoMovementAction({ onClick });

  return {
    onClick,
    title: t("_pages:products.forms.doMovement"),
    open,
    control,
    getValues,
    isLoading,
    handleSubmit: handleSubmit((data) => dialogFn.mutate(data)),
    handleClose: close,
    action,
  };
}
