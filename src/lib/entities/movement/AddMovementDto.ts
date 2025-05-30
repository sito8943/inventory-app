import { MovementDto } from "lib";

export interface AddMovementDto
  extends Omit<MovementDto, "id" | "updatedAt" | "createdAt" | "deleted"> {
  name: string;
  type: number;
}
