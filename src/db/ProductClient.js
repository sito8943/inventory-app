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

      return {
        insert: onInsert,
        update: onUpdate,
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
  doMovement(dto) {
    const { id, movement, input } = dto;

    // search product
    const product = this.db.select(Tables.Products, { id });
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
    this.db.insert(Tables.MovementLogs, {
      product: id,
      movement,
      stock: input,
      result: newStock,
    });

    return this.db.update(Tables.Products, { stock: newStock }, { id });
  }

  // #endregion actions
}
