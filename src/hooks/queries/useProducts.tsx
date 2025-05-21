import { useQuery, UseQueryResult } from "@tanstack/react-query";

// providers
import { useManager } from "providers";

// hooks
import { MovementsQueryKeys } from "./useMovements";

// types
import { UseFetchByIdPropsType, UseFetchPropsType } from "./types.ts";
import {
  CategoryProductDto,
  EntityQueryKey,
  FilterProductDto,
  MovementLogDto,
} from "lib";

export const ProductsQueryKeys: EntityQueryKey = {
  all: () => ({
    queryKey: ["products"],
  }),
  list: () => ({
    queryKey: [...ProductsQueryKeys.all().queryKey, "list"],
  }),
  productMovements: (productId: number) => ({
    queryKey: [...MovementsQueryKeys.all().queryKey, productId],
  }),
};

export const useProductsList = (
  props: UseFetchPropsType<FilterProductDto>,
): UseQueryResult<CategoryProductDto> => {
  const { filters = { deleted: false } } = props;

  const manager = useManager();

  return useQuery({
    ...ProductsQueryKeys.list(),
    queryFn: () => manager.Products.home(filters),
  });
};

export const useProductMovements = (
  props: UseFetchByIdPropsType,
): UseQueryResult<MovementLogDto[]> => {
  const { id } = props;

  const manager = useManager();

  return useQuery({
    ...ProductsQueryKeys.productMovements(id),
    queryFn: () => manager.Products.movementLogs(id),
  });
};
