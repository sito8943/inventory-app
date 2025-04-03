import Database from "@tauri-apps/plugin-sql";

/**
 *
 * @param {object[] | object} query
 * @param {string} table
 * @param {Array<{ table: string, on: string }>} relationships - Tables to join
 * @param {boolean} recall to prevent multiples where
 * @returns {string}
 */
function parseWhere(query, table, relationships, recall = false) {
  if (!query || !Object.keys(query).length) return "";

  let sql = recall ? "" : " WHERE ";

  // WHERE type array
  if (query.length)
    return (sql += query
      .map((clause) => `(${parseWhere(clause, null, null, true)})`)
      .join(" AND "));

  // complex
  if (query.logic) {
    const { logic, property, values } = query;
    sql +=
      ` ` +
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
    // simple
    const conditions = Object.keys(query);

    sql +=
      ` ` +
      conditions
        .map((key, i) => {
          const fieldValue =
            query[key] && query[key].not !== undefined
              ? query[key].not
              : query[key];
          const fieldName =
            relationships?.length && key.indexOf(".") === -1
              ? `${table}.${key}`
              : key;
          const operator =
            query[key] && query[key].not !== undefined
              ? `${query[key].not === null ? "IS NOT" : "!="}`
              : `${query[key] === null ? "IS" : "="}`;
          return `${fieldName} ${operator} ${fieldValue}`;
        })
        .join(" AND ");
  }

  return sql;
}

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

      const setClause = Object.keys(values)
        .map((key) => `${key} = ${values[key]}`)
        .join(", ");

      let sql = `UPDATE ${table} SET ${setClause} ${parseWhere(query)}`;

      console.log(sql);

      const result = await this.db.execute(sql);

      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async softDelete(table, ids) {
    try {
      await this.openDb();

      console.log(
        `UPDATE ${table} SET deletedAt = CURRENT_TIMESTAMP WHERE id IN (${ids.join(
          ","
        )})`
      );

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

      // Add joins if there are relationships
      if (relationships.length > 0) {
        sql +=
          " " +
          relationships
            .map((rel) => `JOIN ${rel.table} ON ${rel.on}`)
            .join(" ");
      }

      sql += parseWhere(query, table, relationships);

      const result = await this.db.select(sql);

      return result;
    } catch (err) {
      console.error("Error in select:", err);
      throw err;
    }
  }
}

export default DbClient;
