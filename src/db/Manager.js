import ProductClient from "./ProductClient";
import CategoryClient from "./CategoryClient";
import MovementClient from "./MovementClient";
import DbClient from "./DbClient";

export default class Manager {
  constructor() {
    this.db = new DbClient();

    this.products = new ProductClient(this.db);
    this.categories = new CategoryClient(this.db);
    this.movements = new MovementClient(this.db);
  }

  /**
   * @returns {ProductClient} products
   */
  get Products() {
    return this.products;
  }

  /**
   * @returns {CategoryClient} categories
   */
  get Categories() {
    return this.categories;
  }

  /**
   * @returns {MovementClient}
   */
  get Movements() {
    return this.movements;
  }
}
