import Order from "@/models/Order";
import Post from "@/models/Post";
import ProductOrder, { convertObjectToProductOrder } from "@/models/ProductOrder";
import User from "@/models/User";
import db from "@/utils/FirebaseDB";
import { addDoc, collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";

export async function uploadOrder(order: Order): Promise<string> {
    const orderCollectionRef = collection(db, "orders/");
    const doc = await addDoc(
                            orderCollectionRef,
                            order.toFirebaseObjectWithoutId()
                        );
    return doc.id;
}

export async function makeUser(id: string, pw: string, name: string, phoneNumber: string, address: string, addressDetail: string, email: string) {
    const user = new User(
        "",
        pw,
        name,
        phoneNumber,
        address,
        addressDetail,
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

export async function addProductOrderWithNoneUserId(noneUserId: string, productOrder: ProductOrder) {
    const q = query(collection(db, "productOrders/"), where("noneUserId", "==", noneUserId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.docs.length === 0) {
        await addDoc(
            collection(db, "productOrders/"),
            { 
                noneUserId: noneUserId,
                productOrderList: [productOrder.toObject()] 
            }
        )
    } else {
        const doc = querySnapshot.docs[0];
        const originList = doc.data().productOrderList.map((obj: any) => convertObjectToProductOrder(obj));
        originList.push(productOrder);
        await updateDoc(
            doc.ref,
            { productOrderList: originList.map((productOrder: ProductOrder) => productOrder.toObject()) }
        );
    }
}

export async function addProductOrderWithUserId(userId: string, productOrder: ProductOrder) {
    const q = query(collection(db, "productOrders/"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.docs.length === 0) {
        await addDoc(
            collection(db, "productOrders/"),
            { 
                userId: userId,
                productOrderList: [productOrder.toObject()] 
            }
        )
    } else {
        const doc = querySnapshot.docs[0];
        const originList = doc.data().productOrderList.map((obj: any) => convertObjectToProductOrder(obj));
        originList.push(productOrder);
        await updateDoc(
            doc.ref,
            { productOrderList: originList.map((productOrder: ProductOrder) => productOrder.toObject()) }
        );
    }
}

export async function removeProductOrderListWithNoneUserId(noneUserId: string, productOrderList: ProductOrder[]) {
    const q = query(collection(db, "productOrders/"), where("noneUserId", "==", noneUserId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
        const doc = querySnapshot.docs[0];

        const newList: ProductOrder[] = [];
        for (const prodOrder of doc.data().productOrderList) {
            const isExist = productOrderList.filter(po => po.productId === prodOrder.productId).length > 0;

            if (!isExist) {
                newList.push(prodOrder);
            }
        }
        await updateDoc(
            doc.ref,
            { productOrderList: newList }
        )
    }
}

export async function removeProductOrderListWithUserId(userId: string, productOrderList: ProductOrder[]) {
    const q = query(collection(db, "productOrders/"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
        const doc = querySnapshot.docs[0];

        const newList: ProductOrder[] = [];
        for (const prodOrder of doc.data().productOrderList) {
            const isExist = productOrderList.filter(po => po.productId === prodOrder.productId).length > 0;

            if (!isExist) {
                newList.push(prodOrder);
            }
        }
        await updateDoc(
            doc.ref,
            { productOrderList: newList }
        )
    }
}