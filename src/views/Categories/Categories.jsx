import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// providers
import { useManager } from "../../providers/ManagerProvider";

// utils
import { ReactQueryKeys } from "../../utils/queryKey";

// components
import {
  Page,
  PrettyGrid,
  AddCard,
  Loading,
  ConfirmationDialog,
} from "../../components";
import {
  CategoryCard,
  AddCategoryDialog,
  EditCategoryDialog,
} from "./components";

// hooks
import { useAddCategory, useEditCategory } from "./hooks/dialogs";
import useDeleteDialog from "../../hooks/dialogs/useDeleteDialog";

function Categories() {
  const { t } = useTranslation();

  const manager = useManager();

  const { data, isLoading } = useQuery({
    queryKey: [ReactQueryKeys.Categories],
    enabled: true,
    queryFn: () => manager.Categories.get({ deletedAt: null }),
  });

  // #region actions

  const deleteCategory = useDeleteDialog({
    mutationFn: (data) => manager.Categories.softDelete(data),
  });

  const addCategory = useAddCategory();

  const editCategory = useEditCategory();

  // #endregion

  const getActions = useCallback((record) => [deleteCategory.action(record)]);

  return (
    <Page title={t("_pages:categories.title")} isLoading={isLoading}>
      <PrettyGrid
        data={data}
        emptyMessage={t("_pages:categories.empty")}
        renderComponent={(category) => (
          <CategoryCard
            actions={getActions(category)}
            onClick={(id) => editCategory.onClick(id)}
            {...category}
          />
        )}
      />

      <AddCard
        disabled={isLoading}
        onClick={addCategory.onClick}
        tooltip={t("_pages:categories.add")}
      />

      {/* Dialogs */}
      <AddCategoryDialog {...addCategory} />
      <EditCategoryDialog {...editCategory} />
      <ConfirmationDialog {...deleteCategory} />
    </Page>
  );
}

export default Categories;
