import { BaseFilterDto } from "lib";

export interface FilterProductDto extends BaseFilterDto {
  name?: string;
  price?: number;
  cost?: number;
  stock?: number;
}
