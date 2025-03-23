import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// providers
import { useManager } from "../../providers/ManagerProvider";

// utils
import { ReactQueryKeys } from "../../utils/queryKey";

// components
import AddCard from "../../components/Card/AddCard";
import AddCategoryDialog from "./categories/AddCategoryDialog";

// hooks
import useAddCategory from "./hooks/useAddCategory";

function Categories() {
  const { t } = useTranslation();

  const manager = useManager();

  const { data, isLoading } = useQuery({
    queryKey: [ReactQueryKeys.Categories],
    enabled: true,
    queryFn: () => manager.Categories.get(),
  });

  const addCategory = useAddCategory();

  return (
    <main className="p-5">
      <div className="apparition flex flex-col gap-5">
        <h2 className="text-xl">{t("_pages:categories.title")}</h2>
        <AddCard onClick={addCategory.onClick} />
      </div>
      <AddCategoryDialog {...addCategory} />
    </main>
  );
}

export default Categories;
