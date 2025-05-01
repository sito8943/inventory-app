import { invoke } from "@tauri-apps/api/core";

export default class BaseClient {
  table = "";
  validator = null;

  /**
   *
   * @param row
   * @param event
   * @returns {Promise<*|boolean>}
   */
  async validates(row, event) {
    if (this.validator[event]) return await this.validator[event](row);
    return false;
  }

  /**
   *
   * @param {string} table
   * @param {string} column
   * @param {object} value
   * @returns {Promise<*>}
   */
  static async UniqueValue(table, column, value) {
    const colQuery = {};
    colQuery[column] = value;
    /*const noEntries = await invoke("list_categories", {
              params: { items_per_page: 1 },
            });
            return noEntries[0];*/
  }

  /**
   *
   * @param {string} table
   * @param {function} validations
   */
  constructor(table, validations = function () {}) {
    this.table = table;
    this.validator = validations();
  }

  /**
   *
   * @param {object} value
   * @returns
   */
  async insert(value) {
    const validated = await this.validates(value, "insert");
    if (!validated)
      return await invoke(`create_${this.table}`, { form: value });
    throw validated;
  }

  /**
   *
   * @param {object[]} values
   * @returns count of items inserted
   */
  async insertMany(values) {
    return await invoke(`create_many_${this.table}`, { items: values });
  }

  /**
   *
   * @param {object} values
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
   * @returns {Promise<Array>} - Query result
   */
  async get(query = {}) {
    return await invoke(`list_${this.table}`, {
      filters: { ...query },
    });
  }

  /**
   *
   * @param {object} query - Where conditions (key-value)
   * @returns {Promise<Array>} - Query result
   */
  async commonGet(query = {}) {
    return await invoke(`list_common_${this.table}`, {
      filters: { ...query },
    });
  }

  /**
   *
   * @param {*} id
   * @returns {Promise<Array>} - Query result
   */
  async getById(id) {
    return await invoke(`${this.table}_by_id`, { id });
  }

  async softDelete(ids) {
    const validated = await this.validates(ids, "delete");
    if (!validated) return await invoke(`delete_${this.table}`, ids);
    throw validated;
  }
}
