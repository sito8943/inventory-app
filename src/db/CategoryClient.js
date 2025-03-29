import BaseClient from "./BaseClient";
import DbClient from "./DbClient";

export default class CategoryClient extends BaseClient {
  /**
   * @param {string} table
   * @param {DbClient} dbClient
   */
  constructor(dbClient) {
    const validations = () => {
      const onInsert = async (row) => {
        if (!row.name) return "required: name";
        return true;
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
