import { ProductDto, UpdateProductDto } from "lib";
import { ProductFormType } from "../types";

export const formToDto = ({
  id,
  name,
  description,
  price,
  cost,
  stock,
  categories,
}: ProductFormType): UpdateProductDto => ({
  id,
  name,
  description,
  price,
  cost,
  stock,
  categories,
});

export const dtoToForm = (dto: ProductDto): ProductFormType => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  price: dto.price,
  cost: dto.cost,
  stock: dto.stock,
  categories: dto.categories,
});

export const emptyProduct: ProductFormType = {
  id: 0,
  name: "",
  description: "",
  price: 0,
  cost: 0,
  stock: 0,
  categories: [],
};
