import { useTranslation } from "react-i18next";

// providers
import { queryClient, useManager } from "providers";

// hooks
import { useFormDialog, ProductsQueryKeys } from "hooks";

// types
import { ProductDto, UpdateProductDto } from "lib";
import { ProductFormType } from "../../types";

// utils
import { dtoToForm, emptyProduct, formToDto } from "../../utils";

export function useEditProduct() {
  const { t } = useTranslation();

  const manager = useManager();

  return useFormDialog<
    ProductDto,
    UpdateProductDto,
    ProductDto,
    ProductFormType
  >({
    formToDto,
    dtoToForm,
    defaultValues: emptyProduct,
    getFunction: (id) => manager.Products.getById(id),
    mutationFn: (data) => manager.Products.update(data),
    onSuccessMessage: t("_pages:common.actions.add.successMessage"),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        ...ProductsQueryKeys.all(),
      });
    },
    title: t("_pages:products.forms.edit"),
  });
}
