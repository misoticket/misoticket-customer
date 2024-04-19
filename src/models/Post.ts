import { DocumentSnapshot, Timestamp } from "@firebase/firestore";

export default class Post {
    id: string;
    userId: string;
    createdTime: Date;
    title: string;
    content: string;

    constructor (id: string, userId: string, createdTime: Date, title: string, content: string) {
        this.id = id;
        this.userId = userId;
        this.createdTime = createdTime;
        this.title = title;
        this.content = content;
    }

    toFirebaseObjectWithoutId() {
        return {
            userId: this.userId,
            createdTime: Timestamp.fromDate(this.createdTime),
            title: this.title,
            content: this.content
        };
    }
}

export function convertDocSnapToPost(docSnap: DocumentSnapshot): Post {
    const data = docSnap.data()!;
    return new Post(
        docSnap.id,
        data.userId,
        (data.createdTime as Timestamp).toDate(),
        data.title,
        data.content
    );
}