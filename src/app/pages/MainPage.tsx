'use client';

import mainBannerImg from "@/../public/images/mainBanner.png";
import ProductCell from "@/components/cells/ProductCell";
import Category from "@/models/Category";
import CategoryProducts from "@/models/CategoryProducts";
import Product from "@/models/Product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MainPage() {
    // const router = useRouter();

    const [categoryProductsList, setCategoryProductsList] = useState<CategoryProducts[]>([]);

    useEffect(() => {
        fetchCategoryProductsList();
    }, []);

    async function fetchCategoryProductsList() {
        const newList: CategoryProducts[] = [];

        newList.push(
        new CategoryProducts(
            new Category("1", "신상품"), 
            [
            new Product("", "신세계백화점", true, "자체제작", 100000, 97800, "wow"),
            new Product("", "신세계백화점", true, "자체제작", 100000, 97800, "wow"),
            new Product("", "신세계백화점", true, "자체제작", 100000, 97800, "wow"),
            new Product("", "신세계백화점", true, "자체제작", 100000, 97800, "wow"),
            new Product("", "신세계백화점", true, "자체제작", 100000, 97800, "wow"),
            ]
        ));
        newList.push(
        new CategoryProducts(
            new Category("1", "신상품"), 
            [
            new Product("", "신세계백화점", true, "자체제작", 100000, 97800, "wow"),
            new Product("", "신세계백화점", true, "자체제작", 100000, 97800, "wow"),
            new Product("", "신세계백화점", true, "자체제작", 100000, 97800, "wow"),
            new Product("", "신세계백화점", true, "자체제작", 100000, 97800, "wow"),
            new Product("", "신세계백화점", true, "자체제작", 100000, 97800, "wow"),
            ]
        ));
        newList.push(
        new CategoryProducts(
            new Category("1", "신상품"), 
            [
            new Product("", "신세계백화점", true, "자체제작", 100000, 97800, "wow"),
            new Product("", "신세계백화점", true, "자체제작", 100000, 97800, "wow"),
            new Product("", "신세계백화점", true, "자체제작", 100000, 97800, "wow"),
            new Product("", "신세계백화점", true, "자체제작", 100000, 97800, "wow"),
            new Product("", "신세계백화점", true, "자체제작", 100000, 97800, "wow"),
            ]
        ));

        setCategoryProductsList(newList);
    }

    return (
        <>
            <div>
                <img className="w-full h-80 object-cover" src={mainBannerImg.src} alt="" />
                {
                    categoryProductsList.map(categoryProducts => (
                        <div>
                        <p>{categoryProducts.category.name}</p>
                        {/* {
                            categoryProducts.productList.map(product => (
                                <ProductCell product={product} handleClick={() => router.push("/product")} />
                            ))
                        } */}
                        </div>
                    ))
                }
            </div>
        </>
    );
}