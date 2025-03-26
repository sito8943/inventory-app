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

  /**
   *
   * @param {string} table
   * @param {object} values
   * @param {object} query
   * @returns
   */
  async update(table, values, query) {
    try {
      await this.openDb();

      const conditions = Object.keys(query);
      const setClause = Object.keys(values)
        .map((key, i) => `${key} = $${i + 1}`)
        .join(", ");

      let sql = `UPDATE ${table} SET ${setClause}`;

      if (conditions.length > 0) {
        sql +=
          ` WHERE ` +
          conditions.map((key, i) => `${key} = $${i + 1}`).join(" AND ");
      }

      const params = Object.values(values);
      const result = await this.db.execute(sql, params);

      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async softDelete(table, ids) {
    try {
      await this.openDb();

      const result = await this.db.execute(
        `UPDATE ${table} SET deletedAt = CURRENT_TIMESTAMP WHERE id IN (${ids.join(
          ","
        )})`
      );

      return result;
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
   * Execute a select query
   * @param {string} table - Table name
   * @param {object} query - Where Conditions (key-value)
   * @param {string} attributes - Columns to select (default '*')
   * @returns {Promise<Array>} - Query result
   */
  async select(table, query = {}, attributes = "*") {
    try {
      await this.openDb();

      let sql = `SELECT ${attributes} FROM ${table}`;
      const conditions = Object.keys(query);
      const params = Object.values(query);

      if (conditions.length > 0) {
        sql +=
          ` WHERE ` +
          conditions
            .map(
              (key, i) =>
                `${key} ${
                  query[key].not !== undefined
                    ? `${query[key].not === null ? "IS NOT" : "!="}`
                    : "="
                } $${i + 1}`
            )
            .join(" AND ");
      }
      const result = await this.db.select(sql, params);
      return result;
    } catch (err) {
      console.error("Error in select:", err);
      throw err;
    }
  }
}

export default DbClient;
