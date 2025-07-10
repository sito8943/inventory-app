import ProductClient from "./ProductClient";
import CategoryClient from "./CategoryClient";
import MovementClient from "./MovementClient";

export default class Manager {
  products: ProductClient = new ProductClient();
  categories: CategoryClient = new CategoryClient();
  movements: MovementClient = new MovementClient();

  constructor() {}

  /**
   * @returns products
   */
  get Products() {
    return this.products;
  }

  /**
   * @returns categories
   */
  get Categories() {
    return this.categories;
  }

  /**
   * @returns
   */
  get Movements() {
    return this.movements;
  }
}
