import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

// @sito/dashboard
import { Action, FilterTypes, Table } from "@sito/dashboard";

// providers
import { useManager } from "providers";

// components
import { ConfirmationDialog, Page, Error } from "components";
import { DoMovementDialog, MovementLogsDialog } from "./components";

// hooks
import { useDoMovement, useMovementLogs } from "./hooks";
import {
  useDeleteDialog,
  useProductsList,
  ProductsQueryKeys,
  useCategoriesCommon,
} from "hooks";

// types
import { BaseEntityDto, EntityName, ProductDto, useParseColumns } from "lib";
import { findPath, PageId } from "../sitemap";

export function Products() {
  const { t } = useTranslation();

  const manager = useManager();

  const navigate = useNavigate();

  const { data, isLoading, setTotal, error } = useProductsList();

  const { data: categoryList } = useCategoriesCommon();

  useEffect(() => {
    if (data) setTotal(data.total ?? 0);
  }, [data, setTotal]);

  // #region actions

  const deleteProduct = useDeleteDialog({
    mutationFn: (data: number[]) => manager.Products.softDelete(data),
    ...ProductsQueryKeys.all(),
  });

  const doMovement = useDoMovement();

  const movementLogs = useMovementLogs();

  // #endregion

  const getActions = useCallback(
    (record: ProductDto): Action<ProductDto>[] => [
      doMovement.action(record),
      movementLogs.action(record),
      deleteProduct.action(record),
    ],
    [doMovement, movementLogs, deleteProduct]
  );

  const { columns } = useParseColumns<ProductDto>(
    [
      {
        key: "name",
        filterOptions: { type: FilterTypes.text, defaultValue: "" },
        renderBody: (name: string, entity: BaseEntityDto) => (
          <Link
            className={`underline ${entity.deleted ? "text-white" : "text-light-primary"} flex`}
            to={`${entity.id}`}
          >
            <span className="w-80 truncate">{name}</span>
          </Link>
        ),
      },
    ],
    EntityName.Product,
    ["createdAt"]
  );

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
          <Table
            data={data?.items ?? []}
            actions={getActions}
            isLoading={isLoading}
            entity={EntityName.Product}
            columns={columns}
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
