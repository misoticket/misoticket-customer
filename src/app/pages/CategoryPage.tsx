'use client';

import { fetchCategory, fetchProductListWithCategoryId, fetchSubCategoryList } from "@/apis/FirestoreGET";
import ProductCell from "@/components/cells/ProductCell";
import Category from "@/models/Category";
import Product from "@/models/Product";
import SubCategory from "@/models/SubCategory";
import { useEffect, useState } from "react";

export default function CategoryPage({ params }: { params: { categoryId: string } }) {
    const [category, setCategory] = useState<Category | null>(null);
    const [selectedSubCategory, setSelectSubCategory] = useState<SubCategory | null>(null);
    const [subCategoryList, setSubCategoryList] = useState<SubCategory[]>([]);
    const [productList, setProductList] = useState<Product[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    // useEffect(() => {
    // }, [selectedSubCategory]);

    async function fetchData() {
        setCategory(await fetchCategory(params.categoryId));
        setSubCategoryList(await fetchSubCategoryList(params.categoryId));
        setProductList(await fetchProductListWithCategoryId(params.categoryId));
    }

    return (
        <>
            <div>
                <div className="my-10 mx-40">
                    <p className="w-full font-semibold text-2xl">{category && category.name}</p>
                    <div className="flex mt-10 gap-10">
                        {
                            subCategoryList.map((subCategory) => (
                                <button 
                                    onClick={() => setSelectSubCategory(subCategory)} 
                                    className="font-medium text-base hover:opacity-40"
                                >
                                    {subCategory.name}
                                </button>
                            ))
                        }
                    </div>
                    <div className="flex gap-8 my-10">
                        <button className="font-regular text-xs">낮은 가격순</button>
                        <button className="font-regular text-xs">높은 가격순</button>
                    </div>
                    <div className="grid gap-10">
                        {
                            productList.map((product) => (
                                <ProductCell product={product} handleClick={() => alert("!")} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}