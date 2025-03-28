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

  /**
   *
   * @param {object} value
   */
  async update(values) {
    return await this.db.update(this.table, values, { id: values.id });
  }

  /**
   *
   * @param {object} query - Where conditions (key-value)
   * @param {string} attributes - Columns to select (default '*')
   * @param {Array<{ table: string, on: string }>} relationships - Tables to join
   * @returns {Promise<Array>} - Query result
   */
  async get(query, attributes, relationships) {
    return await this.db.select(this.table, query, attributes, relationships);
  }

  /**
   *
   * @param {*} id
   * @param {*} attributes
   * @param {Array<{ table: string, on: string }>} relationships - Tables to join
   * @returns {Promise<Array>} - Query result
   */
  async getById(id, attributes) {
    return await this.db.select(this.table, { id }, attributes, relationships);
  }

  async softDelete(ids) {
    return await this.db.softDelete(this.table, ids);
  }
}
