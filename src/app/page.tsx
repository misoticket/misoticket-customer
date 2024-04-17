'use client';

import CategoryTabBar from "@/components/CategoryTabBar";
import MyFooter from "@/components/MyFooter";
import MyHeader from "@/components/MyHeader";
import MySubFooter from "@/components/MySubFooter";
import Category from "@/models/Category";
import { useEffect, useState } from "react";
import MainPage from "./pages/MainPage";
import { Tab } from "./constants/Tab";
import { fetchCategoryList as fetchCategoryListFromServer, fetchAllProductList as fetchProductListFromServer } from "@/apis/FirestoreGET";
import Product from "@/models/Product";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState(Tab.MAIN);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setCategoryList(await fetchCategoryListFromServer());
    setProductList(await fetchProductListFromServer());
  }

  return (
    <main className="min-h-screen">
      <MyHeader />
      <CategoryTabBar selectedCategoryId={null} />
      <MySubFooter />
      <MyFooter />
    </main>
  );
}
