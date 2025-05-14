import BaseClient from "./BaseClient";

// enum
import { Tables } from "./types";

// types
import {
  AddMovementLogDto,
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
  async doMovement(dto: AddMovementLogDto) {
    return await this.db.post<AddMovementLogDto>("do_movements", dto);
  }

  /**
   *
   * @param id - product id
   * @returns - product movement logs
   */
  async movementLogs(id: number) {
    return await this.db.commonGet<MovementLogDto, FilterMovementLogDto>(
      `list_common_${Tables.MovementLogs}`,
      { product: id },
    );
  }

  // #endregion actions
}
