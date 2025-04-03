import DbClient from "./DbClient";
import BaseClient from "./BaseClient";

// lib
import ValidationError from "../lib/ValidationError";

// enum
import { Tables } from "./types/dbUtils";

export default class MovementClient extends BaseClient {
  /**
   * @param {string} table
   * @param {DbClient} dbClient
   */
  constructor(dbClient) {
    const validations = () => {
      const onInsert = async (row) => {
        if (!row.name) return new ValidationError(["name", "required"]);
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
