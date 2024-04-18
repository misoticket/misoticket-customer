import Order from "@/models/Order";
import User from "@/models/User";
import db from "@/utils/FirebaseDB";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export async function uploadOrder(order: Order): Promise<string> {
    const orderCollectionRef = collection(db, "orders/");
    const doc = await addDoc(
                            orderCollectionRef,
                            order.toFirebaseObjectWithoutId()
                        );
    return doc.id;
}

export async function makeUser(id: string, pw: string, phoneNumber: string, email: string) {
    const user = new User(
        "",
        pw,
        phoneNumber,
        email
    );

    await setDoc(
        doc(db, "users", id),
        user.toFirebaseObjectWithoutId()
    );
}