import BaseClient from "./BaseClient";
import DbClient from "./DbClient";

// lib
import { ServiceError, ValidationError } from "../lib/";

// enum
import { MovementTypes, MovementDto, Tables } from "./types";

export default class ProductClient extends BaseClient {
  /**
   * @param {string} table
   * @param {DbClient} dbClient
   */
  constructor(dbClient) {
    const validations = () => {
      const onInsert = async (row) => {
        if (!row.name) return new ValidationError(["name", "required"]);
        if (row.category == 0)
          return new ValidationError(["category", "invalid"]);
        return false;
      };
      const onUpdate = onInsert;
      const onDoMovement = async (dto) => {
        if (dto.movement == 0)
          return new ValidationError(["movement", "invalid"]);
        return false;
      };

      return {
        insert: onInsert,
        update: onUpdate,
        movement: onDoMovement,
      };
    };

    super(Tables.Products, dbClient, validations);
  }

  // #region actions

  /**
   *
   * @param {MovementDto} dto
   * @returns {Promise<number>} - count of items updated
   */
  async doMovement(dto) {
    const validated = await this.validates(dto, "movement");
    if (!validated) {
      const { id, movement } = dto;
      const input = Number(dto.count);

      // search product
      const product = await this.db.select(Tables.Products, { id });
      if (product.length === 0)
        return new ServiceError({ key: "product", message: "notFound" });
      const { stock } = product[0];

      const newStock = stock + input;
      // check if stock is enough
      if (newStock < 0) {
        return new ServiceError({
          key: "product",
          message: "notEnoughStock",
        });
      }

      // log movement
      await this.db.insert(Tables.MovementLogs, {
        product: id,
        movement,
        stock: input,
        result: newStock,
      });

      return await this.db.update(Tables.Products, { stock: newStock }, { id });
    }
    throw validated;
  }

  // #endregion actions
}
