import { useQuery } from "@tanstack/react-query";

// providers
import { useManager } from "../../providers/ManagerProvider";

// hooks
import { MovementsQueryKeys } from "./useMovements.jsx";

export const ProductsQueryKeys = {
  all: {
    queryKey: ["products"],
  },
  list: () => ({ queryKey: [...ProductsQueryKeys.all.queryKey, "list"] }),
  productMovements: (productId) => ({
    queryKey: [...MovementsQueryKeys.all.queryKey, productId],
  }),
};

function useProductsList(props) {
  const { filters = [] } = props;

  const manager = useManager();

  return useQuery({
    ...ProductsQueryKeys.list(),
    queryFn: () =>
      manager.Products.get(
        filters ? { deletedAt: null } : [{ deletedAt: null }, ...filters],
        "products.*, categories.id as categoryId,categories.name as categoryName,categories.color",
        [{ table: "categories", on: "products.category = categories.id" }],
      ),
  });
}

export function useProductMovements(props) {
  const { id } = props;

  const manager = useManager();

  return useQuery({
    ...ProductsQueryKeys.productMovements(id),
    queryFn: () => manager.Products.movementLogs(id),
  });
}

export default useProductsList;
