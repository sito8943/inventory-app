import {useTranslation} from "react-i18next";

// providers
import {useManager} from "../../../../providers/ManagerProvider";

// hooks
import {ProductsQueryKeys} from "../../../../hooks/queries/useProducts.jsx";
import useFormDialog from "../../../../hooks/useFormDialog";

export function useAddProduct() {
    const {t} = useTranslation();

    const manager = useManager();

    const {handleSubmit, close, dialogFn, ...rest} = useFormDialog({
        mutationFn: (data) => manager.Products.insert(data),
        onSuccessMessage: t("_pages:common.actions.add.successMessage"),
        ...ProductsQueryKeys.all,
    });

    return {
        title: t("_pages:products.forms.add"),
        handleSubmit: handleSubmit((data) => dialogFn.mutate(data)),
        handleClose: close,
        ...rest,
    };
}
