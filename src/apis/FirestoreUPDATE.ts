import Notice from "@/models/Notice";
import db from "@/utils/FirebaseDB";
import { doc, increment, updateDoc } from "firebase/firestore";

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

export async function increaseNoticeNumViews(notice: Notice) {
    const noticeRef = doc(db, `notices/${notice.id}`);
    await updateDoc(noticeRef, {
        numViews: increment(1),
    });
}
