"use client";

import { logIn as logInToServer } from "@/apis/FirestoreGET";
import { changePassword } from "@/apis/FirestorePOST";
import CategoryTabBar from "@/components/CategoryTabBar";
import MyFooter from "@/components/MyFooter";
import MyHeader from "@/components/MyHeader";
import SetNewPasswordModal from "@/modals/SetNewPasswordModal";
import { useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useEffect, useRef } from "react";

export default function Page() {
    const router = useRouter();

    const idRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);

    const newPasswordDisclosure = useDisclosure();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleEmailKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            pwRef.current?.focus();
        }
    };

    const handlePasswordKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            logIn();
        }
    };

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
                const user = await logInToServer(id);
                if (user !== null) {
                    if (user.isOriginalUser === true) {
                        newPasswordDisclosure.onOpen();
                    } else {
                        if (user.pw !== pw) {
                            alert("비밀번호가 올바르지 않습니다.");
                        } else {
                            localStorage.setItem("misoticket-isLogIn", "y");
                            localStorage.setItem("misoticket-userId", id);
                            localStorage.setItem(
                                "misoticket-userName",
                                user.name
                            );
                            router.push("/");
                        }
                    }
                } else {
                    alert("로그인 정보가 올바르지 않습니다.");
                }
            }
        }
    }

    async function setNewPassword(newPassword: string) {
        newPasswordDisclosure.onClose();

        if (idRef.current) {
            const id = idRef.current.value;
            const user = await changePassword(id, newPassword);

            if (user) {
                localStorage.setItem("misoticket-isLogIn", "y");
                localStorage.setItem("misoticket-userId", id);
                localStorage.setItem("misoticket-userName", user.name);
                router.push("/");
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
                        <p className="font-semibold text-base text-center">
                            로그인
                        </p>
                        <div className="mt-8">
                            <div className="mb-4">
                                <p className="font-medium text-sm w-20 mb-2">
                                    아이디
                                </p>
                                <input
                                    onKeyDown={handleEmailKeyPress}
                                    ref={idRef}
                                    className="w-full h-10 bg-white rounded border px-3 text-sm font-medium"
                                />
                            </div>
                            <div className="mb-2">
                                <p className="font-medium text-sm w-20 mb-2">
                                    비밀번호
                                </p>
                                <input
                                    onKeyDown={handlePasswordKeyPress}
                                    ref={pwRef}
                                    type="password"
                                    className="w-full h-10 bg-white rounded border px-3 text-sm font-medium"
                                />
                            </div>
                            <button
                                onClick={() => logIn()}
                                className="w-full h-10 bg-gray-800 mt-6 rounded-lg text-white hover:opacity-80"
                            >
                                로그인
                            </button>
                        </div>
                    </div>
                    <div className="w-80 mt-2 flex justify-between px-3">
                        <button
                            onClick={() => router.push("/user/inquire_id")}
                            className="text-sm font-regular hover:opacity-60 text-gray-400"
                        >
                            아이디 / 비밀번호 찾기
                        </button>
                        <button
                            onClick={() => router.push("/user/sign_up")}
                            className="text-sm font-regular hover:opacity-60 text-gray-400"
                        >
                            회원가입
                        </button>
                    </div>
                </div>
                <SetNewPasswordModal
                    isOpen={newPasswordDisclosure.isOpen}
                    onOpenChange={newPasswordDisclosure.onOpenChange}
                    handleDone={(newPassword) => setNewPassword(newPassword)}
                />
                <MyFooter isShow={true} />
            </div>
        </>
    );
}
