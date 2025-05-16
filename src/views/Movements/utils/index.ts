import { MovementDto, UpdateMovementDto } from "lib";
import { MovementFormType } from "../types";

export const formToDto = ({
  id,
  name,
  description,
  type,
}: MovementFormType): UpdateMovementDto => ({
  id,
  name,
  description,
  type,
});

export const dtoToForm = (dto: MovementDto): MovementFormType => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  type: dto.type,
});

export const emptyMovement: MovementFormType = {
  id: 0,
  name: "",
  description: "",
  type: 0,
};
