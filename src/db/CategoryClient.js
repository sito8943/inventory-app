import BaseClient from "./BaseClient";
import DbClient from "./DbClient";

export default class CategoryClient extends BaseClient {
  /**
   * @param {string} table
   * @param {DbClient} dbClient
   */
  constructor(dbClient) {
    super("categories", dbClient);
  }
}
