import { ProductDto } from "lib";

export interface AddProductDto
  extends Omit<ProductDto, "id" | "updatedAt" | "createdAt" | "deleted" | "categories"> {
  categoryIds: number[];
}
