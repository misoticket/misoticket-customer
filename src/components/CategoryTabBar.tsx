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
    const [isMobile, setIsMobile] = useState(false);
    const [categoryList, setCategoryList] = useState<Category[]>([]);

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
        setCategoryList(await fetchCategoryList());
    }

    return (
        <>
            {
                isMobile ?
                    <div className="flex z-10">
                        <div className="flex flex-col w-full fixed left-0 right-0 top-14 bg-white overflow-hidden z-10">
                            <div className="flex overflow-scroll scrollbar-hide">
                                {
                                    categoryList.map((category: Category) => (
                                        <button 
                                            key={category.id}
                                            className={`font-medium text-sm cursor-pointer py-4 px-6 whitespace-nowrap hover:bg-gray-100 ${props.selectedCategoryId && props.selectedCategoryId === category.id ? "text-theme-sub" : "text-black"}`}
                                            onClick={() => router.push(`/category/${category.id}`)}
                                        >
                                            { category.name }
                                        </button>
                                    ))
                                }
                            </div>
                            <div className="w-full h-0.5 bg-gray-200"></div>
                        </div>
                    </div> : 
                    <div>
                        <div className="flex flex-col w-full items-center fixed left-0 right-0 top-14 bg-white z-10">
                            <div>
                                {
                                    categoryList.map((category: Category) => (
                                        <button 
                                            key={category.id}
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
                    </div>
            }
        </>
    );
}