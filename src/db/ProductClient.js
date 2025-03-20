import BaseClient from "./BaseClient";
import DbClient from "./DbClient";

export default class ProductClient extends BaseClient {
  /**
   *
   * @param {DbClient} dbClient
   */
  constructor(dbClient) {
    super("products", dbClient);
  }
}
