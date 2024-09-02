"use client";

import { deleteOrder } from "@/apis/FirestoreDELETE";
import { fetchAllProductList, fetchOrder } from "@/apis/FirestoreGET";
import { OrderStatus } from "@/app/constants/OrderStatus";
import CategoryTabBar from "@/components/CategoryTabBar";
import MyFooter from "@/components/MyFooter";
import MyHeader from "@/components/MyHeader";
import DeleteOrderModal from "@/modals/DeleteOrderModal";
import UpdateAddressModal from "@/modals/UpdateAddressModal";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Page({ params }: { params: { orderId: string } }) {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const [order, setOrder] = useState<Order | null>(null);
    const [productList, setProductList] = useState<Product[]>([]);

    const deleteOrderDisclosure = useDisclosure();
    const updateAddressModal = useDisclosure();

    useEffect(() => {
        fetchData();
        window.scrollTo(0, 0);
    }, []);

    async function fetchData() {
        setProductList(await fetchAllProductList());
        setOrder(await fetchOrder(params.orderId));
    }

    function getProduct(productId: string): Product {
        return productList.filter((prod) => prod.id === productId)[0];
    }

    function getTotalPrice(order: Order): number {
        let amount = 0;

        for (const prodOrder of order.productList) {
            const product = productList.filter(
                (prod) => prod.id === prodOrder.productId
            )[0];
            const nowPrice = product.price * prodOrder.amount;
            amount += nowPrice;
        }

        return amount;
    }

    async function cancelOrder() {
        if (order !== null) {
            await deleteOrder(order.id);
            alert("주문이 취소되었습니다.");
            window.location.href = "/";
        }
    }

    return (
        <>
            <MyHeader />
            <CategoryTabBar selectedCategoryId={null} />
            {isMobile ? (
                <div className="mt-44 flex justify-center">
                    <div className="w-full px-8">
                        {order !== null && order.userId.length === 0 && (
                            <div className="bg-gray-100 px-4 py-4 rounded-lg mb-10">
                                <p className="font-medium text-xs mx-2 mb-1 text-gray-500">
                                    비회원 주문은 조회를 위해 주문번호가
                                    필요하기 때문에
                                </p>
                                <p className="font-medium text-xs mx-2 text-gray-500">
                                    기록해두시는걸 권장합니다.
                                </p>
                            </div>
                        )}
                        <p className="font-medium text-sm mx-2 mb-4 text-gray-400">
                            주문번호 {order && order.id}
                        </p>
                        <div className="bg-gray-100 px-6 py-6 rounded-lg flex justify-center flex-col">
                            {order && (
                                <>
                                    {order.status ===
                                        OrderStatus.WAITING_PAYMENT && (
                                        <div className="flex flex-col items-center">
                                            <p className="font-medium text-lg">
                                                주문이 완료되었습니다.
                                            </p>
                                            <p className="font-medium text-sm text-gray-400 mt-2">
                                                배송을 준비하고 있어요.
                                            </p>
                                        </div>
                                    )}
                                    {order.status ===
                                        OrderStatus.PREPARE_DELIVERY && (
                                        <div className="flex flex-col items-center">
                                            <p className="font-medium text-lg">
                                                결제가 완료되었습니다.
                                            </p>
                                            <p className="font-medium text-sm text-gray-400 mt-2">
                                                배송을 준비하고 있어요.
                                            </p>
                                        </div>
                                    )}
                                    {order.status ===
                                        OrderStatus.DELIVERY_IN_PROGRESS && (
                                        <div className="flex flex-col items-center">
                                            <p className="font-medium text-lg">
                                                배송이 진행중입니다.
                                            </p>
                                            <p className="font-medium text-sm text-gray-400 mt-2">
                                                송장번호{" "}
                                                {order &&
                                                    order.deliveryInvoiceNumber}
                                            </p>
                                        </div>
                                    )}
                                    {order.status ===
                                        OrderStatus.DELIVERY_DONE && (
                                        <div className="flex flex-col items-center">
                                            <p className="font-medium text-lg">
                                                배송이 완료되었어요.
                                            </p>
                                            <p className="font-medium text-sm text-gray-400 mt-2">
                                                송장번호{" "}
                                                {order &&
                                                    order.deliveryInvoiceNumber}
                                            </p>
                                        </div>
                                    )}
                                    {order.status === OrderStatus.CANCELLED && (
                                        <div className="flex flex-col items-center">
                                            <p className="font-medium text-lg text-red-500">
                                                주문이 취소되었어요.
                                            </p>
                                            <p className="font-medium text-xs text-gray-500 mt-2 leading-5 text-center">
                                                유가증권은 주문 후 1일동안
                                                입금이 안될 시 주문이
                                                취소됩니다. 시세변동이 있음으로
                                                다시 주문해주시기 바랍니다.
                                            </p>
                                        </div>
                                    )}
                                    <div className="bg-gray-200 rounded p-2 mt-8">
                                        <div className="flex justify-between items-center">
                                            <p className="font-medium text-xs mb-4">
                                                배송지 정보
                                            </p>
                                            {((order &&
                                                order.status ===
                                                    OrderStatus.WAITING_PAYMENT) ||
                                                order.status ===
                                                    OrderStatus.PREPARE_DELIVERY) && (
                                                <button
                                                    onClick={() => {
                                                        updateAddressModal.onOpen();
                                                    }}
                                                    className="font-medium text-xs text-gray-500 bg-gray-300 px-3 py-1 rounded mb-2"
                                                >
                                                    변경
                                                </button>
                                            )}
                                        </div>
                                        <p className="font-regular text-xs">
                                            {order.address}
                                        </p>
                                        <p className="font-regular text-xs">
                                            {order.addressDetail}
                                        </p>
                                    </div>
                                </>
                            )}
                            <div className="border-t mt-8 pt-8 pb-4 gap-3">
                                <ul>
                                    {order &&
                                        order.productList.map((prod) => (
                                            <li key={prod.productId}>
                                                <div className="flex justify-between items-center mb-2">
                                                    <div className="flex gap-3">
                                                        <p className="font-medium text-xs">
                                                            ●{" "}
                                                            {
                                                                getProduct(
                                                                    prod.productId
                                                                ).name
                                                            }
                                                        </p>
                                                        <p className="font-medium text-xs text-gray-400">
                                                            x {prod.amount}개
                                                        </p>
                                                    </div>
                                                    <p className="font-semibold text-xs mt-1 ml-4 text-theme">
                                                        {(
                                                            getProduct(
                                                                prod.productId
                                                            ).price *
                                                            prod.amount
                                                        ).toLocaleString()}
                                                        원
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                </ul>
                                <div className="flex justify-between items-center">
                                    <p className="font-medium text-xs">
                                        ● 배송비
                                    </p>
                                    <p className="font-semibold text-xs mt-1 ml-4 text-theme">
                                        {(4000).toLocaleString()}원
                                    </p>
                                </div>
                            </div>
                            <div className="border-t flex gap-3 mt-3 pt-12 justify-end items-center">
                                <p className="font-medium text-sm">총</p>
                                <p className="font-semibold text-xl text-theme">
                                    {order &&
                                        (
                                            getTotalPrice(order) + 4000
                                        ).toLocaleString()}
                                    원
                                </p>
                            </div>
                        </div>
                        <div className="mt-10 flex flex-col items-center gap-4">
                            <div className="flex">
                                <div className="bg-gray-100 rounded px-4 py-2">
                                    <p className="font-medium text-gray-400 text-xs">
                                        💡 주문은 입금확인 전까지만 취소할 수
                                        있습니다.
                                    </p>
                                </div>
                            </div>
                            {order &&
                                order.status ===
                                    OrderStatus.WAITING_PAYMENT && (
                                    <button
                                        className="font-medium text-red-500 text-sm"
                                        onClick={() =>
                                            deleteOrderDisclosure.onOpen()
                                        }
                                    >
                                        주문 취소
                                    </button>
                                )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mt-56 flex justify-center">
                    <div className="w-96">
                        {order !== null && order.userId.length === 0 && (
                            <div className="bg-gray-100 px-4 py-4 rounded-lg mb-10">
                                <p className="font-medium text-xs mx-2 mb-1 text-gray-500">
                                    비회원 주문은 조회를 위해 주문번호가
                                    필요하기 때문에
                                </p>
                                <p className="font-medium text-xs mx-2 text-gray-500">
                                    기록해두시는걸 권장합니다.
                                </p>
                            </div>
                        )}
                        <p className="font-medium text-sm mx-2 mb-4 text-gray-400">
                            주문번호 {order && order.id}
                        </p>
                        <div className="bg-gray-100 px-6 py-6 rounded-lg flex justify-center flex-col">
                            {order && (
                                <>
                                    {order.status ===
                                        OrderStatus.WAITING_PAYMENT && (
                                        <div className="flex flex-col items-center">
                                            <p className="font-medium text-lg">
                                                주문이 완료되었습니다.
                                            </p>
                                            <p className="font-medium text-sm text-gray-400 mt-2">
                                                배송을 준비하고 있어요.
                                            </p>
                                        </div>
                                    )}
                                    {order.status ===
                                        OrderStatus.PREPARE_DELIVERY && (
                                        <div className="flex flex-col items-center">
                                            <p className="font-medium text-lg">
                                                결제가 완료되었습니다.
                                            </p>
                                            <p className="font-medium text-sm text-gray-400 mt-2">
                                                배송을 준비하고 있어요.
                                            </p>
                                        </div>
                                    )}
                                    {order.status ===
                                        OrderStatus.DELIVERY_IN_PROGRESS && (
                                        <div className="flex flex-col items-center">
                                            <p className="font-medium text-lg">
                                                배송이 진행중입니다.
                                            </p>
                                            <p className="font-medium text-sm text-gray-400 mt-2">
                                                송장번호{" "}
                                                {order &&
                                                    order.deliveryInvoiceNumber}
                                            </p>
                                        </div>
                                    )}
                                    {order.status ===
                                        OrderStatus.DELIVERY_DONE && (
                                        <div className="flex flex-col items-center">
                                            <p className="font-medium text-lg">
                                                배송이 완료되었어요.
                                            </p>
                                            <p className="font-medium text-sm text-gray-400 mt-2">
                                                송장번호{" "}
                                                {order &&
                                                    order.deliveryInvoiceNumber}
                                            </p>
                                        </div>
                                    )}
                                    {order.status === OrderStatus.CANCELLED && (
                                        <div className="flex flex-col items-center">
                                            <p className="font-medium text-lg text-red-500">
                                                주문이 취소되었어요.
                                            </p>
                                            <p className="font-medium text-xs text-gray-500 mt-2 leading-5 text-center">
                                                유가증권은 주문 후 1일동안
                                                입금이 안될 시 주문이
                                                취소됩니다. <br />
                                                시세변동이 있음으로 다시
                                                주문해주시기 바랍니다.
                                            </p>
                                        </div>
                                    )}
                                    <div className="bg-gray-200 rounded p-2 mt-8">
                                        <div className="flex justify-between items-center">
                                            <p className="font-medium text-xs mb-4">
                                                배송지 정보
                                            </p>
                                            {((order &&
                                                order.status ===
                                                    OrderStatus.WAITING_PAYMENT) ||
                                                order.status ===
                                                    OrderStatus.PREPARE_DELIVERY) && (
                                                <button
                                                    onClick={() => {
                                                        updateAddressModal.onOpen();
                                                    }}
                                                    className="font-medium text-xs text-gray-500 bg-gray-300 px-3 py-1 rounded mb-2"
                                                >
                                                    변경
                                                </button>
                                            )}
                                        </div>
                                        <p className="font-regular text-xs">
                                            {order.address}
                                        </p>
                                        <p className="font-regular text-xs">
                                            {order.addressDetail}
                                        </p>
                                    </div>
                                </>
                            )}
                            <div className="border-t mt-8 pt-8 pb-4 gap-3">
                                <ul>
                                    {order &&
                                        order.productList.map((prod) => (
                                            <li key={prod.productId}>
                                                <div className="flex justify-between mb-3">
                                                    <div className="flex gap-3">
                                                        <p className="font-medium text-sm">
                                                            ●{" "}
                                                            {
                                                                getProduct(
                                                                    prod.productId
                                                                ).name
                                                            }
                                                        </p>
                                                        <p className="font-medium text-sm text-gray-400">
                                                            x {prod.amount}개
                                                        </p>
                                                    </div>
                                                    <p className="font-semibold text-xs mt-1 ml-4 text-theme">
                                                        {(
                                                            getProduct(
                                                                prod.productId
                                                            ).price *
                                                            prod.amount
                                                        ).toLocaleString()}
                                                        원
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                </ul>
                                <div className="flex justify-between items-center mt-3">
                                    <p className="font-medium text-sm">
                                        ● 배송비
                                    </p>
                                    <p className="font-semibold text-xs mt-1 ml-4 text-theme">
                                        {(4000).toLocaleString()}원
                                    </p>
                                </div>
                            </div>
                            <div className="border-t flex gap-3 mt-3 pt-12 justify-end">
                                <p className="font-medium text-sm">총</p>
                                <p className="font-semibold text-sm text-theme">
                                    {order &&
                                        (
                                            getTotalPrice(order) + 4000
                                        ).toLocaleString()}
                                    원
                                </p>
                            </div>
                        </div>
                        <div className="mt-10 flex flex-col items-center gap-4">
                            <div className="flex">
                                <div className="bg-gray-100 rounded px-4 py-2">
                                    <p className="font-medium text-gray-400 text-xs">
                                        💡 주문은 입금확인 전까지만 취소할 수
                                        있습니다.
                                    </p>
                                </div>
                            </div>
                            {order &&
                                order.status ===
                                    OrderStatus.WAITING_PAYMENT && (
                                    <button
                                        className="font-medium text-red-500 text-sm"
                                        onClick={() =>
                                            deleteOrderDisclosure.onOpen()
                                        }
                                    >
                                        주문 취소
                                    </button>
                                )}
                        </div>
                    </div>
                </div>
            )}
            <DeleteOrderModal
                isOpen={deleteOrderDisclosure.isOpen}
                onOpenChange={deleteOrderDisclosure.onOpenChange}
                handleDelete={() => cancelOrder()}
            />
            <UpdateAddressModal
                order={order}
                isOpen={updateAddressModal.isOpen}
                onOpenChange={updateAddressModal.onOpenChange}
                handleDone={() => window.location.reload()}
            />
            <MyFooter />
        </>
    );
}
