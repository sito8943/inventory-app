// providers
import { useManager } from "../../providers/ManagerProvider";
import { useQuery } from "@tanstack/react-query";

export const CategoriesQueryKeys = {
  all: {
    queryKey: ["categories"],
  },
  list: () => ({ queryKey: [...CategoriesQueryKeys.all.queryKey, "list"] }),
  common: () => ({ queryKey: [...CategoriesQueryKeys.all.queryKey, "common"] }),
};

export function useCategoriesList() {
  const manager = useManager();

  return useQuery({
    ...CategoriesQueryKeys.list(),
    queryFn: () => manager.Categories.get({ deleted: false }),
  });
}

export function useCategoriesCommon() {
  const manager = useManager();
  return useQuery({
    ...CategoriesQueryKeys.common(),
    queryFn: () => manager.Categories.commonGet({ deleted: false }),
  });
}
