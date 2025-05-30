import { DeleteDto } from "lib";

export interface BaseEntityDto extends DeleteDto {
  deleted: Date;
  createdAt: Date;
  updatedAt: Date;
}
