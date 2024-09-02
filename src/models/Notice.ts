import { DocumentSnapshot, Timestamp } from "firebase/firestore";

export default class Notice {
    id: string;
    createdTime: Date;
    title: string;
    content: string;
    numViews: number;

    constructor(
        id: string,
        createdTime: Date,
        title: string,
        content: string,
        numViews: number
    ) {
        this.id = id;
        this.createdTime = createdTime;
        this.title = title;
        this.content = content;
        this.numViews = numViews;
    }

    toFirebaseObjectWithoutId() {
        return {
            createdTime: Timestamp.fromDate(this.createdTime),
            title: this.title,
            content: this.content,
            numViews: this.numViews,
        };
    }
}

export function convertDocSnapToNotice(docSnap: DocumentSnapshot): Notice {
    const data = docSnap.data()!;
    return new Notice(
        docSnap.id,
        (data.createdTime as Timestamp).toDate(),
        data.title,
        data.content,
        data.numViews
    );
}
