import { useCallback, useMemo } from "react";
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
import {
  useDeleteDialog,
  useProductsList,
  ProductsQueryKeys,
  useCategoriesCommon,
} from "hooks";

// types
import { ProductDto } from "lib";
import { Error } from "components";
import { TabsLayout } from "../../components/TabsLayout";
import categories from "../Categories/Categories.tsx";

function Products() {
  const { t } = useTranslation();

  const manager = useManager();

  const productQuery = useProductsList({});

  const categoryQuery = useCategoriesCommon();

  const isLoading = useMemo(
    () => productQuery.isLoading && categoryQuery.isLoading,
    [productQuery.isLoading, categoryQuery.isLoading],
  );

  const error = useMemo(
    () => productQuery.error || categoryQuery.error,
    [productQuery.error, categoryQuery.error],
  );

  // #region actions

  const deleteProduct = useDeleteDialog({
    mutationFn: (data: number[]) => manager.Products.softDelete(data),
    ...ProductsQueryKeys.all(),
  });

  const addProduct = useAddProduct();

  const editProduct = useEditProduct();

  const doMovement = useDoMovement();

  /*const movementLogs = useMovementLogs();*/

  // #endregion

  const getActions = useCallback(
    (record: ProductDto) => [
      doMovement.action(record),
      /*movementLogs.action(record),*/
      deleteProduct.action(record),
    ],
    [doMovement /*movementLogs*/, , deleteProduct],
  );

  const tabs = useMemo(
    () =>
      categoryQuery.data?.map(({ id, name }) => ({ id, label: name })) ?? [],
    [categoryQuery.data],
  );

  const content = useMemo(
    () =>
      categoryQuery.data?.map(({ id, name }) => (
        <div id={name} key={id}>
          <h3 className="text-xl text-gray-300">{name}</h3>
          <PrettyGrid
            data={productQuery.data}
            emptyMessage={t("_pages:products.empty")}
            renderComponent={(product) => (
              <ProductCard
                actions={getActions(product)}
                onClick={(id: number) => editProduct.onClick(id)}
                {...product}
              />
            )}
          />
        </div>
      )) ?? [],
    [categoryQuery.data, productQuery.data, t, getActions, editProduct],
  );

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
      {!error ? (
        <>
          <TabsLayout tabs={tabs} content={content} />

          {/* Dialogs */}
          <AddProductDialog {...addProduct} />
          <EditProductDialog {...editProduct} />
          <DoMovementDialog {...doMovement} />
          {/*<MovementLogsDialog {...movementLogs} />*/}
          <ConfirmationDialog {...deleteProduct} />
        </>
      ) : (
        <Error message={error?.message} />
      )}
    </Page>
  );
}

export default Products;
