import {ProductDto} from "lib";

export type CategoryProductDto = {
    id: number;
    name: string;
    products: ProductDto[];
};
