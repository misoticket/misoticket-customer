'use client';

import { checkUserExist } from "@/apis/FirestoreGET";
import { makeUser } from "@/apis/FirestorePOST";
import CategoryTabBar from "@/components/CategoryTabBar";
import MyFooter from "@/components/MyFooter";
import MyHeader from "@/components/MyHeader";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Page() {
    const router = useRouter();

    const idRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);
    const pwConfirmRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef1 = useRef<HTMLInputElement>(null);
    const phoneNumberRef2 = useRef<HTMLInputElement>(null);
    const phoneNumberRef3 = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    async function signUp() {
        if (idRef.current && pwRef.current && pwConfirmRef.current && nameRef.current && phoneNumberRef1.current && phoneNumberRef2.current && phoneNumberRef3.current && emailRef.current) {
            const id = idRef.current.value;
            const pw = pwRef.current.value;
            const pwConfirm = pwConfirmRef.current.value;
            const name = nameRef.current.value;
            const phoneNumber = phoneNumberRef1.current.value + phoneNumberRef2.current.value + phoneNumberRef3.current.value;
            const email = emailRef.current.value;

            if (id.length === 0 || pw.length === 0 || pwConfirm.length === 0 || phoneNumber.length === 0 || email.length === 0) {
                alert("항목을 모두 입력해주세요.");
            } else if (id.length < 4 || id.length > 12) {
                alert("아이디는 4~12 글자입니다.");
            } else if (pw.length < 6 || pw.length > 20) {
                alert("비밀번호는 6~20 글자입니다.");
            } else if (pw !== pwConfirm) {
                alert("비밀번호가 일치하지 않습니다.");
            } else {
                if (await checkUserExist(id)) {
                    alert("이미 존재하는 아이디입니다.");
                } else {
                    await makeUser(id, pw, name, phoneNumber, email);
                    localStorage.setItem("misoticket-isLogIn", "y");
                    localStorage.setItem("misoticket-userId", id);

                    alert("회원가입이 완료되었습니다.");

                    router.push("/");
                }
            }
        }
    }

    return (
        <>
            <div>
                <MyHeader />
                <CategoryTabBar selectedCategoryId={null} />
                <div className="flex justify-center items-center mt-40 flex-col">
                    <div className="w-96 p-6 bg-gray-100 border rounded-lg">
                        <p className="font-semibold text-base text-center">회원가입</p>
                        <p className="font-medium text-sm text-center text-gray-400 mt-1">환영합니다! 아래 정보를 입력해주세요.</p>
                        <div className="mt-8">
                            <div className="mb-6">
                                <p className="font-medium text-sm w-24 mb-2">아이디</p>
                                <input
                                    ref={idRef}
                                    placeholder="4~12 글자"
                                    className="w-full h-10 bg-white rounded border px-3 text-sm font-medium"
                                />
                            </div>
                            <div className="mb-6">
                                <p className="font-medium text-sm w-24 mb-2">비밀번호</p>
                                <input
                                    ref={pwRef}
                                    placeholder="6~20 글자"
                                    type="password"
                                    className="w-full h-10 bg-white rounded border px-3 text-sm font-medium"
                                />
                            </div>
                            <div className="mb-6">
                                <p className="font-medium text-sm w-24 mb-2">비밀번호 확인</p>
                                <input
                                    ref={pwConfirmRef}
                                    type="password"
                                    className="w-full h-10 bg-white rounded border px-3 text-sm font-medium"
                                />
                            </div>
                            <div className="mb-6">
                                <p className="font-medium text-sm w-24 mb-2">성함</p>
                                <input
                                    ref={nameRef}
                                    className="w-full h-10 bg-white rounded border px-3 text-sm font-medium"
                                />
                            </div>
                            <div className="mb-6">
                                <p className="font-medium text-sm w-24 mb-2">휴대폰 번호</p>
                                <div className="flex items-center gap-2">
                                    <input
                                        ref={phoneNumberRef1}
                                        type="number"
                                        className="flex-1 h-10 bg-white rounded border px-2 text-sm font-medium w-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <p className="font-semibold font-sm">-</p>
                                    <input
                                        ref={phoneNumberRef2}
                                        type="number"
                                        className="flex-1 h-10 bg-white rounded border px-2 text-sm font-medium w-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <p className="font-semibold font-sm">-</p>
                                    <input
                                        ref={phoneNumberRef3}
                                        type="number"
                                        className="flex-1 h-10 bg-white rounded border px-2 text-sm font-medium w-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <p className="font-medium text-sm w-24 mb-2">이메일</p>
                                <input
                                    ref={emailRef}
                                    className="w-full h-10 bg-white rounded border px-3 text-sm font-medium"
                                />
                            </div>
                            <button onClick={() => signUp()} className="w-full h-10 bg-gray-800 mt-6 rounded-lg text-white hover:opacity-80">가입하기</button>
                        </div>
                    </div>
                </div>
                <MyFooter />
            </div>
        </>
    );
}