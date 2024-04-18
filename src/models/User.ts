import { DocumentSnapshot } from "@firebase/firestore";

export default class User {
    id: string;
    pw: string;
    phoneNumber: string;
    email: string;

    constructor (id: string, pw: string, phoneNumber: string, email: string) {
        this.id = id;
        this.pw = pw;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    toFirebaseObjectWithoutId() {
        return {
            pw: this.pw,
            phoneNumber: this.phoneNumber,
            email: this.email
        };
    }
}

export function convertDocSnapToUser(docSnap: DocumentSnapshot): User {
    const data = docSnap.data()!;
    return new User(
        docSnap.id,
        data.pw,
        data.phoneNumber,
        data.email
    );
}