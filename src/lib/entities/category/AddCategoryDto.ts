import { CategoryDto } from "lib";

export interface AddCategoryDto
  extends Omit<CategoryDto, "id" | "updatedAt" | "createdAt" | "deleted"> {
  name: string;
  description: string;
}
