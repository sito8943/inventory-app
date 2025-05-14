// providers
import { useManager } from "../../providers/ManagerProvider";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

// types
import { UseFetchPropsType } from "./types.ts";
import { MovementDto, CommonMovementDto, FilterMovementDto } from "lib";

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
  props: UseFetchPropsType<FilterMovementDto>,
): UseQueryResult<MovementDto[]> {
  const { filters = { deleted: false } } = props;

  const manager = useManager();

  return useQuery({
    ...MovementsQueryKeys.list(),
    queryFn: () => manager.Movements.get(filters),
  });
}

export function useMovementsCommon(): UseQueryResult<CommonMovementDto[]> {
  const manager = useManager();
  return useQuery({
    ...MovementsQueryKeys.common(),
    queryFn: () => manager.Movements.commonGet({ deleted: false }),
  });
}

export const defaultMovements = {
  en: [
    { name: "Purchases", type: 1 },
    { name: "Sales", type: 2 },
  ],
  es: [
    { name: "Compras", type: 1 },
    { name: "Ventas", type: 2 },
  ],
};
