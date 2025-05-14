import { useTranslation } from "react-i18next";

// providers
import { useManager } from "providers";

// hooks
import { useFormDialog, ProductsQueryKeys } from "hooks";

// utils
import { UpdateProductDto } from "lib";

export function useEditProduct() {
  const { t } = useTranslation();

  const manager = useManager();

  const { handleSubmit, dialogFn, ...rest } = useFormDialog<
    UpdateProductDto,
    UpdateProductDto
  >({
    getFunction: (id) => manager.Products.getById(id),
    mutationFn: (data) => manager.Products.update(data),
    onSuccessMessage: t("_pages:common.actions.add.successMessage"),
    ...ProductsQueryKeys.all(),
  });
  return {
    title: t("_pages:products.forms.edit"),
    handleSubmit: handleSubmit((data) => dialogFn.mutate(data)),
    ...rest,
  };
}
