'use client';

import { fetchAllProductList, fetchCategoryList, fetchProduct, fetchProductListWithCategoryId, fetchSubCategoryList } from "@/apis/FirestoreGET";
import CategoryTabBar from "@/components/CategoryTabBar";
import MyFooter from "@/components/MyFooter";
import MyHeader from "@/components/MyHeader";
import ProductCell from "@/components/cells/ProductCell";
import Category from "@/models/Category";
import Product from "@/models/Product";
import SubCategory from "@/models/SubCategory";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import rightArrowImg from '@/../public/images/rightTriangle.png';
import Image from "next/image";

export default function Page({ params }: { params: { categoryId: string } }) {
    const router = useRouter();

    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [subCategoryList, setSubCategoryList] = useState<SubCategory[]>([]);
    const [productList, setProductList] = useState<Product[]>([]);
    const [showProductList, setShowProductList] = useState<Product[]>([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);

    useEffect(() => {
        if (selectedSubCategory) {
            let newProductList = [...productList]
            newProductList = newProductList.filter(product => product.subCategoryId === selectedSubCategory.id);
            setShowProductList(newProductList);
        } 
    }, [selectedSubCategory]);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (showProductList.length === 0) {
            fetchData();
        }
    }, []);

    async function fetchData() {
        setCategoryList(await fetchCategoryList());
        setSubCategoryList(await fetchSubCategoryList(params.categoryId));

        const prodList = await fetchProductListWithCategoryId(params.categoryId);
        setProductList(prodList);
        setShowProductList(prodList);
    }

    function getCategoryName(): string {
        const catList = categoryList.filter(cat => cat.id === params.categoryId);
        return catList.length > 0 ? catList[0].name : "";
    }

    function sort(isAscending: boolean) {
        let newProductList = [...showProductList];

        if (isAscending) {
            newProductList = newProductList.sort((a, b) => a.price - b.price);
        } else {
            newProductList = newProductList.sort((a, b) => b.price - a.price);
        }

        setShowProductList(newProductList);
    }

    return (
        <>
            <div>
                <MyHeader />
                <CategoryTabBar selectedCategoryId={params.categoryId} />
                <div className="mt-44 mx-56">
                    <p className="w-full font-semibold text-2xl h-8">{ getCategoryName() }</p>
                    <div className="flex mt-10 gap-10 flex-wrap">
                        {
                            subCategoryList.map((subCategory) => (
                                <div 
                                    onClick={() => setSelectedSubCategory(subCategory)} 
                                    className="flex cursor-pointer hover:opacity-40 items-center gap-2"
                                >
                                    <p 
                                        className={`font-medium text-sm ${selectedSubCategory && subCategory.id === selectedSubCategory.id ? "text-theme-sub" : "text-black"}`}
                                    >
                                        {subCategory.name}
                                    </p>
                                    <Image src={rightArrowImg} width={8} height={8} alt="" />
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex gap-4 my-10 border-t border-gray-100 pt-6">
                        <button 
                            onClick={() => sort(true)}
                            className="font-medium text-xs bg-gray-200 px-2 py-1 rounded-lg text-gray-500"
                        >
                            낮은 가격순
                        </button>
                        <button 
                            onClick={() => sort(false)}
                            className="font-medium text-xs bg-gray-200 px-2 py-1 rounded-lg text-gray-500"
                        >
                            높은 가격순
                        </button>
                    </div>
                    <div className="grid grid-cols-4 gap-10">
                        {
                            showProductList.map((product) => (
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