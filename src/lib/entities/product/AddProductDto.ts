import {ProductDto} from "lib";

export interface AddProductDto
    extends Omit<ProductDto, "id" | "updatedAt" | "createdAt" | "deleted"> {
    name: string;
    description: string;
    price: number;
    cost: number;
    stock: number;
    categoryIds: number[]
}
