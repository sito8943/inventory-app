import { BaseCommonEntityDto } from "lib";

export interface MovementLogDto extends BaseCommonEntityDto {
  product: number;
  movement: number;
  stock: number;
  result: number;
  updateAt: string;
}
