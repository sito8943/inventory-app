import { InvalidateQueryFilters, QueryKey } from "@tanstack/react-query";

export const ReactQueryKeys = {
  Categories: "categories",
  Products: "products",
  Movements: "movements",
  MovementLogs: "movementLogs",
};

export interface EntityInvalidateQueryFilters
  extends Omit<InvalidateQueryFilters, "queryKey"> {
  queryKey: QueryKey;
}

export interface EntityQueryKey {
  [key: string]: (data?: any) => EntityInvalidateQueryFilters;
}
