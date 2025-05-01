import BaseClient from "./BaseClient";

// lib
import ValidationError from "../lib/ValidationError";

// enum
import { Tables } from "./types/dbUtils";
import { UniqueColumns } from "./types/products.js";

export default class MovementClient extends BaseClient {
  /**
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
            return new ValidationError([col, "unique"]);
        }
        if (row.type === 0) return new ValidationError(["type", "invalid"]);
        return false;
      };
      return {
        insert: onInsert,
        update: onInsert,
      };
    };

    super(Tables.Movements, validations);
  }

  /**
   *
   * @param {object[]} defaultValues
   * @returns {Promise<boolean>}
   */
  async init(defaultValues = []) {
    const movements = await this.get({ name: null, deleted: false });

    if (movements.length > 0) return false;

    await this.insertMany(defaultValues);
  }
}
