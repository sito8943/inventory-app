import React, { useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// providers
import { useManager } from "../../providers/ManagerProvider";

// utils
import { ReactQueryKeys } from "../../utils/queryKey";

// components
import AddCard from "../../components/Card/AddCard";
import {
  AddCategoryDialog,
  EditCategoryDialog,
} from "./component/CategoryDialog";

// hooks
import useAddCategory from "./hooks/useAddCategory";
import CategoryCard from "./component/CategoryCard";
import useEditCategory from "./hooks/useEditCategory";
import useDeleteDialog from "../../hooks/dialogs/useDeleteDialog";

function Categories() {
  const { t } = useTranslation();

  const manager = useManager();

  const { data, isLoading } = useQuery({
    queryKey: [ReactQueryKeys.Categories],
    enabled: true,
    queryFn: () => manager.Categories.get({ deletedAt: { not: null } }),
  });

  // #region actions

  const deleteCategory = useDeleteDialog();

  const addCategory = useAddCategory();

  const editCategory = useEditCategory();

  // #endregion

  const getActions = useCallback((record) => [
    deleteCategory.action(record.id),
  ]);

  return (
    <main className="p-5">
      <div className="apparition flex flex-col gap-5">
        <h2 className="text-xl">{t("_pages:categories.title")}</h2>
        <ul className="flex flex-wrap max-xs:flex-col gap-5">
          <li>
            <AddCard onClick={addCategory.onClick} />
          </li>
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
      </div>

      {/* Dialogs */}
      <AddCategoryDialog {...addCategory} />
      <EditCategoryDialog {...editCategory} />
    </main>
  );
}

export default Categories;
