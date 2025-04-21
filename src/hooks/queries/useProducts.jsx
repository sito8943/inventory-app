// providers
import { useMemo } from "react";
import { useManager } from "../../providers/ManagerProvider";

export const ProductsQueryKeys = {
  all: () => ({
    queryKey: ["products"],
  }),
  list: () => ({ queryKey: [...ProductsQueryKeys.all().queryKey, "list"] }),
  details: (id) => ({queryKey:[...ProductsQueryKeys.all().queryKey, id]}),
};

function useProducts() {
  const manager = useManager();

  const list = useMemo(() => ({}), [manager]);

  return <div>useProducts</div>;
}

export default useProducts;
