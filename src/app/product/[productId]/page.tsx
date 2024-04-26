'use client';

import { fetchProduct } from "@/apis/FirestoreGET";
import CategoryTabBar from "@/components/CategoryTabBar";
import MyFooter from "@/components/MyFooter";
import MyHeader from "@/components/MyHeader";
import Product from "@/models/Product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import plusImg from "@/../public/images/plusFill.png";
import minusImg from "@/../public/images/minusFill.png";
import { NextUIProvider } from "@nextui-org/react";

export default function Page({ params }: { params: { productId: string } }) {
    const router = useRouter();

    const [isMobile, setIsMobile] = useState(false);
    const [product, setProduct] = useState<Product | null>(null);
    const [amount, setAmount] = useState(1);

    useEffect(() => {
        checkIsMobile();
        fetchData();
    }, []);

    function checkIsMobile() {
        if (window.innerWidth < 576) {
            setIsMobile(true);
        }
    }

    async function fetchData() {
        setProduct(await fetchProduct(params.productId));
    }

    function adjustAmount(input: number) {
        if (input < 0) {
            if (amount !== 1) {
                setAmount(amount-1);
            }
        } else {
            setAmount(amount+1);
        }
    }

    return (
        <>
            <NextUIProvider>
                {
                    isMobile ?
                        <div>
                            <MyHeader />
                            <CategoryTabBar selectedCategoryId={null} />
                            <div className="flex flex-col pt-10 items-center mt-32">
                                <div className="border-solid border-1 border-gray-100 p-8">
                                    <div className="flex flex-col gap-10">
                                        <div className="mx-16">
                                            {
                                                product &&
                                                    <img 
                                                        className="w-full object-contain duration-200"
                                                        src={ product.mainImageUrl }
                                                        alt=""
                                                    />
                                            }
                                        </div>
                                        <div className="w-0.5 flex-1 bg-gray-100"></div>
                                        <div className="">
                                            <div className="flex items-center gap-2">
                                                <p className="text-base font-semibold">{product && product.name}</p>
                                                {
                                                    product && product.isPopular &&
                                                        <p className="text-white bg-red-400 px-1 py-0.5 rounded font-medium text-xs">인기상품</p>
                                                }
                                            </div>
                                            <p className="text-xs font-regular mr-4 text-gray-400 mt-2">상품코드 <span className="ml-2">{product && product.code}</span></p>
                                            <div className="mt-8">
                                                <p className="font-bold text-sm text-gray-400 line-through">{ product && product.originalPrice.toLocaleString() }<span className="font-medium">원</span></p>
                                                <p className="font-bold text-lg text-theme">{ product && product.price.toLocaleString() }<span className="font-medium">원</span></p>
                                            </div>
                                            <div className="h-0.5 bg-gray-100 mt-4"></div>
                                            <div className="flex justify-between mt-20 items-end">
                                                <div className="flex items-center gap-3">
                                                    <Image 
                                                        onClick={() => adjustAmount(-1)}
                                                        className="object-contain hover:opacity-70 cursor-pointer"
                                                        src={minusImg.src} 
                                                        alt="" 
                                                        width={20} 
                                                        height={20} 
                                                    />
                                                    <p className="font-semibold text-base w-5 text-center">{ amount }</p>
                                                    <Image 
                                                        onClick={() => adjustAmount(1)}
                                                        className="object-contain hover:opacity-70 cursor-pointer"
                                                        src={plusImg.src} 
                                                        alt="" 
                                                        width={20} 
                                                        height={20} 
                                                    />
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <p className="font-regular text-xs text-gray-400">총 수량 {amount}개</p>
                                                    <p className="font-bold text-lg text-theme">{ product && (product.price * amount).toLocaleString() }<span className="font-medium">원</span></p>
                                                </div>
                                            </div>
                                            <div className="h-0.5 bg-gray-100 mt-5"></div>
                                            {
                                                product &&
                                                    <>
                                                        {
                                                            product.isSoldOut ?
                                                                <p
                                                                    className="w-full text-center py-5 border-2 border-solid text-gray-600 border-gray-400 font-semibold bg-gray-200 mt-10"
                                                                >
                                                                    Sold Out
                                                                </p> :
                                                                <button 
                                                                    onClick={() => router.push(`/order?from=product&productId=${product.id}&amount=${amount}`)}
                                                                    className="w-full py-5 border-2 border-solid border-black font-semibold mt-10 hover:bg-gray-100"
                                                                >
                                                                    구매하기
                                                                </button>
                                                        }
                                                    </>
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <div className="h-0.5 bg-gray-100 my-10"></div>
                                        <p className="text-center font-medium text-base">상품 상세정보</p>
                                        <div className="mt-10">
                                            <p className="text-xs font-regular whitespace-pre-wrap leading-5">{ product && product.desc }</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <MyFooter />
                        </div> :
                        <div>
                            <MyHeader />
                            <CategoryTabBar selectedCategoryId={null} />
                            <div className="flex flex-col pt-10 items-center mt-32">
                                <div className="border-solid border-1 border-gray-100 p-10 w-705">
                                    <div className="flex gap-10">
                                        <div 
                                            className="w-80 h-40"
                                        >
                                            {
                                                product &&
                                                    <img 
                                                        className="w-full object-contain duration-200"
                                                        src={ product.mainImageUrl }
                                                        alt=""
                                                    />
                                            }
                                        </div>
                                        <div className="w-0.5 flex-1 bg-gray-100"></div>
                                        <div className="w-80">
                                            <div className="flex items-center gap-2">
                                                <p className="text-base font-semibold">{product && product.name}</p>
                                                {
                                                    product && product.isPopular &&
                                                        <p className="text-white bg-red-400 px-1 py-0.5 rounded font-medium text-xs">인기상품</p>
                                                }
                                            </div>
                                            <p className="text-xs font-regular mr-4 text-gray-400 mt-2">상품코드 <span className="ml-2">{product && product.code}</span></p>
                                            <div className="mt-8">
                                                <p className="font-bold text-sm text-gray-400 line-through">{ product && product.originalPrice.toLocaleString() }<span className="font-medium">원</span></p>
                                                <p className="font-bold text-lg text-theme">{ product && product.price.toLocaleString() }<span className="font-medium">원</span></p>
                                            </div>
                                            <div className="h-0.5 bg-gray-100 mt-4"></div>
                                            <div className="flex justify-between mt-20 items-end">
                                                <div className="flex items-center gap-3">
                                                    <Image 
                                                        onClick={() => adjustAmount(-1)}
                                                        className="object-contain hover:opacity-70 cursor-pointer"
                                                        src={minusImg.src} 
                                                        alt="" 
                                                        width={20} 
                                                        height={20} 
                                                    />
                                                    <p className="font-semibold text-base w-5 text-center">{ amount }</p>
                                                    <Image 
                                                        onClick={() => adjustAmount(1)}
                                                        className="object-contain hover:opacity-70 cursor-pointer"
                                                        src={plusImg.src} 
                                                        alt="" 
                                                        width={20} 
                                                        height={20} 
                                                    />
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <p className="font-regular text-xs text-gray-400">총 수량 {amount}개</p>
                                                    <p className="font-bold text-lg text-theme">{ product && (product.price * amount).toLocaleString() }<span className="font-medium">원</span></p>
                                                </div>
                                            </div>
                                            <div className="h-0.5 bg-gray-100 mt-5"></div>
                                            {
                                                product &&
                                                    <>
                                                        {
                                                            product.isSoldOut ?
                                                                <p
                                                                    className="w-full text-center py-5 border-2 border-solid text-gray-600 border-gray-400 font-semibold bg-gray-200 mt-10"
                                                                >
                                                                    Sold Out
                                                                </p> :
                                                                <button 
                                                                    onClick={() => router.push(`/order?from=product&productId=${product.id}&amount=${amount}`)}
                                                                    className="w-full py-5 border-2 border-solid border-black font-semibold mt-10 hover:bg-gray-100"
                                                                >
                                                                    구매하기
                                                                </button>
                                                        }
                                                    </>
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <div className="h-0.5 bg-gray-100 my-10"></div>
                                        <p className="text-center font-medium text-base">상품 상세정보</p>
                                        <div className="mt-10">
                                            <p className="text-sm font-regular whitespace-pre-wrap">{ product && product.desc }</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <MyFooter />
                        </div>
                    }
            </NextUIProvider>
        </>
    );
}