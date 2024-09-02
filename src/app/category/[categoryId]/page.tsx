"use client";

import rightArrowImg from "@/../public/images/rightTriangle.png";
import {
    fetchCategoryList,
    fetchProductListWithCategoryId,
    fetchSubCategoryList,
} from "@/apis/FirestoreGET";
import CategoryTabBar from "@/components/CategoryTabBar";
import MyFooter from "@/components/MyFooter";
import MyHeader from "@/components/MyHeader";
import ProductCell from "@/components/cells/ProductCell";
import Category from "@/models/Category";
import Product from "@/models/Product";
import SubCategory from "@/models/SubCategory";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Page({ params }: { params: { categoryId: string } }) {
    const router = useRouter();

    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [subCategoryList, setSubCategoryList] = useState<SubCategory[]>([]);
    const [productList, setProductList] = useState<Product[]>([]);
    const [showProductList, setShowProductList] = useState<Product[]>([]);
    const [selectedSubCategory, setSelectedSubCategory] =
        useState<SubCategory | null>(null);

    useEffect(() => {
        if (selectedSubCategory) {
            let newProductList = [...productList];
            newProductList = newProductList
                .filter(
                    (product) =>
                        product.subCategoryId === selectedSubCategory.id &&
                        product.isDeleted === false
                )
                .sort((a, b) => a.order - b.order);
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
        const catList = await fetchCategoryList();
        setCategoryList(catList);

        const subCatList = await fetchSubCategoryList(params.categoryId);
        setSubCategoryList(subCatList);

        const prodList = (
            await fetchProductListWithCategoryId(params.categoryId)
        ).filter((p) => p.isDeleted === false);
        setProductList(prodList);

        const showList: Product[] = [];
        for (const subCat of subCatList.sort((a, b) => a.order - b.order)) {
            for (const prod of prodList.filter(
                (p) => p.subCategoryId === subCat.id
            )) {
                showList.push(prod);
            }
        }

        setShowProductList(showList);
    }

    function getCategoryName(): string {
        const catList = categoryList.filter(
            (cat) => cat.id === params.categoryId
        );
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
            {isMobile ? (
                <div>
                    <MyHeader />
                    <CategoryTabBar selectedCategoryId={params.categoryId} />
                    <div className="mt-36">
                        <p className="w-full font-semibold text-2xl h-8 px-4">
                            {getCategoryName()}
                        </p>
                        <div className="flex gap-6 mt-5 px-4 py-4 overflow-scroll scrollbar-hide">
                            {subCategoryList.map((subCategory) => (
                                <div
                                    key={subCategory.id}
                                    onClick={() =>
                                        setSelectedSubCategory(subCategory)
                                    }
                                    className="flex cursor-pointer hover:opacity-40 items-center gap-2"
                                >
                                    <p
                                        className={`font-medium whitespace-nowrap text-sm ${
                                            selectedSubCategory &&
                                            subCategory.id ===
                                                selectedSubCategory.id
                                                ? "text-theme-sub"
                                                : "text-black"
                                        }`}
                                    >
                                        {subCategory.name}
                                    </p>
                                    <Image
                                        src={rightArrowImg}
                                        width={6}
                                        height={6}
                                        alt=""
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-4 mb-10 border-t border-gray-100 pt-6 px-4">
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
                        <div className="flex flex-col gap-4 px-4 items-center">
                            {showProductList.map((product) => (
                                <ProductCell
                                    key={product.id}
                                    product={product}
                                    handleClick={() =>
                                        router.push(`/product/${product.id}`)
                                    }
                                />
                            ))}
                        </div>
                        {showProductList.length === 0 && (
                            <p className="font-medium text-base text-center mt-20 mb-56 text-gray-400">
                                상품이 없습니다.
                            </p>
                        )}
                    </div>
                    <MyFooter isShow={true} />
                </div>
            ) : (
                <div>
                    <MyHeader />
                    <CategoryTabBar selectedCategoryId={params.categoryId} />
                    <div className="mt-44 mx-56">
                        <p className="w-full font-semibold text-2xl h-8">
                            {getCategoryName()}
                        </p>
                        <div className="flex mt-10 gap-10 flex-wrap">
                            {subCategoryList.map((subCategory) => (
                                <div
                                    key={subCategory.id}
                                    onClick={() =>
                                        setSelectedSubCategory(subCategory)
                                    }
                                    className="flex cursor-pointer hover:opacity-40 items-center gap-2"
                                >
                                    <p
                                        className={`font-medium text-sm ${
                                            selectedSubCategory &&
                                            subCategory.id ===
                                                selectedSubCategory.id
                                                ? "text-theme-sub"
                                                : "text-black"
                                        }`}
                                    >
                                        {subCategory.name}
                                    </p>
                                    <Image
                                        src={rightArrowImg}
                                        width={8}
                                        height={8}
                                        alt=""
                                    />
                                </div>
                            ))}
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
                            {showProductList.map((product) => (
                                <ProductCell
                                    key={product.id}
                                    product={product}
                                    handleClick={() =>
                                        router.push(`/product/${product.id}`)
                                    }
                                />
                            ))}
                        </div>
                        {showProductList.length === 0 && (
                            <p className="font-medium text-base text-center mt-20 mb-56 text-gray-400">
                                상품이 없습니다.
                            </p>
                        )}
                    </div>
                    <MyFooter isShow={true} />
                </div>
            )}
        </>
    );
}
