import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// providers
import { useManager } from "../../providers/ManagerProvider";

// utils
import { ReactQueryKeys } from "../../utils/queryKey";

// components
import { AddCard, Loading, ConfirmationDialog } from "../../components";
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
    <main className="p-5">
      <div className="apparition flex flex-col gap-5">
        <h2 className="text-xl">{t("_pages:categories.title")}</h2>
        {isLoading ? (
          <Loading
            size="text-3xl"
            containerClassName="flex justify-center items-center h-50"
          />
        ) : data?.length ? (
          <ul className="flex flex-wrap max-xs:flex-col gap-5">
            {data?.map((category) => (
              <li key={category.id}>
                <CategoryCard
                  actions={getActions(category)}
                  onClick={(id) => editCategory.onClick(id)}
                  {...category}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="!text-gray-400 text-center mt-5">
            {t("_pages:categories.empty")}
          </p>
        )}
      </div>
      <AddCard
        disabled={isLoading}
        onClick={addCategory.onClick}
        tooltip={t("_pages:categories.add")}
      />

      {/* Dialogs */}
      <AddCategoryDialog {...addCategory} />
      <EditCategoryDialog {...editCategory} />
      <ConfirmationDialog {...deleteCategory} />
    </main>
  );
}

export default Categories;
