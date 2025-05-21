import BaseClient from "./BaseClient";

// enum
import { Tables } from "./types";

// types
import {
  AddMovementDto,
  UpdateMovementDto,
  MovementDto,
  FilterMovementDto,
  CommonMovementDto,
} from "lib";

export default class MovementClient extends BaseClient<
  MovementDto,
  CommonMovementDto,
  AddMovementDto,
  UpdateMovementDto,
  FilterMovementDto
> {
  /**
   *
   */
  constructor() {
    super(Tables.Movements);
  }

  /**
   *
   * @param defaultValues
   * @returns
   */
  async init(defaultValues = []): Promise<false | number> {
    const { items } = await this.get({ deleted: false });

    if (items.length > 0) return false;

    await this.insertMany(defaultValues);

    return items.length;
  }
}
