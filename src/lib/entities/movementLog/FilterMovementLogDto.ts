import { BaseFilterDto } from "lib";

export interface FilterMovementLogDto extends BaseFilterDto {
  product?: number;
  movement?: number;
}
