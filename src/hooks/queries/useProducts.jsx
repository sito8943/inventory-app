// providers
import { useMemo } from "react";
import { useManager } from "../../providers/ManagerProvider";
import { useQuery } from "@tanstack/react-query";

export const ProductsQueryKeys = {
  all: {
    queryKey: ["products"],
  },
  list: () => ({ queryKey: [...ProductsQueryKeys.all.queryKey, "list"] }),
  details: (id) => ({ queryKey: [...ProductsQueryKeys.all.queryKey, id] }),
};

function useProductsList(props) {
  const { filters } = props;

  const manager = useManager();

  return useQuery({
    ...ProductsQueryKeys.list(),
    queryFn: () =>
      manager.Products.get(
        { deletedAt: null },
        "products.*, categories.id as categoryId,categories.name as categoryName,categories.color",
        [{ table: "categories", on: "products.category = categories.id" }],
      ),
  });
}

export default useProductsList;
