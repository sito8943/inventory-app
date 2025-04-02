import DbClient from "./DbClient";

export default class BaseClient {
  db = new DbClient();
  table = "";
  validator = null;

  async validates(row, event) {
    if (this.validator[event]) return await this.validator[event](row);
    return false;
  }

  /**
   *
   * @param {DbClient} dbClient
   */
  constructor(table, dbClient, validations = function () {}) {
    this.db = dbClient;
    this.table = table;
    this.validator = validations();
  }

  /**
   *
   * @param {object} value
   * @param {string} attributes
   * @returns
   */
  async insert(value, attributes) {
    const validated = await this.validates(value, "insert");
    if (!validated) return await this.db.insert(this.table, value, attributes);
    throw validated;
  }

  /**
   *
   * @param {object} value
   */
  async update(values) {
    const validated = await this.validates(values, "update");
    if (!validated)
      return await this.db.update(this.table, values, { id: values.id });
    throw validated;
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
  async getById(id, attributes, relationships) {
    return await this.db.select(this.table, { id }, attributes, relationships);
  }

  async softDelete(ids) {
    const validated = await this.validates(ids, "delete");
    if (!validated) return await this.db.softDelete(this.table, ids);
    throw validated;
  }
}
