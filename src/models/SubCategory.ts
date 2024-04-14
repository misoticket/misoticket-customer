import { DocumentSnapshot } from "firebase/firestore";

export default class SubCategory {
    id: string;
    name: string;
    categoryId: string;
    order: number;

    constructor (id: string, name: string, categoryId: string, order: number) {
        this.id = id;
        this.name = name;
        this.categoryId = categoryId;
        this.order = order;
    }
}

export function convertFirebaseObjectToSubCategory(docSnap: DocumentSnapshot): SubCategory {
    const data = docSnap.data()!;
    return new SubCategory(
        docSnap.id,
        data.name,
        data.categoryId,
        data.order
    );
}