import DbClient from "./DbClient";

export default class BaseClient {
  db = new DbClient();
  table = "";

  /**
   *
   * @param {DbClient} dbClient
   */
  constructor(table, dbClient) {
    this.db = dbClient;
    this.table = table;
  }

  /**
   *
   * @param {object} value
   * @param {string} attributes
   * @returns
   */
  async insert(value, attributes) {
    return await this.db.insert(this.table, value, attributes);
  }

  async get() {
    return await this.db.select(this.table);
  }
}
