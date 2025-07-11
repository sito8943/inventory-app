import ProductClient from "./ProductClient";
import CategoryClient from "./CategoryClient";
import MovementClient from "./MovementClient";

export class Manager {
  products: ProductClient = new ProductClient();
  categories: CategoryClient = new CategoryClient();
  movements: MovementClient = new MovementClient();

  constructor() {}

  /**
   * @returns products
   */
  get Products(): ProductClient {
    return this.products;
  }

  /**
   * @returns categories
   */
  get Categories(): CategoryClient {
    return this.categories;
  }

  /**
   * @returns
   */
  get Movements(): MovementClient {
    return this.movements;
  }
}
