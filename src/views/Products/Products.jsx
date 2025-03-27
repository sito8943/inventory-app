import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// providers
import { useManager } from "../../providers/ManagerProvider";

// utils
import { ReactQueryKeys } from "../../utils/queryKey";

// components
import AddCard from "../../components/Card/AddCard";
import ProductCard from "./component/ProductCard";
import ConfirmationDialog from "../../components/Dialog/ConfirmationDialog";
import { AddProductDialog, EditProductDialog } from "./component/ProductDialog";

// hooks
import useAddProduct from "./hooks/useAddProduct";
import useEditProduct from "./hooks/useEditProduct";
import useDeleteDialog from "../../hooks/dialogs/useDeleteDialog";

function Products() {
  const { t } = useTranslation();

  const manager = useManager();

  const { data, isLoading } = useQuery({
    queryKey: [ReactQueryKeys.Products],
    enabled: true,
    queryFn: () => manager.Products.get({ deletedAt: null }),
  });

  // #region actions

  const deleteProduct = useDeleteDialog();

  const addProduct = useAddProduct();

  const editProduct = useEditProduct();

  // #endregion

  const getActions = useCallback((record) => [deleteProduct.action(record.id)]);

  return (
    <main className="p-5">
      <div className="apparition flex flex-col gap-5">
        <h2 className="text-xl">{t("_pages:products.title")}</h2>
        {data?.length ? (
          <ul className="flex flex-wrap max-xs:flex-col gap-5">
            {data?.map((product) => (
              <li key={product.id}>
                <ProductCard
                  actions={getActions(product)}
                  onClick={(id) => editProduct.onClick(id)}
                  {...product}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="!text-gray-400 text-center mt-5">
            {t("_pages:products.empty")}
          </p>
        )}
      </div>
      <AddCard onClick={addProduct.onClick} />

      {/* Dialogs */}
      <AddProductDialog {...addProduct} />
      <EditProductDialog {...editProduct} />
      <ConfirmationDialog {...deleteProduct} />
    </main>
  );
}

export default Products;
