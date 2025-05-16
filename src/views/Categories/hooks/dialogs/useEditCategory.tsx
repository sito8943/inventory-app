import { useTranslation } from "react-i18next";

// providers
import { useManager } from "providers";

// hooks
import { CategoriesQueryKeys, useFormDialog } from "hooks";

// utils
import { dtoToForm, emptyCategory, formToDto } from "../../utils/";

// types
import { UpdateCategoryDto, CategoryDto } from "lib";
import { CategoryFormType } from "../../types/";

export function useEditCategory() {
  const { t } = useTranslation();

  const manager = useManager();

  const { handleSubmit, ...rest } = useFormDialog<
    CategoryDto,
    UpdateCategoryDto,
    CategoryDto,
    CategoryFormType
  >({
    formToDto: (data) => data,
    dtoToForm: (data) => data,
    getFunction: (id) => manager.Categories.getById(id),
    mutationFn: (data) => manager.Categories.update(data),
    onSuccessMessage: t("_pages:common.actions.add.successMessage"),
    title: t("_pages:categories.forms.edit"),
    ...CategoriesQueryKeys.all(),
  });

  return {
    handleSubmit,
    ...rest,
  };
}
