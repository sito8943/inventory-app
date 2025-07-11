import { useTranslation } from "react-i18next";

// providers
import { useManager } from "providers";

// types
import { ProductFormType, UseProductFormPropsType } from "../types";

// lib
import { UpdateProductDto, ProductDto } from "lib";

// hooks
import { useFormDialog, ProductsQueryKeys } from "hooks";

// utils
import { dtoToForm, emptyProduct, formToDto } from "../utils";

export function useProductForm(props: UseProductFormPropsType) {
  const { t } = useTranslation();

  const { id } = props;

  const manager = useManager();

  const { handleSubmit, ...rest } = useFormDialog<
    ProductDto,
    UpdateProductDto,
    ProductDto,
    ProductFormType
  >({
    formToDto,
    dtoToForm,
    defaultValues: emptyProduct,
    getFunction: (id) => manager.Products.getById(id),
    mutationFn: (data: UpdateProductDto) =>
      id ? manager.Products.update(data) : manager.Products.insert(data),
    onSuccessMessage: t(
      `_pages:common.actions.${id ? "edit" : "add"}.successMessage`
    ),
    title: t("_pages:products.forms.add"),
    ...ProductsQueryKeys.all(),
  });

  return {
    id,
    handleSubmit,
    ...rest,
  };
}
