import Category from "./Category";
import Product from "./Product";

export default class CategoryProducts {
    category: Category;
    productList: Product[];

    constructor (category: Category, productList: Product[]) {
        this.category = category;
        this.productList = productList;
    }
}