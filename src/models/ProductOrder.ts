export default class ProductOrder {
    productId: string;
    amount: number;

    constructor (productId: string, amount: number) {
        this.productId = productId;
        this.amount = amount;
    }

    toFirebaseObject() {
        return {
            productId: this.productId,
            amount: this.amount
        };
    }
}