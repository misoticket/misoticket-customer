interface ProductOrderList {
    categoryId: string;
    productIdList: string[];
}

export interface MarketPrices {
    categoryList: ProductOrderList[];
}
