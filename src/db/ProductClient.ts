import BaseClient from "./BaseClient";

// enum
import {Tables} from "./types";

// types
import {
    DoMovementDto,
    AddProductDto,
    CommonProductDto,
    MovementLogDto,
    ProductDto,
    UpdateProductDto,
    FilterProductDto,
    FilterMovementLogDto,
} from "lib";

export default class ProductClient extends BaseClient<
    ProductDto,
    CommonProductDto,
    AddProductDto,
    UpdateProductDto,
    FilterProductDto
> {
    /**
     *
     */
    constructor() {
        super(Tables.Products);
    }

    // #region actions

    /**
     *
     * @param  dto
     * @returns - inserted movement log
     */
    async doMovement(dto: DoMovementDto) {
        return await this.api.post<MovementLogDto, DoMovementDto>(
            `${this.table}/do-movement`,
            dto,
        );
    }

    /**
     *
     * @param id - product id
     * @returns - product movement logs
     */
    async movementLogs(id: number) {
        return await this.api.get<MovementLogDto, FilterMovementLogDto>(
            `${Tables.MovementLogs}/common?product=${id}`,
        );
    }

    // #endregion actions
}
