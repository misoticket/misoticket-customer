import Order from "@/models/Order";
import Post from "@/models/Post";
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

export async function makeUser(id: string, pw: string, name: string, phoneNumber: string, email: string) {
    const user = new User(
        "",
        pw,
        name,
        phoneNumber,
        email
    );

    await setDoc(
        doc(db, "users", id),
        user.toFirebaseObjectWithoutId()
    );
}

export async function addPost(userId: string, title: string, content: string) {
    await addDoc(
        collection(db, "posts/"),
        new Post(
            "",
            userId,
            new Date(),
            title, 
            content
        ).toFirebaseObjectWithoutId()
    );
}