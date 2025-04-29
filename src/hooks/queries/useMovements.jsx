// providers
import { useManager } from "../../providers/ManagerProvider";
import { useQuery } from "@tanstack/react-query";

export const MovementsQueryKeys = {
  all: {
    queryKey: ["movements"],
  },
  list: () => ({ queryKey: [...MovementsQueryKeys.all.queryKey, "list"] }),
  common: () => ({ queryKey: [...MovementsQueryKeys.all.queryKey, "common"] }),
};

export function useMovementsList() {
  const manager = useManager();

  return useQuery({
    ...MovementsQueryKeys.list(),
    queryFn: () => manager.Movements.get({ deleted: false }),
  });
}

export function useMovementsCommon() {
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
