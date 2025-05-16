import BaseClient from "./BaseClient";

// enum
import { Tables } from "./types";

// types
import {
  CommonCategoryDto,
  CategoryDto,
  UpdateCategoryDto,
  FilterCategoryDto,
  AddCategoryDto,
} from "lib";

export default class CategoryClient extends BaseClient<
  CategoryDto,
  CommonCategoryDto,
  AddCategoryDto,
  UpdateCategoryDto,
  FilterCategoryDto
> {
  /**
   */
  constructor() {
    super(Tables.Categories);
  }
}
