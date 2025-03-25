import Database from "@tauri-apps/plugin-sql";

class DbClient {
  db = new Database();

  openDb = async () => (this.db = await Database.load("sqlite:base.db"));
  closeDb = async () => await this.db.close();

  async init() {
    // open first to created if doesn't exist
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
    try {
      await this.openDb();

      const result = await this.db.execute(
        `INSERT into ${table} (${
          attributes ?? Object.keys(value).toString()
        }) VALUES (${Object.values(value)
          .map((value) => (typeof value === "string" ? `'${value}'` : value))
          .toString()})`
      );

      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async update(table, values) {
    try {
      await this.openDb();

      const result = await this.db.execute();
    } catch (err) {
      console.error(err);
      throw err;
    }
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
   * @param {object} query
   * @param {string} attributes
   */
  async select(table, query, attributes = "*") {
    try {
      console.log(table, query, attributes);
      console.log(
        `SELECT ${attributes} FROM ${table} ${
          query
            ? `WHERE ${Object.keys(query).map(
                (key) => `${key} = ${query[key]}`
              )}`
            : ""
        }`
      );
      await this.openDb();
      const result = await this.db.select(
        `SELECT ${attributes} FROM ${table} ${
          query
            ? `WHERE ${Object.keys(query).map(
                (key) => `${key} = ${query[key]}`
              )}`
            : ""
        }`
      );

      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export default DbClient;
