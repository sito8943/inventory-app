import { FieldValues } from "react-hook-form";
import { ActionPropsType, FormDialogPropsType } from "components";
import { MovementDto, ValidationError } from "lib";

export interface MovementFormType
  extends Omit<MovementDto, "createdAt" | "deleted" | "updatedAt">,
    FieldValues {}

export type MovementFormPropsType = FormDialogPropsType<MovementFormType, ValidationError>

export type AddMovementDialogPropsType = FormDialogPropsType<MovementFormType, ValidationError>

export type EditMovementDialogPropsType = FormDialogPropsType<MovementFormType, ValidationError>

export interface MovementCardPropsType extends MovementDto {
  actions: ActionPropsType[];
  onClick: (id: number) => void;
}
