import { DocumentSnapshot } from "@firebase/firestore";

export default class User {
    id: string;
    pw: string;
    name: string;
    phoneNumber: string;
    address: string;
    addressDetail: string;
    email: string;

    constructor (id: string, pw: string, name: string, phoneNumber: string, address: string, addressDetail: string, email: string) {
        this.id = id;
        this.pw = pw;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.addressDetail = addressDetail;
        this.email = email;
    }

    toFirebaseObjectWithoutId() {
        return {
            pw: this.pw,
            name: this.name,
            phoneNumber: this.phoneNumber,
            address: this.address,
            addressDetail: this.addressDetail,
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
        data.address,
        data.addressDetail,
        data.email
    );
}