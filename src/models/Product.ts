import { DocumentSnapshot } from "firebase/firestore";

export default class Product {
    id: string;
    name: string;
    categoryId: string;
    subCategoryId: string;
    order: number;
    isPopular: boolean;
    isSoldOut: boolean;
    originalPrice: number;
    price: number;
    customerSellingPrice: number;
    code: string;

    constructor (id: string, name: string, categoryId: string, subCategoryId: string, order: number, isPopular: boolean, isSoldOut: boolean, originalPrice: number, price: number, customerSellingPrice: number, code: string) {
        this.id = id;
        this.name = name;
        this.categoryId = categoryId;
        this.subCategoryId = subCategoryId;
        this.order = order;
        this.isPopular = isPopular;
        this.isSoldOut = isSoldOut;
        this.originalPrice = originalPrice;
        this.price = price;
        this.customerSellingPrice = customerSellingPrice;
        this.code = code;
    }
}

export function convertFirebaseObjectToProduct(docSnap: DocumentSnapshot): Product {
    const data = docSnap.data()!;
    return new Product(
        docSnap.id,
        data.name,
        data.categoryId,
        data.subCategoryId,
        data.order,
        data.isPopular,
        data.isSoldOut,
        data.originalPrice,
        data.price,
        data.customerSellingPrice,
        data.code
    );
}