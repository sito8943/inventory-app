import { useTranslation } from "react-i18next";

// providers
import { useManager } from "providers";

// hooks
import { useFormDialog, CategoriesQueryKeys } from "hooks";

// utils
import { dtoToForm, emptyCategory, formToDto } from "../../utils";

// types
import { AddCategoryDto, CategoryDto } from "lib";
import { CategoryFormType } from "../../types/";

export function useAddCategory() {
  const { t } = useTranslation();

  const manager = useManager();

  const { handleSubmit, ...rest } = useFormDialog<
    CategoryDto,
    AddCategoryDto,
    CategoryDto,
    CategoryFormType
  >({
    formToDto,
    dtoToForm,
    defaultValues: emptyCategory,
    mutationFn: (data) => manager.Categories.insert(data),
    onSuccessMessage: t("_pages:common.actions.add.successMessage"),
    title: t("_pages:categories.forms.add"),
    ...CategoriesQueryKeys.all(),
  });

  return {
    handleSubmit,
    ...rest,
  };
}
