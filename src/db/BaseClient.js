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
   * @param {*} query
   * @param {*} attributes
   * @returns
   */
  async get(query, attributes) {
    return await this.db.select(this.table, query, attributes);
  }

  /**
   *
   * @param {*} id
   * @param {*} attributes
   * @returns
   */
  async getById(id, attributes) {
    return await this.db.select(this.table, { id }, attributes);
  }
}
