import { ActionPropsType, FormDialogPropsType } from "components";
import {
  AddMovementDto,
  MovementDto,
  UpdateMovementDto,
  ValidationError,
} from "lib";

export interface MovementFormPropsType
  extends FormDialogPropsType<MovementDto, MovementDto, ValidationError> {}

export interface AddMovementDialogPropsType
  extends FormDialogPropsType<
    AddMovementDto,
    AddMovementDto,
    ValidationError
  > {}

export interface EditMovementDialogPropsType
  extends FormDialogPropsType<
    UpdateMovementDto,
    UpdateMovementDto,
    ValidationError
  > {}

export interface MovementCardPropsType extends MovementDto {
  actions: ActionPropsType[];
  onClick: (id: number) => void;
  color: string;
}
