import {useCallback} from "react";
import {useQuery} from "@tanstack/react-query";
import {useTranslation} from "react-i18next";

// providers
import {useManager} from "../../providers/ManagerProvider";

// utils
import {ReactQueryKeys} from "../../utils/queryKey";

// components
import {AddCard, Loading, ConfirmationDialog} from "../../components";
import {
    ProductCard,
    AddProductDialog,
    EditProductDialog,
    DoMovementDialog,
    MovementLogsDialog,
} from "./components";

// hooks
import {
    useAddProduct,
    useEditProduct,
    useDoMovement,
    useMovementLogs,
} from "./hooks/dialogs/";
import useDeleteDialog from "../../hooks/dialogs/useDeleteDialog";


function Products() {
    const {t} = useTranslation();

    const manager = useManager();

    const {data, isLoading} = useQuery({
        queryKey: [ReactQueryKeys.Products],
        enabled: true,
        queryFn: () =>
            manager.Products.get(
                {deletedAt: null},
                "products.*, categories.id as categoryId,categories.name as categoryName,categories.color",
                [{table: "categories", on: "products.category = categories.id"}]
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
        movementLogs.action(record),
        deleteProduct.action(record),
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
