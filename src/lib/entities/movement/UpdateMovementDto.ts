import { MovementDto } from "lib";

export interface UpdateMovementDto
  extends Omit<MovementDto, "updatedAt" | "createdAt" | "deleted"> {
  name: string;
  type: number;
}
