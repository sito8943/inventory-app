import { useQuery, UseQueryResult } from "@tanstack/react-query";

// providers
import { useLocalCache, useManager } from "providers";

// types
import { UseFetchPropsType } from "./types.ts";

// lib
import {
  MovementDto,
  CommonMovementDto,
  FilterMovementDto,
  QueryResult,
  Tables
} from "lib";

export const MovementsQueryKeys = {
  all: () => ({
    queryKey: ["movements"],
  }),
  list: () => ({ queryKey: [...MovementsQueryKeys.all().queryKey, "list"] }),
  common: () => ({
    queryKey: [...MovementsQueryKeys.all().queryKey, "common"],
  }),
};

export function useMovementsList(
  props: UseFetchPropsType<FilterMovementDto>
): UseQueryResult<QueryResult<MovementDto>> {
  const { filters = { deleted: false } } = props;

  const manager = useManager();
  const { loadCache, updateCache } = useLocalCache();

  return useQuery({
    ...MovementsQueryKeys.list(),
    queryFn: async () => {
      try {
        const result = await manager.Movements.get(filters);
        updateCache(Tables.Movements, result.items);
        return result;
      } catch (error) {
        console.warn("API failed, loading categories from cache", error);
        const cached = await loadCache(Tables.Movements);
        if (!cached || !Array.isArray(cached))
          throw new Error("No cached categories available");
        return { items: cached, total: cached?.length };
      }
    },
  });
}

export function useMovementsCommon(): UseQueryResult<CommonMovementDto[]> {
  const manager = useManager();
  const { loadCache, updateCache } = useLocalCache();

  return useQuery({
    ...MovementsQueryKeys.common(),
    queryFn: async () => {
      try {
        const result = await manager.Movements.commonGet({ deleted: false });
        updateCache(Tables.Movements, result.items);
        return result;
      } catch (error) {
        console.warn("API failed, loading categories from cache", error);
        const cached = (await loadCache(
          Tables.Movements
        )) as CommonMovementDto[];
        if (!cached || !Array.isArray(cached))
          throw new Error("No cached categories available");
        return cached.map(({ id, name }) => ({ id, name }));
      }
    },
  });
}

export const defaultMovements: Record<
  string,
  Record<string, string | number>[]
> = {
  en: [
    { name: "Purchases", type: 0, description: "" },
    { name: "Sales", type: 1, description: "" },
  ],
  es: [
    { name: "Compras", type: 0, description: "" },
    { name: "Ventas", type: 1, description: "" },
  ],
};
