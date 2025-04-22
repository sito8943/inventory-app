import {useTranslation} from "react-i18next";

// providers
import {useManager} from "../../../../providers/ManagerProvider";

// hooks
import useFormDialog from "../../../../hooks/useFormDialog";

// utils
import {ProductsQueryKeys} from "../../../../hooks/queries/useProducts.jsx";

export function useEditProduct() {
    const {t} = useTranslation();

    const manager = useManager();

    const {handleSubmit, close, dialogFn, ...rest} = useFormDialog({
        getFunction: (id) => manager.Products.getById(id),
        mutationFn: (data) => manager.Products.update(data),
        onSuccessMessage: t("_pages:common.actions.add.successMessage"),
        ...ProductsQueryKeys.all,
    });

    return {
        title: t("_pages:products.forms.edit"),
        handleSubmit: handleSubmit((data) => dialogFn.mutate(data)),
        handleClose: close,
        ...rest,
    };
}
