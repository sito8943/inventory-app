import BaseClient from "./BaseClient";
import DbClient from "./DbClient";

export default class ProductClient extends BaseClient {
  /**
   * @param {string} table
   * @param {DbClient} dbClient
   */
  constructor(dbClient) {
    const validations = () => {
      const onInsert = async (row) => {
        if (!row.name) return "required: name";
        if (category == 0) return "invalid: category";
        return true;
      };
      const onUpdate = onInsert;

      return {
        insert: onInsert,
        update: onUpdate,
      };
    };

    super("products", dbClient, validations);
  }
}
