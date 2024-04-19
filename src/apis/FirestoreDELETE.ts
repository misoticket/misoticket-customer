import db from "@/utils/FirebaseDB";
import { deleteDoc, doc } from "@firebase/firestore";

export async function deletePost(postId: string) {
    await deleteDoc(doc(db, `posts/${postId}`));
}