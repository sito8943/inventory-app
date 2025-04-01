import DbClient from "./DbClient";
import BaseClient from "./BaseClient";
import ValidationError from "../lib/ValidationError";

export default class CategoryClient extends BaseClient {
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

    super("categories", dbClient, validations);
  }
}
