import { ProductDto } from "lib";

export interface UpdateProductDto
  extends Omit<ProductDto, "updatedAt" | "createdAt" | "deletedAt"> {}
