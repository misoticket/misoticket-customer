import db from "@/utils/FirebaseDB";
import { deleteDoc, doc } from "@firebase/firestore";

export async function deletePost(postId: string) {
    await deleteDoc(doc(db, `posts/${postId}`));
}

export async function deleteUser(userId: string) {
    const docRef = doc(db, `users/${userId}`);
    await deleteDoc(docRef);
}
