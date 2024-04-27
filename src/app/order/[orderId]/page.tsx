'use client';

import { fetchAllProductList, fetchOrder } from "@/apis/FirestoreGET";
import { OrderStatus } from "@/app/constants/OrderStatus";
import CategoryTabBar from "@/components/CategoryTabBar";
import MyFooter from "@/components/MyFooter";
import MyHeader from "@/components/MyHeader";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Page({ params }: { params: { orderId: string } }) {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [order, setOrder] = useState<Order | null>(null);
    const [productList, setProductList] = useState<Product[]>([]);

    useEffect(() => {
        fetchData();
        window.scrollTo(0, 0);
    }, []);

    async function fetchData() {
        setProductList(await fetchAllProductList());
        setOrder(await fetchOrder(params.orderId));
    }

    function getProduct(productId: string): Product {
        return productList.filter(prod => prod.id === productId)[0];
    }

    function getTotalPrice(order: Order): number {
        let amount = 0;

        for (const prodOrder of order.productList) {
            const product = productList.filter(prod => prod.id === prodOrder.productId)[0];
            const nowPrice = product.price * prodOrder.amount;
            amount += nowPrice;
        }

        return amount;
    }

    return (
        <>
            <MyHeader />
            <CategoryTabBar selectedCategoryId={null} />
            {
                isMobile ?
                    <div className="mt-44 flex justify-center">
                        <div className="w-full px-8">
                            <p className="font-medium text-xs mx-2 mb-4 text-gray-400">주문코드 { order && order.id }</p>
                            <div className="bg-gray-100 px-6 py-6 rounded-lg flex justify-center flex-col">
                                {
                                    order &&
                                        <>
                                            {
                                                order.status === OrderStatus.WAITING_PAYMENT &&
                                                    <div className="flex flex-col items-center">
                                                        <p className="font-medium text-lg">주문이 완료되었습니다.</p>
                                                        <p className="font-medium text-sm text-gray-400 mt-2">배송을 준비하고 있어요.</p>
                                                    </div>
                                            }
                                            {
                                                order.status === OrderStatus.PREPARE_DELIVERY &&
                                                    <div className="flex flex-col items-center">
                                                        <p className="font-medium text-lg">결제가 완료되었습니다.</p>
                                                        <p className="font-medium text-sm text-gray-400 mt-2">배송을 준비하고 있어요.</p>
                                                    </div>
                                            }
                                            {
                                                order.status === OrderStatus.DELIVERY_IN_PROGRESS &&
                                                    <div className="flex flex-col items-center">
                                                        <p className="font-medium text-lg">배송이 진행중입니다.</p>
                                                        <p className="font-medium text-sm text-gray-400 mt-2">송장번호 { order && order.deliveryInvoiceNumber }</p>
                                                        <div className="mt-6">
                                                            <p className="font-medium text-xs text-center">{ order && order.address }</p>
                                                            <p className="font-medium text-xs text-center mt-1">{ order && order.addressDetail }</p>
                                                        </div>
                                                    </div>
                                            }
                                            {
                                                order.status === OrderStatus.DELIVERY_DONE &&
                                                    <div className="flex flex-col items-center">
                                                        <p className="font-medium text-lg">배송이 완료되었어요.</p>
                                                        <p className="font-medium text-sm text-gray-400 mt-2">송장번호 { order && order.deliveryInvoiceNumber }</p>
                                                        <div className="mt-6">
                                                            <p className="font-medium text-xs text-center">{ order && order.address }</p>
                                                            <p className="font-medium text-xs text-center mt-1">{ order && order.addressDetail }</p>
                                                        </div>
                                                    </div>
                                            }
                                        </>
                                }
                                <div className="border-t mt-8 pt-8 pb-4 gap-3">
                                    <ul>
                                        {
                                            order && order.productList.map((prod) => (
                                                <li key={prod.productId}>
                                                    <div className="flex justify-between items-center">
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
                                </div>
                                <div className="border-t flex gap-3 mt-3 pt-12 justify-end">
                                    <p className="font-medium text-sm">총</p>
                                    <p className="font-semibold text-xl text-theme">{ order && getTotalPrice(order).toLocaleString() }원</p>
                                </div>
                            </div>
                        </div>
                    </div> :
                    <div className="mt-56 flex justify-center">
                        <div className="w-96">
                            <p className="font-medium text-xs mx-2 mb-4 text-gray-400">주문코드 { order && order.id }</p>
                            <div className="bg-gray-100 px-6 py-6 rounded-lg flex justify-center flex-col">
                                {
                                    order &&
                                        <>
                                            {
                                                order.status === OrderStatus.WAITING_PAYMENT &&
                                                    <div className="flex flex-col items-center">
                                                        <p className="font-medium text-lg">주문이 완료되었습니다.</p>
                                                        <p className="font-medium text-sm text-gray-400 mt-2">배송을 준비하고 있어요.</p>
                                                    </div>
                                            }
                                            {
                                                order.status === OrderStatus.PREPARE_DELIVERY &&
                                                    <div className="flex flex-col items-center">
                                                        <p className="font-medium text-lg">결제가 완료되었습니다.</p>
                                                        <p className="font-medium text-sm text-gray-400 mt-2">배송을 준비하고 있어요.</p>
                                                    </div>
                                            }
                                            {
                                                order.status === OrderStatus.DELIVERY_IN_PROGRESS &&
                                                    <div className="flex flex-col items-center">
                                                        <p className="font-medium text-lg">배송이 진행중입니다.</p>
                                                        <p className="font-medium text-sm text-gray-400 mt-2">송장번호 { order && order.deliveryInvoiceNumber }</p>
                                                        <div className="mt-6">
                                                            <p className="font-medium text-xs text-center">{ order && order.address }</p>
                                                            <p className="font-medium text-xs text-center mt-1">{ order && order.addressDetail }</p>
                                                        </div>
                                                    </div>
                                            }
                                            {
                                                order.status === OrderStatus.DELIVERY_DONE &&
                                                    <div className="flex flex-col items-center">
                                                        <p className="font-medium text-lg">배송이 완료되었어요.</p>
                                                        <p className="font-medium text-sm text-gray-400 mt-2">송장번호 { order && order.deliveryInvoiceNumber }</p>
                                                        <div className="mt-6">
                                                            <p className="font-medium text-xs text-center">{ order && order.address }</p>
                                                            <p className="font-medium text-xs text-center mt-1">{ order && order.addressDetail }</p>
                                                        </div>
                                                    </div>
                                            }
                                        </>
                                }
                                <div className="border-t mt-8 pt-8 pb-4 gap-3">
                                    <ul>
                                        {
                                            order && order.productList.map((prod) => (
                                                <li key={prod.productId}>
                                                    <div className="flex justify-between">
                                                        <div className="flex gap-3">
                                                            <p className="font-medium text-sm">● { getProduct(prod.productId).name }</p>
                                                            <p className="font-medium text-sm text-gray-400">x { prod.amount }개</p>
                                                        </div>
                                                        <p className="font-semibold text-xs mt-1 ml-4 text-theme">{ (getProduct(prod.productId).price * prod.amount).toLocaleString() }원</p>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                <div className="border-t flex gap-3 mt-3 pt-12 justify-end">
                                    <p className="font-medium text-sm">총</p>
                                    <p className="font-semibold text-sm text-theme">{ order && getTotalPrice(order).toLocaleString() }원</p>
                                </div>
                            </div>
                        </div>
                    </div>
            }
            <MyFooter />
        </>
    );
}