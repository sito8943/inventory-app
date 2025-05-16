import { BaseEntityDto, CommonMovementDto } from "lib";

export interface MovementDto extends CommonMovementDto, BaseEntityDto {
  description: string;
  type: number;
}
