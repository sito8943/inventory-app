import { CommonCategoryDto, ProductDto } from "lib";

export interface AddProductDto
  extends Omit<ProductDto, "id" | "updatedAt" | "createdAt" | "deletedAt"> {
  name: string;
  description: string;
  price: number;
  cost: number;
  stock: number;
  categories: CommonCategoryDto[];
}
