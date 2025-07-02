import {ProductDto} from "lib";

export interface UpdateProductDto
    extends Omit<ProductDto, "updatedAt" | "createdAt" | "deleted" | "categories"> {
    categoryIds: number[]
}
