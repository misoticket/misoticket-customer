import { BannerStatus } from "@/app/constants/BannerStatus";
import { MarketPrices } from "@/interfaces/MarketPrices";
import AdminPost, { convertDocSnapToAdminPost } from "@/models/AdminPost";
import { Banner, convertDocSnapToBanner } from "@/models/Banner";
import Category, { convertFirebaseObjectToCategory } from "@/models/Category";
import MainCategory, {
    convertDocSnapToMainCategory,
} from "@/models/MainCategory";
import Order, { convertDocSnapToOrder } from "@/models/Order";
import Post, { convertDocSnapToPost } from "@/models/Post";
import Product, { convertFirebaseObjectToProduct } from "@/models/Product";
import ProductOrder, {
    convertObjectToProductOrder,
} from "@/models/ProductOrder";
import SubCategory, {
    convertFirebaseObjectToSubCategory,
} from "@/models/SubCategory";
import User, { convertDocSnapToUser } from "@/models/User";
import db from "@/utils/FirebaseDB";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";

export async function fetchCategory(categoryId: string): Promise<Category> {
    const docRef = doc(db, `categories/${categoryId}`);
    return convertFirebaseObjectToCategory(await getDoc(docRef));
}

export async function fetchCategoryList(): Promise<Category[]> {
    const categoriesRef = collection(db, "categories/");
    const querySnapshot = await getDocs(categoriesRef);
    return querySnapshot.docs
        .map((docSnap) => convertFirebaseObjectToCategory(docSnap))
        .sort((a, b) => a.order - b.order);
}

export async function fetchSubCategoryList(
    categoryId: string
): Promise<SubCategory[]> {
    const q = query(
        collection(db, "subCategories/"),
        where("categoryId", "==", categoryId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((docSnap) => convertFirebaseObjectToSubCategory(docSnap))
        .sort((a, b) => a.order - b.order);
}

export async function fetchAllProductList(): Promise<Product[]> {
    const productsRef = collection(db, "products/");
    const querySnapshot = await getDocs(productsRef);

    return querySnapshot.docs
        .map((docSnap) => convertFirebaseObjectToProduct(docSnap))
        .sort((a, b) => a.order - b.order);
}

export async function fetchProduct(productId: string): Promise<Product> {
    const docRef = doc(db, `products/${productId}`);
    return convertFirebaseObjectToProduct(await getDoc(docRef));
}

export async function fetchProductListWithCategoryId(
    categoryId: string
): Promise<Product[]> {
    const q = query(
        collection(db, "products/"),
        where("categoryId", "==", categoryId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((docSnap) => convertFirebaseObjectToProduct(docSnap))
        .sort((a, b) => a.order - b.order);
}

export async function fetchOrder(orderId: string): Promise<Order> {
    const docRef = doc(db, `orders/${orderId}`);
    return convertDocSnapToOrder(await getDoc(docRef));
}

export async function searchOrder(orderCode: string): Promise<Order | null> {
    const docRef = await getDoc(doc(db, `orders/${orderCode}`));
    if (docRef.exists()) {
        return convertDocSnapToOrder(docRef);
    } else {
        return null;
    }
}

export async function fetchOrderList(userId: string): Promise<Order[]> {
    const q = query(collection(db, "orders/"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((docSnap) => convertDocSnapToOrder(docSnap))
        .sort((a, b) => b.createdTime.getTime() - a.createdTime.getTime());
}

export async function fetchMainCategoryList(): Promise<MainCategory[]> {
    const collectionRef = collection(db, "mainCategories/");
    const querySnapshot = await getDocs(collectionRef);
    return querySnapshot.docs.map((obj) => convertDocSnapToMainCategory(obj));
}

export async function fetchActiveBanner(): Promise<Banner | null> {
    const collRef = collection(db, "banners/");
    const querySnapshot = await getDocs(collRef);

    if (querySnapshot.docs.length === 0) {
        return null;
    } else {
        let banner: Banner | null = null;

        for (let b of querySnapshot.docs.map((docSnap) =>
            convertDocSnapToBanner(docSnap)
        )) {
            if (b.status === BannerStatus.ACTIVE) {
                banner = b;
            }
        }

        return banner;
    }
}

export async function checkUserExist(id: string): Promise<boolean> {
    const docRef = doc(db, `users/${id}`);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
}

export async function logIn(id: string): Promise<User | null> {
    const docRef = doc(db, `users/${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return convertDocSnapToUser(docSnap);
    } else {
        return null;
    }
}

export async function searchUser(
    name: string,
    phoneNumber: string
): Promise<User | null> {
    const collectionRef = collection(db, "users/");
    const q = query(
        collectionRef,
        where("name", "==", name),
        where("phoneNumber", "==", phoneNumber)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length === 0) {
        return null;
    } else {
        return convertDocSnapToUser(querySnapshot.docs[0]);
    }
}

export async function fetchUserList(): Promise<User[]> {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.docs.map((doc) => convertDocSnapToUser(doc));
}

export async function fetchUser(userId: string): Promise<User> {
    const docRef = await getDoc(doc(db, `users/${userId}`));
    return convertDocSnapToUser(docRef);
}

export async function fetchPostList(): Promise<Post[]> {
    const querySnapshot = await getDocs(collection(db, "posts"));
    return querySnapshot.docs
        .map((doc) => convertDocSnapToPost(doc))
        .sort((a, b) => b.createdTime.getTime() - a.createdTime.getTime());
}

export async function fetchAdminPostList(): Promise<AdminPost[]> {
    const querySnapshot = await getDocs(collection(db, "adminPosts"));
    return querySnapshot.docs
        .map((doc) => convertDocSnapToAdminPost(doc))
        .sort((a, b) => b.createdTime.getTime() - a.createdTime.getTime());
}

export async function fetchProductOrderListWithNoneUserId(
    noneUserId: string
): Promise<ProductOrder[]> {
    const q = query(
        collection(db, "productOrders/"),
        where("noneUserId", "==", noneUserId)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length === 0) {
        return [];
    } else {
        const doc = querySnapshot.docs[0];
        return doc
            .data()
            .productOrderList.map((obj: any) =>
                convertObjectToProductOrder(obj)
            );
    }
}

export async function fetchProductOrderListWithUserId(
    userId: string
): Promise<ProductOrder[]> {
    const q = query(
        collection(db, "productOrders/"),
        where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length === 0) {
        return [];
    } else {
        const doc = querySnapshot.docs[0];
        return doc
            .data()
            .productOrderList.map((obj: any) =>
                convertObjectToProductOrder(obj)
            );
    }
}

export async function fetchMarketPrices(): Promise<MarketPrices> {
    const resultDoc = await getDoc(
        doc(db, "marketPrices/vOrRVg2JkbzNVSOrWDlm")
    );

    const docData = resultDoc.data();
    const fields: { [key: string]: any } = {};
    let result: MarketPrices = { categoryList: [] };

    for (const field in docData) {
        if (Object.prototype.hasOwnProperty.call(docData, field)) {
            fields[field] = docData[field];

            result.categoryList.push({
                categoryId: field,
                productIdList: docData[field],
            });
        }
    }

    return result;
}
