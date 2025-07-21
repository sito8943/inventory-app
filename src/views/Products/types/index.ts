import { FieldValues } from "react-hook-form";

// @sito/dashboard
import { Action } from "@sito/dashboard";

// components
import { DialogPropsType, FormDialogPropsType } from "components";

// lib
import {
  DoMovementDto,
  MovementLogDto,
  ProductDto,
  ValidationError,
} from "lib";

import { TablePropsType } from "../../../components/Table/types.ts";

// actions
export * from "./actions";
export interface DoMovementDialogPropsType extends DoMovementFormPropsType {
  title: string;
  action: (record: ProductDto) => Action<ProductDto>;
}

export interface DoMovementFormType
  extends Partial<DoMovementDto>,
    FieldValues {}

export interface DoMovementFormPropsType
  extends FormDialogPropsType<DoMovementFormType, ValidationError> {
  product: number;
}

export interface ProductFormType
  extends Omit<
      ProductDto,
      "createdAt" | "deleted" | "updatedAt" | "price" | "stock" | "cost"
    >,
    FieldValues {
  price: number | string;
  cost: number | string;
  stock: number | string;
}

export type ProductFormPropsType = FormDialogPropsType<
  ProductFormType,
  ValidationError
>;

export type AddProductDialogPropsType = FormDialogPropsType<
  ProductFormType,
  ValidationError
>;

export type EditProductDialogPropsType = FormDialogPropsType<
  ProductFormType,
  ValidationError
>;

export type MovementLogsPropsType = {
  isLoading: boolean;
  containerClassName?: string;
  tableProps: TablePropsType<MovementLogDto>;
};

export interface MovementLogsDialogPropsType
  extends Omit<DialogPropsType, "isLoading">,
    MovementLogsPropsType {}

export interface ProductCardPropsType extends ProductDto {
  actions: Action<ProductDto>[];
  onClick: (id: number) => void;
}

export type UseProductFormPropsType = {
  id?: number;
};
