import { FieldValues } from "react-hook-form";

// types
import { ActionPropsType, FormDialogPropsType } from "components";
import { CategoryDto, ValidationError } from "lib";

export interface CategoryCardPropsType extends CategoryDto {
  actions: ActionPropsType[];
  onClick: (id: number) => void;
  deleted: boolean;
}

export interface CategoryFormType
  extends Omit<CategoryDto, "deleted" | "createdAt" | "updatedAt">,
    FieldValues {}

export type CategoryFormPropsType = FormDialogPropsType<CategoryFormType, ValidationError>

export type AddCategoryDialogPropsType = FormDialogPropsType<CategoryFormType, ValidationError>

export type EditCategoryDialogPropsType = FormDialogPropsType<CategoryFormType, ValidationError>
