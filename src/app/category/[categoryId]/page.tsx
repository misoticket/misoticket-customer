'use client';

import { fetchCategoryList, fetchProductListWithCategoryId, fetchSubCategoryList } from "@/apis/FirestoreGET";
import CategoryTabBar from "@/components/CategoryTabBar";
import MyFooter from "@/components/MyFooter";
import MyHeader from "@/components/MyHeader";
import ProductCell from "@/components/cells/ProductCell";
import Category from "@/models/Category";
import Product from "@/models/Product";
import SubCategory from "@/models/SubCategory";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { categoryId: string } }) {
    const router = useRouter();

    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [subCategoryList, setSubCategoryList] = useState<SubCategory[]>([]);
    const [productList, setProductList] = useState<Product[]>([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedSubCategory) {
            let newProductList = [...productList]
            newProductList = newProductList.filter(product => product.subCategoryId === selectedSubCategory.id);
            setProductList(newProductList);
        } 
    }, [selectedSubCategory]);

    async function fetchData() {
        setCategoryList(await fetchCategoryList());
        setSubCategoryList(await fetchSubCategoryList(params.categoryId));
        setProductList(await fetchProductListWithCategoryId(params.categoryId));
    }

    function getCategoryName(): string {
        const catList = categoryList.filter(cat => cat.id === params.categoryId);
        return catList.length > 0 ? catList[0].name : "";
    }

    return (
        <>
            <div>
                <MyHeader />
                <CategoryTabBar categoryList={categoryList} clickCategory={(category) => router.push(`/category/${category.id}`)} />
                <div className="mt-10 mx-40">
                    <p className="w-full font-semibold text-2xl h-8">{ getCategoryName() }</p>
                    <div className="flex mt-10 gap-10">
                        {
                            subCategoryList.map((subCategory) => (
                                <button 
                                    onClick={() => setSelectedSubCategory(subCategory)} 
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
                                <ProductCell 
                                    product={product} 
                                    handleClick={() => router.push(`/product/${product.id}`)}
                                />
                            ))
                        }
                    </div>
                </div>
                <MyFooter />
            </div>
        </>
    );
}