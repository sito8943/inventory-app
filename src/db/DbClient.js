import Database from "@tauri-apps/plugin-sql";

class DbClient {
  db = new Database();

  async init() {
    this.db = await Database.load("sqlite:base.db");

    // create important db
  }

  constructor() {
    this.init();
  }

  /**
   *
   * @param {string} table
   * @param {object} value
   * @param {string} attributes
   * @returns sql result
   */
  async insert(table, value, attributes) {
    return await db.execute(
      `INSERT into ${table} (${
        attributes ?? Object.keys(value).toString()
      }) VALUES (${Object.values(value).toString()})`
    );
  }

  /**
   *
   * @param {string} table
   * @param {object[]} values
   * @param {string} attributes
   * @returns count of items inserted
   */
  async insertMany(table, values, attributes) {
    for (const val of values) await this.insert(table, val, attributes);

    return values.length;
  }

  /**
   *
   * @param {string} table
   * @param {string} attributes
   */
  async select(table, attributes = "*") {
    try {
      return await this.db.select(`SELECT ${attributes} FROM ${table}`);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export default DbClient;
