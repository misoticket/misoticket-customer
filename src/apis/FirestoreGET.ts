import { BannerStatus } from "@/app/constants/BannerStatus";
import { Banner, convertDocSnapToBanner } from "@/models/Banner";
import Category, { convertFirebaseObjectToCategory } from "@/models/Category";
import MainCategory, { convertDocSnapToMainCategory } from "@/models/MainCategory";
import Order, { convertDocSnapToOrder } from "@/models/Order";
import Product, { convertFirebaseObjectToProduct } from "@/models/Product";
import SubCategory, { convertFirebaseObjectToSubCategory } from "@/models/SubCategory";
import { convertDocSnapToUser } from "@/models/User";
import db from "@/utils/FirebaseDB";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

export async function fetchCategory(categoryId: string): Promise<Category> {
    const docRef = doc(db, `categories/${categoryId}`);
    return convertFirebaseObjectToCategory(await getDoc(docRef));
}

export async function fetchCategoryList(): Promise<Category[]> {
    const categoriesRef = collection(db, "categories/");
    const querySnapshot = await getDocs(categoriesRef);
    return querySnapshot.docs.map(docSnap => convertFirebaseObjectToCategory(docSnap)).sort((a, b) => a.order - b.order);
}

export async function fetchSubCategoryList(categoryId: string): Promise<SubCategory[]> {
    const q = query(collection(db, "subCategories/"), where("categoryId", "==", categoryId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnap => convertFirebaseObjectToSubCategory(docSnap)).sort((a, b) => a.order - b.order);
}

export async function fetchAllProductList(): Promise<Product[]> {
    const productsRef = collection(db, "products/");
    const querySnapshot = await getDocs(productsRef);
    return querySnapshot.docs.map(docSnap => convertFirebaseObjectToProduct(docSnap)).sort((a, b) => a.order - b.order);
}

export async function fetchProduct(productId: string): Promise<Product> {
    const docRef = doc(db, `products/${productId}`);
    return convertFirebaseObjectToProduct(await getDoc(docRef));
}

export async function fetchProductListWithCategoryId(categoryId: string): Promise<Product[]> {
    const q = query(collection(db, "products/"), where("categoryId", "==", categoryId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnap => convertFirebaseObjectToProduct(docSnap)).sort((a, b) => a.order - b.order);
}

export async function fetchOrder(orderId: string): Promise<Order> {
    const docRef = doc(db, `orders/${orderId}`);
    return convertDocSnapToOrder(await getDoc(docRef));
}

export async function searchOrderList(personName: string): Promise<Order[]> {
    const q = query(collection(db, "orders/"), where("orderPersonName", "==", personName));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnap => convertDocSnapToOrder(docSnap));
}

export async function fetchMainCategoryList(): Promise<MainCategory[]> {
    const collectionRef = collection(db, "mainCategories/");
    const querySnapshot = await getDocs(collectionRef);
    return querySnapshot.docs.map(obj => convertDocSnapToMainCategory(obj));
}

export async function fetchActiveBanner(): Promise<Banner | null> {
    const collRef = collection(db, "banners/");
    const querySnapshot = await getDocs(collRef);
    
    if (querySnapshot.docs.length === 0) {
        return null;
    } else {
        let banner: Banner | null = null;

        for (let b of querySnapshot.docs.map(docSnap => convertDocSnapToBanner(docSnap))) {
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

export async function logIn(id: string, pw: string): Promise<boolean> {
    const docRef = doc(db, `users/${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const user = convertDocSnapToUser(docSnap);

        return user.pw === pw;
    } else {
        return false;
    }
}