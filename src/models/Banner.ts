import { DocumentSnapshot, Timestamp } from "firebase/firestore";

export class Banner {
    id: string;
    createdTime: Date;
    title: string;
    desc: string;
    status: string;

    constructor (id: string, createdTime: Date, title: string, desc: string, status: string) {
        this.id = id;
        this.createdTime = createdTime;
        this.title = title;
        this.desc = desc;
        this.status = status;
    }

    toFirebaseObjectWithoutId() {
        return {
            createdTime: Timestamp.fromDate(this.createdTime),
            title: this.title,
            desc: this.desc,
            status: this.status
        };
    }
}

export function convertDocSnapToBanner(docSnap: DocumentSnapshot): Banner {
    const data = docSnap.data()!;
    return new Banner(
        docSnap.id,
        (data.createdTime as Timestamp).toDate(),
        data.title,
        data.desc,
        data.status
    );
}