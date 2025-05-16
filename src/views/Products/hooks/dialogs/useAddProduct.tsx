import { useTranslation } from "react-i18next";

// providers
import { useManager } from "providers";

// types
import { AddProductDto, ProductDto } from "lib";
import { ProductFormType } from "../../types";

// hooks
import { useFormDialog, ProductsQueryKeys } from "hooks";

// utils
import { dtoToForm, emptyProduct, formToDto } from "../../utils";

export function useAddProduct() {
  const { t } = useTranslation();

  const manager = useManager();

  const { handleSubmit, ...rest } = useFormDialog<
    ProductDto,
    AddProductDto,
    ProductDto,
    ProductFormType
  >({
    formToDto,
    dtoToForm,
    defaultValues: emptyProduct,
    mutationFn: (data: AddProductDto) => manager.Products.insert(data),
    onSuccessMessage: t("_pages:common.actions.add.successMessage"),
    title: t("_pages:products.forms.add"),
    ...ProductsQueryKeys.all(),
  });

  return {
    handleSubmit,
    ...rest,
  };
}
