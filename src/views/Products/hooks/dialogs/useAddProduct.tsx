import { useTranslation } from "react-i18next";

// providers
import { useManager } from "providers";

// types
import { AddProductDto, ProductDto } from "lib";

// hooks
import { useFormDialog, ProductsQueryKeys } from "hooks";
import { ProductFormType } from "../../components/types.ts";

export function useAddProduct() {
  const { t } = useTranslation();

  const manager = useManager();

  const { handleSubmit, ...rest } = useFormDialog<
    ProductDto,
    AddProductDto,
    ProductDto,
    ProductFormType
  >({
    formToDto: (data) => data,
    dtoToForm: (data) => data,
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
