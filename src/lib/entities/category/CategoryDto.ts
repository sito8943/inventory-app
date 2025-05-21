import { BaseEntityDto, CommonCategoryDto } from "lib";

export interface CategoryDto extends CommonCategoryDto, BaseEntityDto {
  name: string;
  description: string;
}
