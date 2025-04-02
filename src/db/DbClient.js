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
   * Execute a select query with optional joins
   * @param {string} table - Table name
   * @param {object | object[]} query - Where conditions (key-value)
   * @param {string} attributes - Columns to select (default '*')
   * @param {Array<{ table: string, on: string }>} relationships - Tables to join
   * @returns {Promise<Array>} - Query result
   */
  async select(table, query = {}, attributes = "*", relationships = []) {
    try {
      await this.openDb();

      let sql = `SELECT ${attributes} FROM ${table}`;
      let params = [];

      // Add joins if there are relationships
      if (relationships.length > 0) {
        sql +=
          " " +
          relationships
            .map((rel) => `JOIN ${rel.table} ON ${rel.on}`)
            .join(" ");
      }

      if (query.logic) {
        const { logic, property, values } = query;
        params = values.map((value) =>
          value.not !== undefined ? value.not : value
        );
        sql +=
          ` WHERE ` +
          values
            .map((value) => {
              const operator =
                value.not !== undefined
                  ? value.not === null
                    ? "IS NOT"
                    : "!="
                  : value === null
                  ? "IS"
                  : "=";
              return `${property} ${operator} ${
                value.not !== undefined ? value.not : value
              }`;
            })
            .join(` ${logic} `);
      } else {
        const conditions = Object.keys(query);
        params = Object.values(query).map((value) =>
          value?.not !== undefined ? value.not : value
        );

        if (conditions.length > 0) {
          sql +=
            ` WHERE ` +
            conditions
              .map((key, i) => {
                const fieldName =
                  relationships?.length && key.indexOf(".") === -1
                    ? `${table}.${key}`
                    : key;
                const fieldValue =
                  query[key] && query[key].not !== undefined
                    ? `${query[key].not === null ? "IS NOT" : "!="}`
                    : `${query[key] === null ? "IS" : "="}`;
                return `${fieldName} ${fieldValue} $${i + 1}`;
              })
              .join(" AND ");
        }
      }
      console.log(sql, params);
      const result = await this.db.select(sql, params);

      return result;
    } catch (err) {
      console.error("Error in select:", err);
      throw err;
    }
  }
}

export default DbClient;
