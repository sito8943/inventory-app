import { useQuery, UseQueryResult } from "@tanstack/react-query";

// providers
import { useCache, useManager } from "providers";

// hooks
import { MovementsQueryKeys } from "./useMovements";

// types
import { UseFetchByIdPropsType, UseFetchPropsType } from "./types.ts";

// lib
import {
  CategoryProductDto,
  EntityQueryKey,
  FilterProductDto,
  MovementLogDto,
  Tables,
} from "lib";

export const ProductsQueryKeys: EntityQueryKey<number> = {
  all: () => ({
    queryKey: ["products"],
  }),
  list: () => ({
    queryKey: [...ProductsQueryKeys.all().queryKey, "list"],
  }),
  productMovements: (productId?: number) => ({
    queryKey: [...MovementsQueryKeys.all().queryKey, productId],
  }),
};

export const useProductsList = (
  props: UseFetchPropsType<FilterProductDto>
): UseQueryResult<CategoryProductDto[]> => {
  const { filters = { deleted: false } } = props;

  const manager = useManager();
  const { loadCache, updateCache } = useCache();

  return useQuery({
    ...ProductsQueryKeys.list(),
    queryFn: async () => {
      try {
        const result = await manager.Categories.home(filters);
        updateCache(Tables.Products, result.items);
        return result;
      } catch (error) {
        console.warn("API failed, loading categories from cache", error);
        const cached = (await loadCache(
          Tables.Products
        )) as CategoryProductDto[];
        if (!cached || !Array.isArray(cached))
          throw new Error("No cached categories available");
        return { items: cached, total: cached?.length };
      }
    },
  });
};

export const useProductMovements = (
  props: UseFetchByIdPropsType
): UseQueryResult<MovementLogDto[]> => {
  const { id } = props;

  const manager = useManager();
  const { loadCache, updateCache } = useCache();

  return useQuery({
    ...ProductsQueryKeys.productMovements(id),
    queryFn: async () => {
      try {
        const result = await manager.Products.movementLogs(id);
        updateCache(Tables.MovementLogs, result.items);
        return result;
      } catch (error) {
        console.warn("API failed, loading categories from cache", error);
        const cached = (await loadCache(
          Tables.MovementLogs
        )) as MovementLogDto[];
        if (!cached || !Array.isArray(cached))
          throw new Error("No cached categories available");
        return {
          items: cached.filter((movementLog) => movementLog.product === id),
          total: cached?.length,
        };
      }
    },
  });
};
