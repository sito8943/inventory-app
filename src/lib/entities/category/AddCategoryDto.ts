import { CategoryDto } from "lib";

export interface AddCategoryDto
  extends Omit<CategoryDto, "id" | "updatedAt" | "createdAt" | "deletedAt"> {
  name: string;
  description: string;
}
