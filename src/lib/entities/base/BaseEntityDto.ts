import { DeleteDto } from "lib";

export interface BaseEntityDto extends DeleteDto {
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
