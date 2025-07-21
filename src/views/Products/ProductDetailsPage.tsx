import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

// components
import { Page } from "components";
import { ProductForm } from "./components";

// hooks
import { useDoMovement, useMovementLogs, useProductForm } from "./hooks";
import { useDeleteDialog, ProductsQueryKeys } from "hooks";

// lib
import { ProductDto } from "lib";

// providers
import { useManager } from "providers";

export function ProductDetailsPage() {
  const { id = 0 } = useParams();

  const { t } = useTranslation();

  const manager = useManager();

  const productForm = useProductForm({ id: Number(id) });

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

  return (
    <Page
      title={t(`_pages:products.title`)}
      isLoading={productForm.isLoading}
      actions={
        id ? getActions((productForm.getValues?.() ?? {}) as ProductDto) : []
      }
    >
      <ProductForm {...productForm} />
    </Page>
  );
}
