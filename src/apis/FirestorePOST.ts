import Order from "@/models/Order";
import Post from "@/models/Post";
import ProductOrder, {
    convertObjectToProductOrder,
} from "@/models/ProductOrder";
import User, { convertDocSnapToUser } from "@/models/User";
import db from "@/utils/FirebaseDB";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";

export async function updateUserInfo(
    userId: string,
    name: string,
    phoneNumber: string,
    address: string,
    addressDetail: string,
    email: string
) {
    const docRef = doc(db, `users/${userId}`);
    await updateDoc(docRef, {
        name: name,
        phoneNumber: phoneNumber,
        address: address,
        addressDetail: addressDetail,
        email: email,
    });
}

export async function changePassword(
    id: string,
    password: string
): Promise<User | null> {
    const docRef = doc(db, `users/${id}`);
    const docSnap = await getDoc(docRef);

    await updateDoc(docRef, {
        pw: password,
        isOriginalUser: false,
    });

    if (docSnap.exists()) {
        return convertDocSnapToUser(docSnap);
    } else {
        return null;
    }
}

export async function uploadOrder(order: Order): Promise<string> {
    const orderNumber = generateRandomNumberUUID(10);
    const orderDocRef = doc(db, `orders/${orderNumber}`);
    await setDoc(orderDocRef, order.toFirebaseObjectWithoutId());
    return orderNumber;
}

function generateRandomNumberUUID(length: number): string {
    let result = "";
    const characters = "0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

export async function makeUser(
    id: string,
    pw: string,
    name: string,
    phoneNumber: string,
    address: string,
    addressDetail: string,
    email: string
) {
    const user = new User(
        "",
        pw,
        name,
        phoneNumber,
        address,
        addressDetail,
        email,
        false
    );

    await setDoc(doc(db, "users", id), user.toFirebaseObjectWithoutId());
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

export async function addProductOrderWithNoneUserId(
    noneUserId: string,
    productOrder: ProductOrder
) {
    const q = query(
        collection(db, "productOrders/"),
        where("noneUserId", "==", noneUserId)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length === 0) {
        await addDoc(collection(db, "productOrders/"), {
            noneUserId: noneUserId,
            productOrderList: [productOrder.toObject()],
        });
    } else {
        const doc = querySnapshot.docs[0];
        const originList = doc
            .data()
            .productOrderList.map((obj: any) =>
                convertObjectToProductOrder(obj)
            );
        originList.push(productOrder);
        await updateDoc(doc.ref, {
            productOrderList: originList.map((productOrder: ProductOrder) =>
                productOrder.toObject()
            ),
        });
    }
}

export async function addProductOrderWithUserId(
    userId: string,
    productOrder: ProductOrder
) {
    const q = query(
        collection(db, "productOrders/"),
        where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length === 0) {
        await addDoc(collection(db, "productOrders/"), {
            userId: userId,
            productOrderList: [productOrder.toObject()],
        });
    } else {
        const doc = querySnapshot.docs[0];
        const originList = doc
            .data()
            .productOrderList.map((obj: any) =>
                convertObjectToProductOrder(obj)
            );
        originList.push(productOrder);
        await updateDoc(doc.ref, {
            productOrderList: originList.map((productOrder: ProductOrder) =>
                productOrder.toObject()
            ),
        });
    }
}

export async function removeProductOrderListWithNoneUserId(
    noneUserId: string,
    productOrderList: ProductOrder[]
) {
    const q = query(
        collection(db, "productOrders/"),
        where("noneUserId", "==", noneUserId)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
        const doc = querySnapshot.docs[0];

        const newList: ProductOrder[] = [];
        for (const prodOrder of doc.data().productOrderList) {
            const isExist =
                productOrderList.filter(
                    (po) => po.productId === prodOrder.productId
                ).length > 0;

            if (!isExist) {
                newList.push(prodOrder);
            }
        }
        await updateDoc(doc.ref, { productOrderList: newList });
    }
}

export async function removeProductOrderListWithUserId(
    userId: string,
    productOrderList: ProductOrder[]
) {
    const q = query(
        collection(db, "productOrders/"),
        where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
        const doc = querySnapshot.docs[0];

        const newList: ProductOrder[] = [];
        for (const prodOrder of doc.data().productOrderList) {
            const isExist =
                productOrderList.filter(
                    (po) => po.productId === prodOrder.productId
                ).length > 0;

            if (!isExist) {
                newList.push(prodOrder);
            }
        }
        await updateDoc(doc.ref, { productOrderList: newList });
    }
}

export async function updateProductOrderListWithUserId(
    userId: string,
    productOrderList: ProductOrder[]
) {
    const q = query(
        collection(db, "productOrders/"),
        where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
        const doc = querySnapshot.docs[0];
        await updateDoc(doc.ref, {
            productOrderList: productOrderList.map(
                (productOrder: ProductOrder) => productOrder.toObject()
            ),
        });
    }
}

export async function updateProductOrderListWithNoneUserId(
    noneUserId: string,
    productOrderList: ProductOrder[]
) {
    const q = query(
        collection(db, "productOrders/"),
        where("noneUserId", "==", noneUserId)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
        const doc = querySnapshot.docs[0];
        await updateDoc(doc.ref, {
            productOrderList: productOrderList.map(
                (productOrder: ProductOrder) => productOrder.toObject()
            ),
        });
    }
}
