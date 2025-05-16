import { BaseEntityDto, CommonCategoryDto, CommonProductDto } from "lib";

export interface ProductDto extends CommonProductDto, BaseEntityDto {
  description: string;
  price: number;
  cost: number;
  stock: number;
  categories: CommonCategoryDto[];
}
