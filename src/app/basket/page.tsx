'use client';

import { fetchAllProductList, fetchProductOrderListWithNoneUserId, fetchProductOrderListWithUserId } from "@/apis/FirestoreGET";
import { removeProductOrderListWithNoneUserId, removeProductOrderListWithUserId } from "@/apis/FirestorePOST";
import CategoryTabBar from "@/components/CategoryTabBar";
import MyFooter from "@/components/MyFooter";
import MyHeader from "@/components/MyHeader";
import Product from "@/models/Product";
import ProductOrder from "@/models/ProductOrder";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const router = useRouter();

    const [isMobile, setIsMobile] = useState(false);

    const [productList, setProductList] = useState<Product[]>([]);
    const [productOrderList, setProductOrderList] = useState<ProductOrder[]>([]);
    const [selectProductOrderList, setSelectProductOrderList] = useState<ProductOrder[]>([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        checkIsMobile();
        fetchProductList();
        fetchProductOrderList();
    }, []);

    function checkIsMobile() {
        if (window.innerWidth < 576) {
            setIsMobile(true);
        }
    }

    async function fetchProductList() {
        setProductList(await fetchAllProductList());
    }

    async function fetchProductOrderList() {
        const isLogIn = localStorage.getItem("misoticket-isLogIn");

        if (isLogIn !== null) {
            if (isLogIn === "y") {
                const userId = localStorage.getItem("misoticket-userId")!;
                setProductOrderList(await fetchProductOrderListWithUserId(userId));
            } else {
                const noneUserId = localStorage.getItem("misoticket-noneUserId");
                if (noneUserId !== null) {
                    setProductOrderList(await fetchProductOrderListWithNoneUserId(noneUserId));
                }
            }
        } else {
            const noneUserId = localStorage.getItem("misoticket-noneUserId");
            if (noneUserId !== null) {
                setProductOrderList(await fetchProductOrderListWithNoneUserId(noneUserId));
            }
        }
    }

    function getProduct(id: string): Product {
        return productList.filter(prod => prod.id === id)[0];
    }

    function checkProductOrder(productOrder: ProductOrder) {
        const isExist = selectProductOrderList.filter(prodOrder => prodOrder.productId === productOrder.productId).length !== 0;

        if (isExist) {
            const index = selectProductOrderList.findIndex(prodOrder => prodOrder.productId === productOrder.productId);
            const newList = [...selectProductOrderList];
            newList.splice(index, 1);
            setSelectProductOrderList(newList);
        } else {
            const newList = [...selectProductOrderList];
            newList.push(productOrder);
            setSelectProductOrderList(newList);
        }
    }

    function moveToOrder(prodOrderList: ProductOrder[]) {
        if (prodOrderList.length === 0) {
            alert("주문하실 상품을 선택해주세요.");
        } else {
            let query = "";

            for (const po of prodOrderList) {
                query += `&prod_order=${po.productId}_${po.amount}`;
            }

            router.push(`/order?from=basket${query}`);
        }
    }

    async function updateProductOrderList() {
        const isLogIn = localStorage.getItem("misoticket-isLogIn");

        if (isLogIn !== null) {
            if (isLogIn === "y") {
                const userId = localStorage.getItem("misoticket-userId")!;
                await removeProductOrderListWithUserId(userId, selectProductOrderList);
                setProductOrderList(await fetchProductOrderListWithUserId(userId));
                setSelectProductOrderList([]);
            } else {
                const noneUserId = localStorage.getItem("misoticket-noneUserId");
                if (noneUserId !== null) {
                    await removeProductOrderListWithNoneUserId(noneUserId, selectProductOrderList);
                    setProductOrderList(await fetchProductOrderListWithNoneUserId(noneUserId));
                    setSelectProductOrderList([]);
                }
            }
        } else {
            const noneUserId = localStorage.getItem("misoticket-noneUserId");
            if (noneUserId !== null) {
                await removeProductOrderListWithNoneUserId(noneUserId, selectProductOrderList);
                setProductOrderList(await fetchProductOrderListWithNoneUserId(noneUserId));
                setSelectProductOrderList([]);
            }
        }
    }

    return (
        <>
            <MyHeader />
            <CategoryTabBar selectedCategoryId={null} />
            {
                isMobile ?
                    <div className="mt-40 px-4">
                        <div className="flex gap-2 mt-20">
                            <p className="font-semibold text-xs">1. 상품선택 (장바구니)</p>
                            <p className="font-semibold text-xs">&gt;</p>
                            <p className="font-medium text-xs text-gray-300">2. 주문서 작성</p>
                            <p className="font-medium text-xs text-gray-300">&gt;</p>
                            <p className="font-meium text-xs text-gray-300">3. 주문 완료</p>
                        </div>
                        <div className="border-l border-t border-r mt-4">
                            <div className="flex border-b">
                                <p className="font-medium text-xs px-3 w-12 border-r text-center py-2 bg-gray-100">선택</p>
                                <p className="font-medium text-xs px-3 border-r flex-1 py-2 bg-gray-100">상품명</p>
                                <p className="font-medium text-xs px-3 w-16 text-center py-2 bg-gray-100">수량</p>
                            </div>
                            {
                                productList.length > 0 && productOrderList.map((productOrder) => (
                                    <div className="flex border-b" key={productOrder.productId}>
                                        <div className="flex justify-center items-center w-12 border-r">
                                            <input type="checkbox" onChange={() => checkProductOrder(productOrder)} />
                                        </div>
                                        <p className="font-regular text-xs px-3 border-r flex-1 py-2">{getProduct(productOrder.productId).name}</p>
                                        <p className="font-regular text-xs px-3 w-16 text-center py-2">{productOrder.amount}</p>
                                    </div>
                                ))
                            }
                            {
                                productOrderList.length === 0 &&
                                    <p className="font-medium text-base text-gray-400 text-center mt-20 pb-20 border-b">장바구니가 비어 있습니다.</p>
                            }
                        </div>
                        <div className="h-10">
                            {
                                selectProductOrderList.length > 0 &&
                                    <button 
                                        className="px-4 py-1 border text-gray-600 font-medium text-xs hover:bg-gray-200 mt-4"
                                        onClick={() => updateProductOrderList()}
                                    >
                                        선택된 항목 삭제
                                    </button>
                            }
                        </div>
                        <div className="mt-8 flex justify-center gap-3">
                            <button 
                                className="px-6 py-2 border border-gray-400 font-medium text-base hover:bg-gray-200"
                                onClick={() => moveToOrder(selectProductOrderList)}
                            >
                                선택 주문하기
                            </button>
                            <button 
                                className="px-6 py-2 border bg-gray-800 text-white border-gray-400 font-medium text-base hover:opacity-70"
                                onClick={() => moveToOrder(productOrderList)}
                            >
                                전체 주문하기
                            </button>
                        </div>
                    </div> :
                    <div className="mt-48 px-56">
                        <div className="flex gap-5 mt-20">
                            <p className="font-semibold text-sm">1. 상품선택 (장바구니)</p>
                            <p className="font-semibold text-sm">&gt;</p>
                            <p className="font-medium text-sm text-gray-300">2. 주문서 작성</p>
                            <p className="font-medium text-sm text-gray-300">&gt;</p>
                            <p className="font-meium text-sm text-gray-300">3. 주문 완료</p>
                        </div>
                        <div className="border-l border-t border-r mt-4">
                            <div className="flex border-b">
                                <p className="font-medium text-sm px-3 w-20 border-r text-center py-2 bg-gray-100">선택</p>
                                <p className="font-medium text-sm px-3 border-r flex-1 py-2 bg-gray-100">상품명</p>
                                <p className="font-medium text-sm px-3 w-40 text-center py-2 bg-gray-100">수량</p>
                            </div>
                            {
                                productList.length > 0 && productOrderList.map((productOrder) => (
                                    <div className="flex border-b" key={productOrder.productId}>
                                        <div className="flex justify-center items-center w-20 border-r">
                                            <input type="checkbox" onChange={() => checkProductOrder(productOrder)} />
                                        </div>
                                        <p className="font-regular text-sm px-3 border-r flex-1 py-2">{getProduct(productOrder.productId).name}</p>
                                        <p className="font-regular text-sm px-3 w-40 text-center py-2">{productOrder.amount}</p>
                                    </div>
                                ))
                            }
                            {
                                productOrderList.length === 0 &&
                                    <p className="font-medium text-base text-gray-400 text-center mt-20 pb-20 border-b">장바구니가 비어 있습니다.</p>
                            }
                        </div>
                        <div className="h-10">
                            {
                                selectProductOrderList.length > 0 &&
                                    <button 
                                        className="px-4 py-1 border text-gray-600 font-medium text-xs hover:bg-gray-200 mt-4"
                                        onClick={() => updateProductOrderList()}
                                    >
                                        선택된 항목 삭제
                                    </button>
                            }
                        </div>
                        <div className="mt-8 flex justify-center gap-3">
                            <button 
                                className="px-6 py-2 border border-gray-400 font-medium text-base hover:bg-gray-200"
                                onClick={() => moveToOrder(selectProductOrderList)}
                            >
                                선택 주문하기
                            </button>
                            <button 
                                className="px-6 py-2 border bg-gray-800 text-white border-gray-400 font-medium text-base hover:opacity-70"
                                onClick={() => moveToOrder(productOrderList)}
                            >
                                전체 주문하기
                            </button>
                        </div>
                    </div>
            }
            <MyFooter />
        </>
    );
}