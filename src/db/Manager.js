import ProductClient from "./ProductClient";
import CategoryClient from "./CategoryClient";
import DbClient from "./DbClient";

export default class Manager {
  constructor() {
    this.db = new DbClient();
    this.Products = new ProductClient(this.db);
    this.Categories = new CategoryClient(this.db);
  }
}
