export enum Tables {
  Products = "products",
  Categories = "categories",
  Movements = "movements",
  MovementLogs = "movement-logs",
}

export enum TablesCamelCase {
  Products = "products",
  Categories = "categories",
  Movements = "movements",
  MovementLogs = "movementLogs",
}

export type APIError = {
  kind: string;
  message: string;
};
