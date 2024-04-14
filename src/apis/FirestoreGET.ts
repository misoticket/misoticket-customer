import Category, { convertFirebaseObjectToCategory } from "@/models/Category";
import Product, { convertFirebaseObjectToProduct } from "@/models/Product";
import SubCategory, { convertFirebaseObjectToSubCategory } from "@/models/SubCategory";
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