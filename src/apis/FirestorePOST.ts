import Order from "@/models/Order";
import db from "@/utils/FirebaseDB";
import { addDoc, collection } from "firebase/firestore";

export async function uploadOrder(order: Order): Promise<string> {
    const orderCollectionRef = collection(db, "orders/");
    const doc = await addDoc(
                            orderCollectionRef,
                            order.toFirebaseObjectWithoutId()
                        );
    return doc.id;
}