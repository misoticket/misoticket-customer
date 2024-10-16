export default class ProductOrder {
    productId: string;
    amount: number;
    price: number | null;

    constructor(productId: string, amount: number, price: number) {
        this.productId = productId;
        this.amount = amount;
        this.price = price;
    }

    toObject() {
        return {
            productId: this.productId,
            amount: this.amount,
            price: this.price,
        };
    }

    toFirebaseObject() {
        return {
            productId: this.productId,
            amount: this.amount,
            price: this.price,
        };
    }
}

export function convertObjectToProductOrder(obj: any) {
    return new ProductOrder(obj.productId, obj.amount, obj.price ?? null);
}
