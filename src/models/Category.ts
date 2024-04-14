import { DocumentSnapshot } from "firebase/firestore";

export default class Category {
    id: string;
    name: string;
    order: number;

    constructor (id: string, name: string, order: number) {
        this.id = id;
        this.name = name;
        this.order = order;
    }
}

export function convertFirebaseObjectToCategory(docSnap: DocumentSnapshot): Category {
    const data = docSnap.data()!;
    return new Category(
        docSnap.id,
        data.name,
        data.order
    );
}