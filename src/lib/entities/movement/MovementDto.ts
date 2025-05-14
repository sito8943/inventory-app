import { BaseEntityDto, CommonMovementDto } from "lib";

export interface MovementDto extends CommonMovementDto, BaseEntityDto {
  type: number;
}
