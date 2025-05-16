import { FieldValues } from "react-hook-form";
import { ActionPropsType, FormDialogPropsType } from "components";
import { MovementDto, ValidationError } from "lib";

export interface MovementFormType
  extends Omit<MovementDto, "createdAt" | "deletedAt" | "updatedAt">,
    FieldValues {}

export interface MovementFormPropsType
  extends FormDialogPropsType<MovementFormType, ValidationError> {}

export interface AddMovementDialogPropsType
  extends FormDialogPropsType<MovementFormType, ValidationError> {}

export interface EditMovementDialogPropsType
  extends FormDialogPropsType<MovementFormType, ValidationError> {}

export interface MovementCardPropsType extends MovementDto {
  actions: ActionPropsType[];
  onClick: (id: number) => void;
  color: string;
}
