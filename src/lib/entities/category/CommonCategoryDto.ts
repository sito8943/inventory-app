import { BaseCommonEntityDto } from "lib";

export interface CommonCategoryDto extends BaseCommonEntityDto {
  name: string;
  color: string;
}
