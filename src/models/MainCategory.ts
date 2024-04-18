import { DocumentSnapshot } from "firebase/firestore";

export default class MainCategory {
    id: string;
    name: string;
    order: number;
    productIdList: string[];

    constructor (id: string, name: string, order: number, productIdList: string[]) {
        this.id = id;
        this.name = name;
        this.order = order;
        this.productIdList = productIdList;
    }

    toFirebaseObjectWithoutId() {
        return {
            name: this.name,
            order: this.order,
            productIdList: []
        };
    }
}

export function convertDocSnapToMainCategory(docSnap: DocumentSnapshot): MainCategory {
    const data = docSnap.data()!;
    return new MainCategory(
        docSnap.id,
        data.name,
        data.order,
        data.productIdList
    );
}