'use client';

import CategoryTabBar from "@/components/CategoryTabBar";
import MyFooter from "@/components/MyFooter";
import MyHeader from "@/components/MyHeader";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { logIn as logInToServer } from "@/apis/FirestoreGET";

export default function Page() {
    const router = useRouter();

    const idRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);

    async function logIn() {
        if (idRef.current && pwRef.current) {
            const id = idRef.current.value;
            const pw = pwRef.current.value;

            if (id.length === 0 || pw.length === 0) {
                alert("항목을 모두 입력해주세요.");
            } else if (id.length < 4 || id.length > 12) {
                alert("아이디는 4~12 글자입니다.");
            } else if (pw.length < 6 || pw.length > 20) {
                alert("비밀번호는 6~20 글자입니다.");
            } else {
                const isLogInSuccess = await logInToServer(id, pw);
                if (isLogInSuccess) {
                    localStorage.setItem("misoticket-isLogIn", "y");
                    localStorage.setItem("misoticket-userId", id);
                    router.push("/");
                } else {
                    alert("로그인 정보가 올바르지 않습니다.");
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
                        <p className="font-semibold text-base text-center">로그인</p>
                        <div className="mt-8">
                            <div className="mb-4">
                                <p className="font-medium text-sm w-20 mb-2">아이디</p>
                                <input
                                    ref={idRef}
                                    className="w-full h-10 bg-white rounded border px-3 text-sm font-medium"
                                />
                            </div>
                            <div className="mb-2">
                                <p className="font-medium text-sm w-20 mb-2">비밀번호</p>
                                <input
                                    ref={pwRef}
                                    type="password"
                                    className="w-full h-10 bg-white rounded border px-3 text-sm font-medium"
                                />
                            </div>
                            <button onClick={() => logIn()} className="w-full h-10 bg-gray-800 mt-6 rounded-lg text-white hover:opacity-80">로그인</button>
                        </div>
                    </div>
                    <div className="w-80 mt-2 flex justify-end px-3">
                        <button onClick={() => router.push("/user/sign_up")} className="text-sm font-medium hover:opacity-60 text-gray-400">회원가입</button>
                    </div>
                </div>
                <MyFooter />
            </div>
        </>
    );
}