import { CategoryDto, UpdateCategoryDto } from "lib";
import { CategoryFormType } from "../types";

export const formToDto = ({
  id,
  name,
  description,
  color,
}: CategoryFormType): UpdateCategoryDto => ({
  id,
  name,
  description,
  color,
});

export const dtoToForm = (dto: CategoryDto): CategoryFormType => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  color: dto.color,
});

export const emptyCategory: CategoryFormType = {
  id: 0,
  name: "",
  description: "",
  color: "",
};
