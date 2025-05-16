import { FieldValues } from "react-hook-form";

// types
import { ActionPropsType, FormDialogPropsType } from "components";
import { CategoryDto, ValidationError } from "lib";

export interface CategoryCardPropsType extends CategoryDto {
  actions: ActionPropsType[];
  onClick: (id: number) => void;
  color: string;
}

export interface CategoryFormType
  extends Omit<CategoryDto, "deletedAt" | "createdAt" | "updatedAt">,
    FieldValues {}

export interface CategoryFormPropsType
  extends FormDialogPropsType<CategoryFormType, ValidationError> {}

export interface AddCategoryDialogPropsType
  extends FormDialogPropsType<CategoryFormType, ValidationError> {}

export interface EditCategoryDialogPropsType
  extends FormDialogPropsType<CategoryFormType, ValidationError> {}
