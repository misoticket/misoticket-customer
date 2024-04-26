export default class ProductOrder {
    productId: string;
    amount: number;

    constructor (productId: string, amount: number) {
        this.productId = productId;
        this.amount = amount;
    }

    toObject() {
        return {
            productId: this.productId,
            amount: this.amount
        };
    }

    toFirebaseObject() {
        return {
            productId: this.productId,
            amount: this.amount
        };
    }
}

export function convertObjectToProductOrder(obj: any) {
    return new ProductOrder(
        obj.productId,
        obj.amount
    );
}