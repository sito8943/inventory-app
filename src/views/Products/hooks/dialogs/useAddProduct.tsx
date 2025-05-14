import { useTranslation } from "react-i18next";

// providers
import { useManager } from "providers";

// types
import { AddProductDto } from "lib";

// hooks
import { useFormDialog, ProductsQueryKeys } from "hooks";

export function useAddProduct() {
  const { t } = useTranslation();

  const manager = useManager();

  const { handleSubmit, dialogFn, ...rest } = useFormDialog({
    mutationFn: (data: AddProductDto) => manager.Products.insert(data),
    onSuccessMessage: t("_pages:common.actions.add.successMessage"),
    ...ProductsQueryKeys.all(),
  });

  return {
    title: t("_pages:products.forms.add"),
    handleSubmit: handleSubmit((data) => dialogFn.mutate(data)),
    ...rest,
  };
}
