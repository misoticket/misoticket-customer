import { DocumentSnapshot } from "firebase/firestore";

export default class Product {
    id: string;
    name: string;
    mainImageUrl: string;
    categoryId: string;
    subCategoryId: string;
    order: number;
    isPopular: boolean;
    isSoldOut: boolean;
    originalPrice: number;
    price: number;
    customerSellingPrice: number;
    desc: string;

    constructor(
        id: string,
        name: string,
        mainImageUrl: string,
        categoryId: string,
        subCategoryId: string,
        order: number,
        isPopular: boolean,
        isSoldOut: boolean,
        originalPrice: number,
        price: number,
        customerSellingPrice: number,
        desc: string
    ) {
        this.id = id;
        this.name = name;
        this.mainImageUrl = mainImageUrl;
        this.categoryId = categoryId;
        this.subCategoryId = subCategoryId;
        this.order = order;
        this.isPopular = isPopular;
        this.isSoldOut = isSoldOut;
        this.originalPrice = originalPrice;
        this.price = price;
        this.customerSellingPrice = customerSellingPrice;
        this.desc = desc;
    }
}

export function convertFirebaseObjectToProduct(
    docSnap: DocumentSnapshot
): Product {
    const data = docSnap.data()!;
    return new Product(
        docSnap.id,
        data.name,
        data.mainImageUrl,
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
