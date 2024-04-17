'use client';

import { fetchCategoryList } from "@/apis/FirestoreGET";
import Category from "@/models/Category";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CategoryTabBar {
    selectedCategoryId: string | null;
}

export default function CategoryTabBar(props: CategoryTabBar) {
    const router = useRouter();
    const [categoryList, setCategoryList] = useState<Category[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setCategoryList(await fetchCategoryList());
    }

    return (
        <>
            <div className="flex flex-col w-full items-center fixed left-0 right-0 top-14 bg-white">
                <div>
                    {
                        categoryList.map((category: Category) => (
                            <button 
                                className={`font-medium cursor-pointer py-6 px-10 hover:bg-gray-100 ${props.selectedCategoryId && props.selectedCategoryId === category.id ? "text-theme-sub" : "text-black"}`}
                                onClick={() => router.push(`/category/${category.id}`)}
                            >
                                { category.name }
                            </button>
                        ))
                    }
                </div>
                <div className="w-full h-0.5 bg-gray-200"></div>
            </div>
        </>
    );
}