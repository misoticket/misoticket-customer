'use client';

import CategoryTabBar from "@/components/CategoryTabBar";
import MyFooter from "@/components/MyFooter";
import MyHeader from "@/components/MyHeader";
import MySubFooter from "@/components/MySubFooter";
import { useEffect, useState } from "react";
import { fetchActiveBanner, fetchMainCategoryList, fetchAllProductList as fetchProductListFromServer } from "@/apis/FirestoreGET";
import Product from "@/models/Product";
import { useRouter } from "next/navigation";
import MainCategory from "@/models/MainCategory";
import ProductCell from "@/components/cells/ProductCell";
import { Banner } from "@/models/Banner";
import mainBanner from "@/../public/images/mainBanner.png";

export default function Home() {
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [mainCategoryList, setMainCategoryList] = useState<MainCategory[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [banner, setBanner] = useState<Banner | null>(null);

  useEffect(() => {
    checkIsMobile();
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  function checkIsMobile() {
      if (window.innerWidth < 576) {
          setIsMobile(true);
      }
  }

  async function fetchData() {
    setProductList(await fetchProductListFromServer());
    setMainCategoryList(await fetchMainCategoryList());
    setBanner(await fetchActiveBanner());
  }

  function getProduct(id: string): Product {
    return productList.filter(prod => prod.id === id)[0];
  }

  return (
    <main className="min-h-screen">
      <MyHeader />
      <CategoryTabBar selectedCategoryId={null} />
      {
        isMobile ?
          <div>
            <div className="flex justify-center">
              {
                banner &&
                  <div className="mt-28 bg-gray-100 w-full px-8 py-4">
                    <p className="font-medium text-base mb-4 text-center">{banner.title}</p>
                    <p className="font-medium text-xs whitespace-pre-line text-center">{banner.desc}</p>
                  </div>

              }
            </div>
            <div className={`${banner ? "mt-12" : "mt-40"} flex justify-center`}>
              <div className="overflow-hidden">
                {
                  mainCategoryList.map((mc) => (
                    <div key={mc.id} className="mb-20">
                      <p className="font-semibold text-2xl mb-6 px-6">{mc.name}</p>
                      <div className="flex gap-4 overflow-scroll px-6 scrollbar-hide">
                        {
                          mc.productIdList.map((prodId) => (
                            <ProductCell key={prodId} product={getProduct(prodId)} handleClick={() => router.push(`/product/${prodId}`)} />
                          ))
                        }
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div> :
          <div>
            <div className="flex justify-center">
              {
                banner &&
                  <div className="mt-32 bg-gray-100 w-full px-8 py-6">
                    <p className="font-medium text-base mb-4 text-center">{banner.title}</p>
                    <p className="font-medium text-xs whitespace-pre-line text-center">{banner.desc}</p>
                  </div>

              }
            </div>
            <img
              className="mt-24"
              src={mainBanner.src}
              alt=""
            />
            <div className={`${banner ? "mt-12" : "mt-16"} flex justify-center`}>
              <div className="">
                {
                  mainCategoryList.map((mc) => (
                    <div key={mc.id} className="mb-20">
                      <p className="font-semibold text-2xl mb-6">{mc.name}</p>
                      <div className="grid grid-cols-4 gap-4">
                        {
                          mc.productIdList.map((prodId) => (
                            <ProductCell key={prodId} product={getProduct(prodId)} handleClick={() => router.push(`/product/${prodId}`)} />
                          ))
                        }
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
      }
      <MySubFooter />
      <MyFooter />
    </main>
  );
}
