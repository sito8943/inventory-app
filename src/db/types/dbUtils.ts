export enum Tables {
  Products = "products",
  Categories = "categories",
  Movements = "movements",
  MovementLogs = "movement_logs",
}

export enum TablesCamelCase {
  Products = "products",
  Categories = "categories",
  Movements = "movements",
  MovementLogs = "movementLogs",
}

export const WhereLogic = {
  And: "AND",
  Or: "OR",
};

export type APIError = {
  kind: string;
  message: string;
};
