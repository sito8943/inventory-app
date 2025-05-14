import { MovementDto } from "lib";

export interface AddMovementDto
  extends Omit<MovementDto, "id" | "updatedAt" | "createdAt" | "deletedAt"> {
  name: string;
  type: number;
}
