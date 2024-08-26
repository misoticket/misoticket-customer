import db from "@/utils/FirebaseDB";
import { doc, updateDoc } from "firebase/firestore";

export async function updateAddress(
    orderId: string,
    address: string,
    addressDetail: string
) {
    const orderRef = doc(db, `orders/${orderId}`);
    await updateDoc(orderRef, {
        address: address,
        addressDetail: addressDetail,
    });
}
