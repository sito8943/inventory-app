import { useCallback } from "react";
import { useTranslation } from "react-i18next";

// providers
import { useManager } from "providers";

// components
import { ConfirmationDialog, Page, PrettyGrid } from "../../components";
import {
  AddProductDialog,
  DoMovementDialog,
  EditProductDialog,
  MovementLogsDialog,
  ProductCard,
} from "./components";

// hooks
import {
  useAddProduct,
  useDoMovement,
  useEditProduct,
  useMovementLogs,
} from "./hooks/dialogs/";
import { useDeleteDialog, useProductsList, ProductsQueryKeys } from "hooks";

// types
import { ProductDto } from "lib";

function Products() {
  const { t } = useTranslation();

  const manager = useManager();

  const { data, isLoading } = useProductsList({});

  // #region actions

  const deleteProduct = useDeleteDialog({
    mutationFn: (data: number[]) => manager.Products.softDelete(data),
    ...ProductsQueryKeys.all(),
  });

  const addProduct = useAddProduct();

  /*           const editProduct = useEditProduct();
                    
                      const doMovement = useDoMovement();
                    
                      const movementLogs = useMovementLogs();*/

  // #endregion

  /* const getActions = useCallback(
                        (record: ProductDto) => [
                          doMovement.action(record),
                          movementLogs.action(record),
                          deleteProduct.action(record),
                        ],
                        [doMovement, movementLogs, deleteProduct],
                      );*/

  return (
    <Page
      title={t("_pages:products.title")}
      isLoading={isLoading}
      addOptions={{
        onClick: () => addProduct.onClick(),
        disabled: isLoading,
        tooltip: t("_pages:products.add"),
      }}
    >
      <PrettyGrid
        data={data}
        emptyMessage={t("_pages:products.empty")}
        renderComponent={(product) => (
          <ProductCard
            actions={[] /*getActions(product)*/}
            onClick={(id: number) => {} /*editProduct.onClick(id)*/}
            {...product}
          />
        )}
      />

      {/* Dialogs */}
      <AddProductDialog {...addProduct} />
      {/*<EditProductDialog {...editProduct} />
      <DoMovementDialog {...doMovement} />
      <MovementLogsDialog {...movementLogs} />*/}
      {/*<ConfirmationDialog {...deleteProduct} />*/}
    </Page>
  );
}

export default Products;
