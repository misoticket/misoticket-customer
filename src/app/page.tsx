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
import BannerModal from "@/modals/BannerModal";
import { Banner } from "@/models/Banner";
import MainCategory from "@/models/MainCategory";
import Product from "@/models/Product";
import { useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Home() {
    const router = useRouter();

    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const [mainCategoryList, setMainCategoryList] = useState<MainCategory[]>(
        []
    );

    const [isFetchDone, setIsFetchDone] = useState(false);
    const [productList, setProductList] = useState<Product[]>([]);
    const [banner, setBanner] = useState<Banner | null>(null);

    const bannerDiscolsure = useDisclosure();

    useEffect(() => {
        fetchData();
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (banner !== null) {
            const bannerSkip = localStorage.getItem(banner.id);

            if (bannerSkip === null) {
                bannerDiscolsure.onOpen();
            } else {
                if (bannerSkip !== makeTodayStr()) {
                    bannerDiscolsure.onOpen();
                }
            }
        }
    }, [banner]);

    async function fetchData() {
        const [products, banners, categories] = await Promise.all([
            fetchProductListFromServer(),
            fetchActiveBanner(),
            fetchMainCategoryList(),
        ]);

        setProductList(products.filter((prod) => prod.isDeleted === false));
        setBanner(banners);
        setMainCategoryList(categories);
        setIsFetchDone(true);
    }

    function getProduct(id: string): Product {
        return productList.filter((prod) => prod.id === id)[0];
    }

    function makeTodayStr(): string {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const dateString = `${year}-${month}-${day}`;
        return dateString;
    }

    return (
        <>
            <main className="min-h-screen">
                <MyHeader />
                <CategoryTabBar selectedCategoryId={null} />
                {isMobile ? (
                    <div>
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
                            <img
                                className={`${
                                    banner !== null ? "mt-4" : "mt-12"
                                }`}
                                src={mainBanner.src}
                                alt=""
                            />
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
                <MyFooter isShow={isFetchDone} />
            </main>
            <BannerModal
                banner={banner}
                isOpen={bannerDiscolsure.isOpen}
                onOpenChange={bannerDiscolsure.onOpenChange}
            />
        </>
    );
}
