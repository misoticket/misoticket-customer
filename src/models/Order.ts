import { DocumentSnapshot, Timestamp } from "firebase/firestore";
import ProductOrder from "./ProductOrder";

export default class Order {
    id: string;
    createdTime: Date;
    productList: ProductOrder[];
    orderPersonName: string;
    orderPhoneNumber: string;
    orderEmail: string;
    orderPassword: string;
    address: string;
    addressDetail: string;
    deliveryPersonName: string;
    deliveryPhoneNumber: string;
    deliveryMessage: string;
    depositorName: string;
    status: string;
    deliveryInvoiceNumber: string;

    constructor (id: string, createdTime: Date, productList: ProductOrder[], orderPersonName: string, orderPhoneNumber: string, orderEmail: string, orderPassword: string, address: string, addressDetail: string, deliveryPersonName: string, deliveryPhoneNumber: string, deliveryMessage: string, depositorName: string, status: string, deliveryInvoiceNumber: string) {
        this.id = id;
        this.createdTime = createdTime;
        this.productList = productList;
        this.orderPersonName = orderPersonName;
        this.orderPhoneNumber = orderPhoneNumber;
        this.orderEmail = orderEmail;
        this.orderPassword = orderPassword;
        this.address = address;
        this.addressDetail = addressDetail;
        this.deliveryPersonName = deliveryPersonName;
        this.deliveryPhoneNumber = deliveryPhoneNumber;
        this.deliveryMessage = deliveryMessage;
        this.depositorName = depositorName;
        this.status = status;
        this.deliveryInvoiceNumber = deliveryInvoiceNumber;
    }

    toFirebaseObjectWithoutId() {
        return {
            createdTime: Timestamp.fromDate(this.createdTime),
            productList: this.productList.map(prod => prod.toFirebaseObject()),
            orderPersonName: this.orderPersonName,
            orderPhoneNumber: this.orderPhoneNumber,
            orderEmail: this.orderEmail,
            orderPassword: this.orderPassword,
            address: this.address,
            addressDetail: this.addressDetail,
            deliveryPersonName: this.deliveryPersonName,
            deliveryPhoneNumber: this.deliveryPhoneNumber,
            deliveryMessage: this.deliveryMessage,
            depositorName: this.depositorName,
            status: this.status,
            deliveryInvoiceNumber: this.deliveryInvoiceNumber
        };
    }
}

export function convertDocSnapToOrder(docSnap: DocumentSnapshot): Order {
    const data = docSnap.data()!;
    return new Order(
        docSnap.id,
        (data.createdTime as Timestamp).toDate(),
        data.productList,
        data.orderPersonName,
        data.orderPhoneNumber,
        data.orderEmail,
        data.orderPassword,
        data.address,
        data.addressDetail,
        data.deliveryPersonName,
        data.deliveryPhoneNumber,
        data.deliveryMessage,
        data.depositorName,
        data.status,
        data.deliveryInvoiceNumber
    );
}