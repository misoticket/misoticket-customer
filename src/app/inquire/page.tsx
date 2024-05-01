'use client';

import { fetchAllProductList, searchOrder} from "@/apis/FirestoreGET";
import CategoryTabBar from "@/components/CategoryTabBar";
import MyFooter from "@/components/MyFooter";
import MyHeader from "@/components/MyHeader";
import User from "@/models/User";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { fetchUser as fetchUserFromServer, fetchOrderList as fetchOrderListFromServer } from "@/apis/FirestoreGET";
import Order from "@/models/Order";
import { OrderStatus } from "../constants/OrderStatus";
import Product from "@/models/Product";

export default function Page() {
    const router = useRouter();

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const [isLogIn, setIsLogIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const [productList, setProductList] = useState<Product[]>([]);
    const [orderList, setOrderList] = useState<Order[]>([]);

    const personNameRef = useRef<HTMLInputElement>(null);
    const orderCodeRef = useRef<HTMLInputElement>(null);
    const orderPasswordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchUser();
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        fetchOrderList();
    }, [user]);

    async function fetchUser() {
        const isLogIn = localStorage.getItem("misoticket-isLogIn");

        if (isLogIn === "y") {
            setIsLogIn(true);

            const userId = localStorage.getItem("misoticket-userId");
            setUser(await fetchUserFromServer(userId!));
        }
    }

    async function fetchOrderList() {
        if (user) {
            setProductList(await fetchAllProductList());
            setOrderList(await fetchOrderListFromServer(user.id));
        }
    }

    async function search() {
        if (personNameRef.current && orderCodeRef.current && orderPasswordRef.current) {
            const personName = personNameRef.current.value;
            const orderCode = orderCodeRef.current.value;
            const orderPassword = orderPasswordRef.current.value;

            if (personName.trim().length === 0) {
                alert("주문자명을 입력해주세요.");
            } else if (orderCode.trim().length === 0) {
                alert("주문 코드를 입력해주세요.");
            } else if (orderPassword.trim().length === 0) {
                alert("주문 비밀번호를 입력해주세요.");
            } else {
                const order = await searchOrder(orderCode);
                if (order === null) {
                    alert("조회된 결과가 없습니다.");
                } else {
                    if (order.orderPassword !== orderPassword) {
                        alert("주문 비밀번호가 일치하지 않습니다.");
                    } else if (order.orderPersonName !== personName) {
                        alert("주문자명이 올바르지 않습니다.");
                    } else {
                        router.push(`/order/${order.id}`);
                    }
                }
            }
        }
    }

    function convertToUserInquire() {
        const isLogIn = localStorage.getItem("misoticket-isLogIn");
        if (isLogIn === "y") {
            setIsLogIn(true);
        } else {
            router.push("/user/log_in");
        }
    }

    function getProduct(productId: string): Product {
        return productList.filter(prod => prod.id === productId)[0];
    }

    function getTotalPrice(order: Order): number {
        let sum = 4000;

        for (const prod of order.productList) {
            sum += prod.amount*getProduct(prod.productId).price;
        }

        return sum;
    }

    return (
        <>
            <MyHeader />
            <CategoryTabBar selectedCategoryId={null} />
            {
                isMobile ?
                <div className="justify-center flex w-full mt-40 px-6">
                    <div className="w-full">
                        <p className="font-medium text-base border-black border-l-4 pl-2 mb-6">주문조회</p>
                        <div className="border rounded-lg p-5">
                            <p className="font-regular text-sm text-gray-400 mb-8">아래 정보를 입력해주세요.</p>
                            <div className="flex gap-3 items-center mb-3">
                                <p className="font-medium text-sm w-20">주문자명</p>
                                <input 
                                    className="flex-1 border font-medium text-sm h-8 px-3"
                                    ref={personNameRef}
                                />
                            </div>
                            <div className="flex gap-3 items-center mb-3">
                                <p className="font-medium text-sm w-20">주문 코드</p>
                                <input 
                                    className="flex-1 border font-medium text-sm h-8 px-3"
                                    ref={orderCodeRef}
                                />
                            </div>
                            <div className="flex gap-3 items-center">
                                <p className="font-medium text-sm w-20">주문 비밀번호</p>
                                <input 
                                    type="password"
                                    placeholder="4~12자"
                                    className="flex-1 border font-medium text-sm h-8 px-3"
                                    ref={orderPasswordRef}
                                />
                            </div>
                            <button
                                className="mt-16 bg-gray-900 w-full h-10 font-medium text-white rounded-lg hover:opacity-80"
                                onClick={() => search()}
                            >
                                검색하기
                            </button>
                        </div>
                    </div>
                </div> :
                <div className="justify-center flex w-full mt-56">

                    {
                        isLogIn ?
                            <div className="w-full mx-80">
                                <div className="flex justify-between items-center mb-6">
                                    <p className="font-medium text-base border-black border-l-4 pl-2">주문내역</p>
                                    <button 
                                        onClick={() => setIsLogIn(false)}
                                        className="font-medium text-sm bg-gray-200 rounded py-1 px-2 hover:opacity-70"
                                    >
                                        비회원 주문조회
                                    </button>
                                </div>
                                <div>
                                    {
                                        orderList.map((order) => (
                                            <div key={order.id} className="flex flex-col bg-gray-50 p-4 rounded-lg border mb-6">
                                                <p className="font-medium text-lg">주문코드 {order.id}</p>
                                                <p className="font-regular text-sm text-gray-400">{order.createdTime.toLocaleDateString() + " " + order.createdTime.toLocaleTimeString()}</p>
                                                {
                                                    order.status === OrderStatus.WAITING_PAYMENT &&
                                                        <div className="my-6">
                                                            <p className="font-medium text-base">주문이 완료되었습니다.</p>
                                                            <p className="font-medium text-sm text-gray-400 mt-1">배송을 준비하고 있어요.</p>
                                                        </div>
                                                }
                                                {
                                                    order.status === OrderStatus.PREPARE_DELIVERY &&
                                                        <div className="my-4">
                                                            <p className="font-medium text-base">결제가 완료되었습니다.</p>
                                                            <p className="font-medium text-sm text-gray-400 mt-1">배송을 준비하고 있어요.</p>
                                                        </div>
                                                }
                                                {
                                                    order.status === OrderStatus.DELIVERY_IN_PROGRESS &&
                                                        <div className="my-4">
                                                            <p className="font-medium text-base">배송이 진행중입니다.</p>
                                                            <p className="font-medium text-sm text-gray-400 mt-2">송장번호 { order && order.deliveryInvoiceNumber }</p>
                                                            <div className="mt-6">
                                                                <p className="font-medium text-xs text-center">{ order && order.address }</p>
                                                                <p className="font-medium text-xs text-center mt-1">{ order && order.addressDetail }</p>
                                                            </div>
                                                        </div>
                                                }
                                                {
                                                    order.status === OrderStatus.DELIVERY_DONE &&
                                                        <div className="my-4">
                                                            <p className="font-medium text-base">배송이 완료되었어요.</p>
                                                            <p className="font-medium text-sm text-gray-400 mt-2">송장번호 { order && order.deliveryInvoiceNumber }</p>
                                                            <div className="mt-6">
                                                                <p className="font-medium text-xs text-center">{ order && order.address }</p>
                                                                <p className="font-medium text-xs text-center mt-1">{ order && order.addressDetail }</p>
                                                            </div>
                                                        </div>
                                                }
                                                <div className="border-t mt-4 pt-4 gap-3">
                                                    <ul>
                                                        {
                                                            order.productList.map((prod) => (
                                                                <li key={order.id + "-" + prod.productId}>
                                                                    <div className="flex justify-between items-center mb-2">
                                                                        <div className="flex gap-3">
                                                                            <p className="font-medium text-xs">● { getProduct(prod.productId).name }</p>
                                                                            <p className="font-medium text-xs text-gray-400">x { prod.amount }개</p>
                                                                        </div>
                                                                        <p className="font-semibold text-xs mt-1 ml-4 text-theme">{ (getProduct(prod.productId).price * prod.amount).toLocaleString() }원</p>
                                                                    </div>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                    <div className="flex justify-between items-center">
                                                        <p className="font-medium text-xs">● 배송비</p>
                                                        <p className="font-semibold text-xs mt-1 ml-4 text-theme">{ (4000).toLocaleString() }원</p>
                                                    </div>
                                                    <div className="flex justify-between items-center mt-3 pt-3 border-t">
                                                        <p className="font-medium text-xs">● 총 금액</p>
                                                        <p className="font-semibold text-xs mt-1 ml-4 text-theme">{ (getTotalPrice(order)).toLocaleString() }원</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div> :
                            <div className="w-96">
                                <div className="flex justify-between mb-6 items-center">
                                    <p className="font-medium text-base border-black border-l-4 pl-2">주문조회</p>
                                    <button 
                                        onClick={() => convertToUserInquire()}
                                        className="font-medium text-sm bg-gray-200 rounded py-1 px-2 hover:opacity-70"
                                    >
                                        회원 주문조회
                                    </button>
                                </div>
                                <div className="border rounded-lg p-5">
                                    <p className="font-regular text-sm text-gray-400 mb-8">아래 정보를 입력해주세요.</p>
                                    <div className="flex gap-3 items-center mb-3">
                                        <p className="font-medium text-sm w-20">주문자명</p>
                                        <input 
                                            className="flex-1 border font-medium text-sm h-8 px-3"
                                            ref={personNameRef}
                                        />
                                    </div>
                                    <div className="flex gap-3 items-center mb-3">
                                        <p className="font-medium text-sm w-20">주문 코드</p>
                                        <input 
                                            className="flex-1 border font-medium text-sm h-8 px-3"
                                            ref={orderCodeRef}
                                        />
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <p className="font-medium text-sm w-20">주문 비밀번호</p>
                                        <input 
                                            type="password"
                                            placeholder="4~12자"
                                            className="flex-1 border font-medium text-sm h-8 px-3"
                                            ref={orderPasswordRef}
                                        />
                                    </div>
                                    <button
                                        className="mt-16 bg-gray-900 w-full h-10 font-medium text-white rounded-lg hover:opacity-80"
                                        onClick={() => search()}
                                    >
                                        검색하기
                                    </button>
                                </div>
                            </div>
                    }
                </div>
            }
            <MyFooter />
        </>
    );
}