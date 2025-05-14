import { MovementDto } from "lib";

export interface UpdateMovementDto
  extends Omit<MovementDto, "updatedAt" | "createdAt" | "deletedAt"> {
  name: string;
  type: number;
}
