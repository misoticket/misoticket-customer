'use client';

import logoImg from "@/../public/images/logo.png";
import { fetchAllProductList, fetchCategoryList } from "@/apis/FirestoreGET";
import Category from "@/models/Category";
import Product from "@/models/Product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const router = useRouter();

    const [isMobile, setIsMobile] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [productList, setProductList] = useState<Product[]>([]);
    const [showProductList, setShowProductList] = useState<Product[]>([]);

    useEffect(() => {
        checkIsMobile();
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            let newProductList = [...productList];
            newProductList = newProductList.filter(product => product.categoryId === selectedCategory.id);
            setShowProductList(newProductList);
        }
    }, [selectedCategory]);

    function checkIsMobile() {
        if (window.innerWidth < 576) {
            setIsMobile(true);
        }
    }

    async function fetchData() {
        const catList = await fetchCategoryList();
        setCategoryList(catList);

        setProductList(await fetchAllProductList());
        setSelectedCategory(catList[0]);
    }

    function getCustomerSaleRatio(product: Product): number {
        return Math.round((100 - (product.customerSellingPrice / product.originalPrice * 100))*10) /10;
    }

    function getSellerSaleRatio(product: Product): number {
        return Math.round((100 - (product.price / product.originalPrice * 100))*10) /10;
    }

    return (
        <>
            {
                isMobile ?
                    <div>
                        <Image 
                            onClick={() => router.push("/")} 
                            src={logoImg} 
                            alt="" width={80} 
                            className="cursor-pointer my-5 mx-6" 
                        />
                        <div className="flex flex-col">
                            <p className="mb-4 font-semibold text-xl text-center">상품권 시세</p>
                            <div className="flex flex-col">
                                <div className="-hidden">
                                    <div className="w-full h-0.5 bg-gray-100"></div>
                                    <div className="flex overflow-scroll scrollbar-hide">
                                        {
                                            categoryList.map((category) => (
                                                <p 
                                                    key={category.id}
                                                    onClick={() => setSelectedCategory(category)}
                                                    className={`font-medium whitespace-nowrap text-sm py-4 px-3 cursor-pointer hover:bg-gray-100 ${selectedCategory && selectedCategory.id === category.id ? "text-theme-sub" : "text-black"}`}
                                                >
                                                    {category.name}
                                                </p>
                                            ))
                                        }
                                    </div>
                                    <div className="w-full h-0.5 bg-gray-100"></div>
                                </div>
                                <p className="mx-4 text-center mt-4 font-medium text-theme text-xs">※ 구겨지거나 선물용으로 부적합한 상품권은 매입가가 변경될수 있습니다. (구권포함)</p>
                                <div className="flex mt-10 mx-4 border-t border-b border-solid border-gray-200">
                                    <div className="h-14 w-full bg-gray-50 flex flex-col justify-center border-l border-r border-solid border-gray-200">
                                        <p className="font-semibold text-sm text-center">상품권</p>
                                    </div>
                                    <div className="h-14 w-56 bg-gray-50 flex flex-col justify-center border-r border-solid border-gray-200">
                                        <p className="font-semibold text-xs text-center">고객께서 파실때</p>
                                        <p className="font-medium text-xxs text-center text-gray-400 mt-0.5">(할인율 %)</p>
                                    </div>
                                    <div className="h-14 w-56 bg-gray-50 flex flex-col justify-center border-r border-solid border-gray-200">
                                        <p className="font-semibold text-xs text-center">고객께서 구매시</p>
                                        <p className="font-medium text-xxs text-center text-gray-400 mt-0.5">(할인율 %)</p>
                                    </div>
                                </div>
                                <div>
                                    { 
                                        showProductList.map((product) => (
                                            <div 
                                                key={product.id}
                                                onClick={() => router.push(`/product/${product.id}`)}
                                                className="flex mx-4 border-b border-solid border-gray-200 cursor-pointer group"
                                            >
                                                <div className="h-12 w-full flex flex-col justify-center border-l border-r border-solid border-gray-200 group-hover:bg-gray-100">
                                                    <p className="font-medium text-xs mx-5">{ product.name }</p>
                                                </div>
                                                <div className="h-12 w-56 border-r border-solid border-gray-200 flex flex-col justify-center items-center group-hover:bg-gray-100 bg-yellow-100">
                                                    <p className="font-bold text-sm text-center">{ product.customerSellingPrice.toLocaleString() }<span className="font-medium">원</span></p>
                                                    <p className="font-medium text-xs text-center text-theme-sub mr-2">{ getCustomerSaleRatio(product) }%</p>
                                                </div>
                                                <div className="h-12 w-56 border-r border-solid border-gray-200 flex flex-col justify-center items-center group-hover:bg-gray-100">
                                                    <p className="font-bold text-sm text-center">{ product.price.toLocaleString() }<span className="font-medium">원</span></p>
                                                    <p className="font-medium text-xs text-center text-theme mr-2">{ getSellerSaleRatio(product) }%</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div> :
                    <div>
                        <Image 
                            onClick={() => router.push("/")} 
                            src={logoImg} 
                            alt="" width={120} 
                            className="cursor-pointer my-5 mx-10" 
                        />
                        <div className="flex flex-col items-center py-4">
                            <p className="mb-4 font-semibold text-xl">상품권 시세</p>
                            <div className="flex flex-col">
                                <div>
                                    <div className="w-full h-0.5 bg-gray-100"></div>
                                    <div className="flex">
                                        {
                                            categoryList.map((category) => (
                                                <p 
                                                    key={category.id}
                                                    onClick={() => setSelectedCategory(category)}
                                                    className={`font-medium text-sm py-4 px-3 cursor-pointer hover:bg-gray-100 ${selectedCategory && selectedCategory.id === category.id ? "text-theme-sub" : "text-black"}`}
                                                >
                                                    {category.name}
                                                </p>
                                            ))
                                        }
                                    </div>
                                    <div className="w-full h-0.5 bg-gray-100"></div>
                                </div>
                                <p className="text-center mt-4 font-medium text-theme text-xs">※ 구겨지거나 선물용으로 부적합한 상품권은 매입가가 변경될수 있습니다. (구권포함)</p>
                                <div className="flex w-full mt-10 border-t border-b border-solid border-gray-200">
                                    <div className="h-14 w-full bg-gray-50 flex flex-col justify-center border-l border-r border-solid border-gray-200">
                                        <p className="font-semibold text-sm text-center">상품권</p>
                                    </div>
                                    <div className="h-14 w-56 bg-gray-50 flex flex-col justify-center border-r border-solid border-gray-200">
                                        <p className="font-semibold text-sm text-center">고객께서 파실때</p>
                                        <p className="font-medium text-xs text-center text-gray-400 mt-0.5">(할인율 %)</p>
                                    </div>
                                    <div className="h-14 w-56 bg-gray-50 flex flex-col justify-center border-r border-solid border-gray-200">
                                        <p className="font-semibold text-sm text-center">고객께서 구매시</p>
                                        <p className="font-medium text-xs text-center text-gray-400 mt-0.5">(할인율 %)</p>
                                    </div>
                                </div>
                                <div>
                                    { 
                                        showProductList.map((product) => (
                                            <div 
                                                key={product.id}
                                                onClick={() => router.push(`/product/${product.id}`)}
                                                className="flex w-full border-b border-solid border-gray-200 cursor-pointer group"
                                            >
                                                <div className="h-12 w-full flex flex-col justify-center border-l border-r border-solid border-gray-200 group-hover:bg-gray-100">
                                                    <p className="font-medium text-sm mx-5">{ product.name }</p>
                                                </div>
                                                <div className="h-12 w-56 border-r border-solid border-gray-200 flex flex-col justify-center items-center group-hover:bg-gray-100 bg-yellow-100">
                                                    <p className="font-bold text-sm text-center">{ product.customerSellingPrice.toLocaleString() }<span className="font-medium">원</span></p>
                                                    <p className="font-medium text-xs text-center text-theme-sub mr-2">{ getCustomerSaleRatio(product) }%</p>
                                                </div>
                                                <div className="h-12 w-56 border-r border-solid border-gray-200 flex flex-col justify-center items-center group-hover:bg-gray-100">
                                                    <p className="font-bold text-sm text-center">{ product.price.toLocaleString() }<span className="font-medium">원</span></p>
                                                    <p className="font-medium text-xs text-center text-theme mr-2">{ getSellerSaleRatio(product) }%</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
}