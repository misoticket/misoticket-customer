'use client';

import { searchUser } from "@/apis/FirestoreGET";
import CategoryTabBar from "@/components/CategoryTabBar";
import MyFooter from "@/components/MyFooter";
import MyHeader from "@/components/MyHeader";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Page() {
    const router = useRouter();

    const nameRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef1 = useRef<HTMLInputElement>(null);
    const phoneNumberRef2 = useRef<HTMLInputElement>(null);
    const phoneNumberRef3 = useRef<HTMLInputElement>(null);

    const [userId, setUserId] = useState<string>("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    async function logIn() {
        if (nameRef.current && phoneNumberRef1.current && phoneNumberRef2.current && phoneNumberRef3.current) {
            const name = nameRef.current.value;
            const phoneNumber1 = phoneNumberRef1.current.value;
            const phoneNumber2 = phoneNumberRef1.current.value;
            const phoneNumber3 = phoneNumberRef1.current.value;

            if (name.length === 0 || phoneNumber1.length === 0 || phoneNumber2.length === 0 || phoneNumber3.length === 0) {
                alert("항목을 모두 입력해주세요.");
            } else {
                const phoneNumber = phoneNumberRef1.current.value + "-" + phoneNumberRef2.current.value + "-" + phoneNumberRef3.current.value;
                const user = await searchUser(name, phoneNumber);

                if (user === null) {
                    alert("일치하는 정보가 없습니다.");
                } else {
                    setUserId(user.id);
                }
            }
        }
    }

    return (
        <>
            <div>
                <MyHeader />
                <CategoryTabBar selectedCategoryId={null} />
                <div className="flex justify-center items-center mt-56 flex-col">
                    <div className="w-80 p-6 bg-gray-100 border rounded-lg">
                        <p className="font-semibold text-base text-center">아이디 찾기</p>
                        <div className="mt-8">
                            <div className="mb-4">
                                <p className="font-medium text-sm w-20 mb-2">성함</p>
                                <input
                                    ref={nameRef}
                                    className="w-full h-10 bg-white rounded border px-3 text-sm font-medium"
                                />
                            </div>
                            <div className="mb-2">
                                <p className="font-medium text-sm w-20 mb-2">휴대폰번호</p>
                                <div className="flex gap-2 items-center">
                                    <input
                                        ref={phoneNumberRef1}
                                        className="w-16 h-10 bg-white rounded border px-3 text-sm font-medium"
                                    />
                                    <p className="font-medium text-lg">-</p>
                                    <input
                                        ref={phoneNumberRef2}
                                        className="w-16 h-10 bg-white rounded border px-3 text-sm font-medium"
                                    />
                                    <p className="font-medium text-lg">-</p>
                                    <input
                                        ref={phoneNumberRef3}
                                        className="w-16 h-10 bg-white rounded border px-3 text-sm font-medium"
                                    />
                                </div>
                            </div>
                            {
                                userId.length === 0 ?
                                    <button onClick={() => logIn()} className="w-full h-10 bg-gray-800 mt-6 rounded-lg text-white hover:opacity-80">검색하기</button>
                                :
                                    <div className="mt-16">
                                        <p className="font-regular text-sm text-gray-400 text-center mb-1">검색된 아이디입니다.</p>
                                        <p className="font-medium text-md text-black text-center">{userId}</p>
                                    </div>
                            }
                        </div>
                    </div>
                    <div className="w-80 mt-2 flex justify-end px-3">
                        <button onClick={() => router.push("/user/inquire_pw")} className="text-sm font-regular hover:opacity-60 text-gray-400">비밀번호 찾기</button>
                    </div>
                </div>
                <MyFooter />
            </div>
        </>
    );
}