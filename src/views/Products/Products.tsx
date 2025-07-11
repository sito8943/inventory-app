import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// providers
import { useManager } from "providers";

// components
import {
  ConfirmationDialog,
  Page,
  PrettyGrid,
  VerticalTabsLayout,
  Error,
} from "components";
import {
  DoMovementDialog,
  MovementLogsDialog,
  ProductCard,
} from "./components";

// hooks
import { useDoMovement, useMovementLogs } from "./hooks";
import {
  useDeleteDialog,
  useProductsList,
  ProductsQueryKeys,
  useCategoriesCommon,
} from "hooks";

// types
import { ProductDto } from "lib";
import { findPath, PageId } from "../sitemap";

export function Products() {
  const { t } = useTranslation();

  const manager = useManager();

  const navigate = useNavigate();

  const productQuery = useProductsList({});

  const categoryQuery = useCategoriesCommon();

  const isLoading = useMemo(
    () => productQuery.isLoading && categoryQuery.isLoading,
    [productQuery.isLoading, categoryQuery.isLoading]
  );

  const error = useMemo(
    () => productQuery.error || categoryQuery.error,
    [productQuery.error, categoryQuery.error]
  );

  // #region actions

  const deleteProduct = useDeleteDialog({
    mutationFn: (data: number[]) => manager.Products.softDelete(data),
    ...ProductsQueryKeys.all(),
  });

  const doMovement = useDoMovement();

  const movementLogs = useMovementLogs();

  // #endregion

  const getActions = useCallback(
    (record: ProductDto) => [
      doMovement.action(record),
      movementLogs.action(record),
      deleteProduct.action(record),
    ],
    [doMovement, movementLogs, deleteProduct]
  );

  const tabs = useMemo(() => {
    return (
      categoryQuery.data?.map(({ id, name }) => {
        const found = productQuery?.data?.find((item) => item.id === id);
        return {
          id,
          label: name,
          content: (
            <div
              id={name}
              key={id}
              className="p-5 pb-10 border-2 border-dark/20 rounded-xl"
            >
              <PrettyGrid
                data={(found?.products ?? []) as ProductDto[]}
                emptyMessage={t("_pages:products.empty")}
                renderComponent={(product) => (
                  <ProductCard
                    actions={getActions(product)}
                    onClick={(id: number) =>
                      navigate(
                        findPath(PageId.ProductDetails).replace(
                          ":id",
                          String(id)
                        )
                      )
                    }
                    {...product}
                  />
                )}
              />
            </div>
          ),
        };
      }) ?? []
    );
  }, [categoryQuery.data, productQuery?.data, t, getActions, navigate]);

  return (
    <Page
      title={t("_pages:products.title")}
      isLoading={isLoading}
      addOptions={{
        disabled: isLoading,
        tooltip: t("_pages:products.add"),
        onClick: () => navigate(findPath(PageId.ProductInsert)),
      }}
    >
      {!error ? (
        <>
          <VerticalTabsLayout
            defaultTab={tabs[0]?.id ?? 0}
            tabs={tabs}
            className="h-full"
          />
          {/* Dialogs */}
          <DoMovementDialog {...doMovement} />
          <MovementLogsDialog {...movementLogs} />
          <ConfirmationDialog {...deleteProduct} />
        </>
      ) : (
        <Error message={error?.message} />
      )}
    </Page>
  );
}
