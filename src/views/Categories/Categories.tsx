import { useCallback } from "react";
import { useTranslation } from "react-i18next";

// providers
import { useManager } from "providers";

// components
import { ConfirmationDialog, Page, PrettyGrid } from "../../components";
import {
  AddCategoryDialog,
  CategoryCard,
  EditCategoryDialog,
} from "./components";
import { Error } from "components";

// hooks
import {
  useDeleteDialog,
  useCategoriesList,
  CategoriesQueryKeys,
  useRestoreDialog,
} from "hooks";
import { useAddCategory, useEditCategory } from "./hooks";

// types
import { CategoryDto } from "lib";

function Categories() {
  const { t } = useTranslation();

  const manager = useManager();

  const { data, isLoading, error } = useCategoriesList({});

  // #region actions

  const deleteCategory = useDeleteDialog({
    mutationFn: (data) => manager.Categories.softDelete(data),
    ...CategoriesQueryKeys.all(),
  });

  const restoreCategory = useRestoreDialog({
    mutationFn: (data) => manager.Categories.restore(data),
    ...CategoriesQueryKeys.all(),
  });

  const addCategory = useAddCategory();

  const editCategory = useEditCategory();

  // #endregion

  const getActions = useCallback(
    (record: CategoryDto) => [
      deleteCategory.action(record),
      restoreCategory.action(record),
    ],
    [deleteCategory, restoreCategory]
  );

  return (
    <Page
      title={t("_pages:categories.title")}
      isLoading={isLoading}
      addOptions={{
        onClick: () => addCategory.onClick(),
        disabled: isLoading,
        tooltip: t("_pages:categories.add"),
      }}
    >
      {!error ? (
        <>
          <PrettyGrid
            data={data?.items}
            emptyMessage={t("_pages:categories.empty")}
            renderComponent={(category) => (
              <CategoryCard
                actions={getActions(category)}
                onClick={(id: number) => editCategory.onClick(id)}
                {...category}
              />
            )}
          />
          {/* Dialogs */}
          <AddCategoryDialog {...addCategory} />
          <EditCategoryDialog {...editCategory} />
          <ConfirmationDialog {...deleteCategory} />
          <ConfirmationDialog {...restoreCategory} />
        </>
      ) : (
        <Error message={error?.message} />
      )}
    </Page>
  );
}

export default Categories;
