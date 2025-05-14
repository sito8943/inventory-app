import {
  ActionPropsType,
  DialogPropsType,
  FormDialogPropsType,
} from "components";
import {
  AddMovementLogDto,
  AddProductDto,
  MovementLogDto,
  ProductDto,
  UpdateProductDto,
  ValidationError,
} from "lib";
import { TablePropsType } from "../../../components/Table/types.ts";

export interface DoMovementDialogPropsType extends DoMovementFormPropsType {
  title: string;
  action: (record: ProductDto) => ActionPropsType;
}

export interface DoMovementFormPropsType
  extends FormDialogPropsType<
    AddMovementLogDto,
    AddMovementLogDto,
    ValidationError
  > {
  productId: number;
}

export interface ProductFormPropsType
  extends FormDialogPropsType<ProductDto, ProductDto, ValidationError> {}

export interface AddProductDialogPropsType
  extends FormDialogPropsType<AddProductDto, AddProductDto, ValidationError> {}

export interface EditProductDialogPropsType
  extends FormDialogPropsType<
    UpdateProductDto,
    UpdateProductDto,
    ValidationError
  > {}

export type MovementLogsPropsType = {
  isLoading: boolean;
  containerClassName?: string;
  tableProps: TablePropsType<MovementLogDto>;
};

export interface MovementLogsDialogPropsType
  extends Omit<DialogPropsType, "isLoading">,
    MovementLogsPropsType {}

export interface ProductCardPropsType extends ProductDto {
  actions: ActionPropsType[];
  onClick: (id: number) => void;
  color: string;
}
