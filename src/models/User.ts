import { DocumentSnapshot } from "@firebase/firestore";

export default class User {
    id: string;
    pw: string;
    name: string;
    phoneNumber: string;
    email: string;

    constructor (id: string, pw: string, name: string, phoneNumber: string, email: string) {
        this.id = id;
        this.pw = pw;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    toFirebaseObjectWithoutId() {
        return {
            pw: this.pw,
            name: this.name,
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
        data.name,
        data.phoneNumber,
        data.email
    );
}