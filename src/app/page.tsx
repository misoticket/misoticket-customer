"use client";

import mainBanner from "@/../public/images/mainBanner.png";
import mainBannerMobile from "@/../public/images/mainBannerMobile.png";
import {
    fetchActiveBanner,
    fetchMainCategoryList,
    fetchAllProductList as fetchProductListFromServer,
} from "@/apis/FirestoreGET";
import CategoryTabBar from "@/components/CategoryTabBar";
import MyFooter from "@/components/MyFooter";
import MyHeader from "@/components/MyHeader";
import ProductCell from "@/components/cells/ProductCell";
import { Banner } from "@/models/Banner";
import MainCategory from "@/models/MainCategory";
import Product from "@/models/Product";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Home() {
    const router = useRouter();

    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const [mainCategoryList, setMainCategoryList] = useState<MainCategory[]>(
        []
    );
    const [productList, setProductList] = useState<Product[]>([]);
    const [banner, setBanner] = useState<Banner | null>(null);

    useEffect(() => {
        fetchData();
        window.scrollTo(0, 0);
    }, []);

    async function fetchData() {
        setProductList(await fetchProductListFromServer());
        setBanner(await fetchActiveBanner());
        setMainCategoryList(await fetchMainCategoryList());
    }

    function getProduct(id: string): Product {
        return productList.filter((prod) => prod.id === id)[0];
    }

    return (
        <>
            <main className="min-h-screen">
                <MyHeader />
                <CategoryTabBar selectedCategoryId={null} />
                {isMobile ? (
                    <div>
                        <div className="flex justify-center">
                            {banner && (
                                <div className="mt-28 bg-gray-100 w-full mx-4 px-8 py-4 rounded-lg">
                                    <p className="font-medium text-base mb-4">
                                        {banner.title}
                                    </p>
                                    <p className="font-medium text-xs whitespace-pre-line">
                                        {banner.desc}
                                    </p>
                                </div>
                            )}
                        </div>
                        <img
                            className={`${banner !== null ? "mt-4" : "mt-32"}`}
                            src={mainBannerMobile.src}
                            alt=""
                        />
                        <div
                            className={`${
                                banner ? "mt-12" : "mt-10"
                            } flex justify-center`}
                        >
                            <div className="overflow-hidden">
                                {mainCategoryList.map((mc) => (
                                    <div key={mc.id} className="mb-14">
                                        <p className="font-semibold text-2xl mb-6 px-6">
                                            {mc.name}
                                        </p>
                                        <div className="flex gap-2 overflow-scroll px-6 scrollbar-hide">
                                            {mc.productIdList.map((prodId) => (
                                                <ProductCell
                                                    key={prodId}
                                                    product={getProduct(prodId)}
                                                    handleClick={() =>
                                                        router.push(
                                                            `/product/${prodId}`
                                                        )
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div>
                            <div className="relative">
                                <div className="flex justify-center">
                                    {banner && (
                                        <div className="mt-40 bg-gray-100 w-1/2 px-8 py-4 rounded-lg border">
                                            <p className="font-medium text-base mb-4">
                                                {banner.title}
                                            </p>
                                            <p className="font-medium text-sm whitespace-pre-line">
                                                {banner.desc}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <img
                                    className={`${
                                        banner !== null ? "mt-4" : "mt-12"
                                    }`}
                                    src={mainBanner.src}
                                    alt=""
                                />
                            </div>
                            <div className="mt-16 flex justify-center">
                                <div className="">
                                    {mainCategoryList.map((mc) => (
                                        <div key={mc.id} className="mb-20">
                                            <p className="font-semibold text-2xl mb-6">
                                                {mc.name}
                                            </p>
                                            <div className="grid grid-cols-4 gap-4">
                                                {mc.productIdList.map(
                                                    (prodId) => (
                                                        <ProductCell
                                                            key={prodId}
                                                            product={getProduct(
                                                                prodId
                                                            )}
                                                            handleClick={() =>
                                                                router.push(
                                                                    `/product/${prodId}`
                                                                )
                                                            }
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <MyFooter />
            </main>
        </>
    );
}
