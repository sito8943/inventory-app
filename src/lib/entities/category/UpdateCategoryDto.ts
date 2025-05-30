import { CategoryDto } from "lib";

export interface UpdateCategoryDto
  extends Omit<CategoryDto, "updatedAt" | "deleted" | "createdAt"> {
  name: string;
  description: string;
}
