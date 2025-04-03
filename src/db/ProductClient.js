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
}
