import { CategoryDto } from "lib";

export interface UpdateCategoryDto
  extends Omit<CategoryDto, "updatedAt" | "deletedAt" | "createdAt"> {
  name: string;
  color: string;
  description: string;
}
