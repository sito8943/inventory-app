import DbClient from "./DbClient";
import BaseClient from "./BaseClient";

// lib
import ValidationError from "../lib/ValidationError";

// enum
import { Tables, WhereLogic } from "./enum";

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
      const onDelete = async (ids) => {
        const noProducts = await dbClient.select(Tables.Products, {
          logic: WhereLogic.Or,
          property: "category",
          values: [ids.map((id) => id)],
        });
        if (noProducts.length > 0) {
          return new ValidationError(["categories", "withProducts"]);
        }
        return false;
      };

      return {
        insert: onInsert,
        update: onUpdate,
        delete: onDelete,
      };
    };

    super(Tables.Categories, dbClient, validations);
  }
}
