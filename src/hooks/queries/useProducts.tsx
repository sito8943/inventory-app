import { useQuery, UseQueryResult } from "@tanstack/react-query";

// @sito/dashboard
import { useTableOptions } from "@sito/dashboard";

// providers
import { useLocalCache, useManager } from "providers";

// hooks
import { MovementsQueryKeys } from "./useMovements";

// types
import { ApiQueryResult, UseFetchByIdPropsType } from "./types.ts";

// lib
import {
  EntityQueryKey,
  MovementLogDto,
  ProductDto,
  QueryResult,
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

export const useProductsList = (): ApiQueryResult<ProductDto> => {
  const { sortingBy, setTotal, sortingOrder, currentPage, pageSize, filters } =
    useTableOptions();

  const manager = useManager();
  const { loadCache, updateCache } = useLocalCache();

  const query = useQuery({
    ...ProductsQueryKeys.list(),
    queryFn: async () => {
      try {
        const result = await manager.products.get({
          sortingBy,
          sortingOrder,
          currentPage,
          pageSize,
          ...filters,
        });
        updateCache(Tables.Products, result.items);
        return result;
      } catch (error) {
        console.warn("API failed, loading categories from cache", error);
        const cached = loadCache(Tables.Products) as ProductDto[];
        if (!cached || !Array.isArray(cached))
          throw new Error("No cached categories available");
        return {
          items: cached,
          total: cached?.length,
        } as QueryResult<ProductDto>;
      }
    },
  });

  return { ...query, setTotal };
};

export const useProductMovements = (
  props: UseFetchByIdPropsType
): UseQueryResult<MovementLogDto[]> => {
  const { id } = props;

  const manager = useManager();
  const { loadCache, updateCache } = useLocalCache();

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
