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
import Loading from "../../components/Loading/Loading";
import ConfirmationDialog from "../../components/Dialog/ConfirmationDialog";
import { AddProductDialog, EditProductDialog } from "./component/ProductDialog";
import { DoMovementDialog } from "./component/DoMovementDialog";
import { MovementLogsDialog } from "./component/MovementLogs";

// hooks
import useAddProduct from "./hooks/dialogs/useAddProduct";
import useEditProduct from "./hooks/dialogs/useEditProduct";
import useDeleteDialog from "../../hooks/dialogs/useDeleteDialog";
import useDoMovement from "./hooks/dialogs/useDoMovement";
import useMovementLogs from "./hooks/dialogs/useMovementLogs";

function Products() {
  const { t } = useTranslation();

  const manager = useManager();

  const { data, isLoading } = useQuery({
    queryKey: [ReactQueryKeys.Products],
    enabled: true,
    queryFn: () =>
      manager.Products.get(
        { deletedAt: null },
        "products.*, categories.id as categoryId,categories.name as categoryName,categories.color",
        [{ table: "categories", on: "products.category = categories.id" }]
      ),
  });

  // #region actions

  const deleteProduct = useDeleteDialog({
    mutationFn: (data) => manager.Products.softDelete(data),
  });

  const addProduct = useAddProduct();

  const editProduct = useEditProduct();

  const doMovement = useDoMovement();

  const movementLogs = useMovementLogs();

  // #endregion

  const getActions = useCallback((record) => [
    doMovement.action(record),
    movementLogs.action(record.id),
    deleteProduct.action(record.id),
  ]);

  return (
    <main className="p-5">
      <div className="apparition flex flex-col gap-5">
        <h2 className="text-xl">{t("_pages:products.title")}</h2>
        {isLoading ? (
          <Loading
            size="text-3xl"
            containerClassName="flex justify-center items-center h-50"
          />
        ) : data?.length ? (
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
      <AddCard
        disabled={isLoading}
        onClick={addProduct.onClick}
        tooltip={t("_pages:products.add")}
      />

      {/* Dialogs */}
      <AddProductDialog {...addProduct} />
      <EditProductDialog {...editProduct} />
      <DoMovementDialog {...doMovement} />
      <MovementLogsDialog {...movementLogs} />
      <ConfirmationDialog {...deleteProduct} />
    </main>
  );
}

export default Products;
