'use client';

import Category from "@/models/Category";
import { useRouter } from "next/navigation";

interface CategoryTabBarProps {
    categoryList: Category[];
    clickCategory: (category: Category) => void;
}

export default function CategoryTabBar(props: CategoryTabBarProps) {
    const router = useRouter();

    return (
        <>
            <div className="flex w-full justify-center mx-10">
                {
                    props.categoryList.map((category: Category) => (
                        <button 
                            className="font-medium cursor-pointer py-6 px-10 hover:bg-gray-100"
                            onClick={() => props.clickCategory(category)}
                        >
                            { category.name }
                        </button>
                    ))
                }
            </div>
            {/* <button>상품권 시세보기</button> */}
            <div className="h-0.5 bg-gray-200"></div>
        </>
    );
}