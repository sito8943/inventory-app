import { ProductDto } from "lib";

export type CategoryProductDto = {
  [key: number]: ProductDto[];
};
