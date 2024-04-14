'use client';

import { fetchCategoryList, fetchProduct } from "@/apis/FirestoreGET";
import CategoryTabBar from "@/components/CategoryTabBar";
import MyFooter from "@/components/MyFooter";
import MyHeader from "@/components/MyHeader";
import Category from "@/models/Category";
import Product from "@/models/Product";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { productId: string } }) {
    const router = useRouter();

    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setCategoryList(await fetchCategoryList());
        setProduct(await fetchProduct(params.productId));
    }

    return (
        <>
            <div>
                <MyHeader />
                <CategoryTabBar categoryList={categoryList} clickCategory={(category) => router.push(`/category/${category.id}`)} />
                <div className="flex flex-col pt-10 items-center">
                    <div className="border border-solid border-1 border-gray-100 p-10">
                        <div className="flex gap-16">
                            <div className="w-80 h-40 bg-gray-300"></div>
                            <div className="w-0.5 flex-1 bg-gray-100"></div>
                            <div className="w-80">
                                <p className="text-base font-semibold">{product && product.name}</p>
                                <p className="text-xs font-regular mr-4 text-gray-400 mt-2">상품코드 <span className="ml-2">{product && product.code}</span></p>
                                <div className="mt-8">
                                    <p className="font-bold text-sm text-gray-400 line-through">{ product && product.originalPrice.toLocaleString() }<span className="font-medium">원</span></p>
                                    <p className="font-bold text-lg text-theme">{ product && product.price.toLocaleString() }<span className="font-medium">원</span></p>
                                </div>
                                <div className="h-0.5 bg-gray-100 mt-5"></div>
                                <div className="flex justify-between mt-20">
                                    <p>Stepper</p>
                                    <div className="flex items-end">
                                        <p className="font-regular text-xs text-gray-400 mb-1 mr-3">총 수량 N개</p>
                                        <p className="font-bold text-lg text-theme">{ product && product.price.toLocaleString() }<span className="font-medium">원</span></p>
                                    </div>
                                </div>
                                <div className="h-0.5 bg-gray-100 mt-5"></div>
                                <button className="w-full py-5 border-2 border-solid border-black font-semibold mt-10 hover:bg-gray-100">구매하기</button>
                            </div>
                        </div>
                        <div>
                            <div className="h-0.5 bg-gray-100 my-10"></div>
                            <p className="text-center font-regular text-base">상품 상세정보</p>
                            <div className="mt-10">
                                <p>긴글</p>
                                <p>긴글</p>
                                <p>긴글</p>
                                <p>긴글</p>
                                <p>긴글</p>
                                <p>긴글</p>
                                <p>긴글</p>
                                <p>긴글</p>
                                <p>긴글</p>
                                <p>긴글</p>
                                <p>긴글</p>
                                <p>긴글</p>
                            </div>
                        </div>
                    </div>
                </div>
                <MyFooter />
            </div>
        </>
    );
}