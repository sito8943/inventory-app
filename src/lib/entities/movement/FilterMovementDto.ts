import { BaseFilterDto } from "lib";

export interface FilterMovementDto extends BaseFilterDto {
  name?: string;
  type?: number;
}
