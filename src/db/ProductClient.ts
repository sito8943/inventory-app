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

  async home(query: FilterProductDto) {
    return await this.api.get(`${this.table}/home`, query);
  }

  // #region actions

  /**
   *
   * @param  dto
   * @returns - inserted movement log
   */
  async doMovement(dto: AddMovementLogDto) {
    return await this.api.post<MovementLogDto, AddMovementLogDto>(
      "do_movements",
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
