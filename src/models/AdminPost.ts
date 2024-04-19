import { DocumentSnapshot, Timestamp } from "@firebase/firestore";

export default class AdminPost {
    id: string;
    postId: string;
    createdTime: Date;
    content: string;

    constructor (id: string, postId: string, createdTime: Date, content: string) {
        this.id = id;
        this.postId = postId;
        this.createdTime = createdTime;
        this.content = content;
    }

    toFirebaseObjectWithoutId() {
        return {
            postId: this.postId,
            createdTime: Timestamp.fromDate(this.createdTime),
            content: this.content
        };
    }
}

export function convertDocSnapToAdminPost(docSnap: DocumentSnapshot): AdminPost {
    const data = docSnap.data()!;
    return new AdminPost(
        docSnap.id,
        data.postId,
        (data.createdTime as Timestamp).toDate(),
        data.content,
    );
}