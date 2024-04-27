'use client';

import { searchOrderList } from "@/apis/FirestoreGET";
import CategoryTabBar from "@/components/CategoryTabBar";
import MyFooter from "@/components/MyFooter";
import MyHeader from "@/components/MyHeader";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Page() {
    const router = useRouter();

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const personNameRef = useRef<HTMLInputElement>(null);
    const personPhoneNumberRef = useRef<HTMLInputElement>(null);
    const orderPasswordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    async function search() {
        if (personNameRef.current && personPhoneNumberRef.current && orderPasswordRef.current) {
            const personName = personNameRef.current.value;
            const personPhoneNumber = personPhoneNumberRef.current.value;
            const orderPassword = orderPasswordRef.current.value;

            if (personName.trim().length === 0) {
                alert("주문자명을 입력해주세요.");
            } else if (personPhoneNumber.trim().length === 0) {
                alert("휴대폰 번호를 입력해주세요.");
            } else if (orderPassword.trim().length === 0) {
                alert("주문 비밀번호를 입력해주세요.");
            } else {
                const orderList = await searchOrderList(personName);
                const myOrder = orderList.filter(od => od.orderPhoneNumber === personPhoneNumber && od.orderPassword === orderPassword);

                if (myOrder.length === 0) {
                    if (orderList.filter(od => od.orderPhoneNumber === personPhoneNumber).length > 0) {
                        alert("주문 비밀번호가 일치하지 않습니다.");
                    } else {
                        alert("조회된 결과가 없습니다.");
                    }
                } else {
                    router.push(`/order/${myOrder[0].id}`);
                }
            }
        }
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
                                <p className="font-medium text-sm w-20">휴대폰번호</p>
                                <input 
                                    placeholder="숫자만 입력해주세요."
                                    type="number"
                                    className="flex-1 border font-medium text-sm h-8 px-3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    ref={personPhoneNumberRef}
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
                    <div className="w-96">
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
                                <p className="font-medium text-sm w-20">휴대폰번호</p>
                                <input 
                                    placeholder="숫자만 입력해주세요."
                                    type="number"
                                    className="flex-1 border font-medium text-sm h-8 px-3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    ref={personPhoneNumberRef}
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
                </div>
            }
            <MyFooter />
        </>
    );
}