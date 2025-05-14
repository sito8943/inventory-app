// providers
import { useManager } from "../../providers/ManagerProvider";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

// types
import { UseFetchPropsType } from "./types.ts";
import { CategoryDto, CommonCategoryDto, FilterCategoryDto } from "lib";

export const CategoriesQueryKeys = {
  all: () => ({
    queryKey: ["categories"],
  }),
  list: () => ({ queryKey: [...CategoriesQueryKeys.all().queryKey, "list"] }),
  common: () => ({
    queryKey: [...CategoriesQueryKeys.all().queryKey, "common"],
  }),
};

export function useCategoriesList(
  props: UseFetchPropsType<FilterCategoryDto>,
): UseQueryResult<CategoryDto[]> {
  const { filters = { deleted: false } } = props;

  const manager = useManager();

  return useQuery({
    ...CategoriesQueryKeys.list(),
    queryFn: () => manager.Categories.get(filters),
  });
}

export function useCategoriesCommon(): UseQueryResult<CommonCategoryDto[]> {
  const manager = useManager();
  return useQuery({
    ...CategoriesQueryKeys.common(),
    queryFn: () => manager.Categories.commonGet({ deleted: false }),
  });
}
