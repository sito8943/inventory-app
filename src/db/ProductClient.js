import BaseClient from "./BaseClient";
import DbClient from "./DbClient";

// lib
import { ServiceError, ValidationError } from "../lib/";

// enum
import { MovementTypes, MovementDto, Tables } from "./types";
import { UniqueColumns } from "./types/products";

export default class ProductClient extends BaseClient {
  /**
   * @param {string} table
   * @param {DbClient} dbClient
   */
  constructor(dbClient) {
    const validations = () => {
      const onInsert = async (row) => {
        if (!row.name) return new ValidationError(["name", "required"]);
        // check uniqueness
        for (const col of UniqueColumns) {
          const exist = await BaseClient.UniqueValue(
            dbClient,
            Tables.Products,
            col,
            row[col],
          );
          if (exist) return exist;
        }
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
      let input = Number(dto.count);

      // search product
      const product = await this.db.select(Tables.Products, { id });

      // search movement type
      const movements = await this.db.select(Tables.Movements, {
        id: movement,
      });

      if (product.length === 0)
        return new ServiceError({ key: "product", message: "notFound" });

      if (movements.length === 0)
        return new ServiceError({ key: "movement", message: "notFound" });
      const { stock } = product[0];

      const { type } = movements[0];
      if (type === MovementTypes.OUT) input *= -1;

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

  /**
   *
   * @param {number} id
   * @returns {Promise<object[]>} - movement logs
   */
  async movementLogs(id) {
    const logs = await this.db.select(
      Tables.MovementLogs,
      { product: id },
      "movementLogs.id as id, movements.name as movement, movementLogs.stock as stock, movementLogs.result as result,movementLogs.createdAt as createdAt",
      [{ table: "movements", on: "movements.id = movementLogs.movement" }],
    );

    return logs;
  }

  // #endregion actions
}
