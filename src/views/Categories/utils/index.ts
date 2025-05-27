import { CategoryDto, UpdateCategoryDto } from "lib";
import { CategoryFormType } from "../types";

export const formToDto = ({
  id,
  name,
  description,
}: CategoryFormType): UpdateCategoryDto => ({
  id,
  name,
  description,
});

export const dtoToForm = (dto: CategoryDto): CategoryFormType => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
});

export const emptyCategory: CategoryFormType = {
  id: 0,
  name: "",
  description: "",
};
