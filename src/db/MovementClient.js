import DbClient from "./DbClient";
import BaseClient from "./BaseClient";

// lib
import ValidationError from "../lib/ValidationError";

// enum
import { Tables } from "./types/dbUtils";
import { UniqueColumns } from "./types/products.js";

export default class MovementClient extends BaseClient {
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
            Tables.Movements,
            col,
            row[col],
          );
          if (exist && exist.id !== row.id)
            return new ValidationError([column, "unique"]);
        }
        if (row.type === 0) return new ValidationError(["type", "invalid"]);
        return false;
      };
      const onUpdate = onInsert;

      return {
        insert: onInsert,
        update: onUpdate,
      };
    };

    super(Tables.Movements, dbClient, validations);
  }
}
