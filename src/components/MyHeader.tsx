'use client';

import Image from "next/image";
import logoImg from "@/../public/images/logo.png";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import giftCardImg from "@/../public/images/giftCardGradient.png";

export default function MyHeader() {
    const router = useRouter();

    const [isMobile, setIsMobile] = useState(false);
    const [isLogIn, setIsLogIn] = useState(false);

    useEffect(() => {
        checkIsMobile();
        checkIsLogIn();
    }, []);

    function checkIsMobile() {
        if (window.innerWidth < 576) {
            setIsMobile(true);
        }
    }

    function checkIsLogIn() {
        const ili = localStorage.getItem("misoticket-isLogIn");

        if (ili === null) {
            setIsLogIn(false);
        } else {
            setIsLogIn(ili === "y");
        }
    }

    function logInAction() {
        if (isLogIn) {
            localStorage.setItem("misoticket-isLogIn", "n");
            setIsLogIn(false);
        } else {
            router.push("/user/log_in");
        }
    }

    return (
        <>
            {
                isMobile ?
                    <div className="w-full fixed bg-white left-0 right-0 top-0 z-10">
                        <div className="mx-4 py-3 flex justify-between items-center">
                            <Image onClick={() => router.push("/")} src={logoImg} alt="" width={70} className="cursor-pointer" />
                            <div className="flex items-center gap-4">
                                {/* <p className="font-medium text-sm cursor-pointer hover:opacity-50" onClick={() => router.push("/inquire")}>{`${isLogIn ? "로그아웃" : "로그인"}`}</p> */}
                                <p className="font-medium text-sm cursor-pointer hover:opacity-50" onClick={() => router.push("/inquire")}>주문조회</p>
                                <div
                                    onClick={() => router.push("/market")}
                                    className="bg-gray-200 rounded-lg relative w-28 h-8 cursor-pointer hover:opacity-70"
                                >
                                    <Image
                                        className="w-full h-full rounded-lg"
                                        src={giftCardImg}
                                        alt=""
                                    />
                                    <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                                        <p
                                            className="font-semibold text-sm text-white"
                                        >
                                            상품권 시세보기
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-0.5 bg-gray-200"></div>
                    </div> :
                    <div className="w-full fixed bg-white left-0 right-0 top-0 z-10">
                        <div className="mx-10 py-3 flex justify-between items-center">
                            <Image onClick={() => router.push("/")} src={logoImg} alt="" width={120} className="cursor-pointer" />
                            <div className="flex items-center gap-6">
                                <p className="font-medium text-sm cursor-pointer hover:opacity-50" onClick={() => logInAction()}>{`${isLogIn ? "로그아웃" : "로그인"}`}</p>
                                <p className="font-medium text-sm cursor-pointer hover:opacity-50" onClick={() => router.push("/qna")}>Q&A</p>
                                <p className="font-medium text-sm cursor-pointer hover:opacity-50" onClick={() => router.push("/inquire")}>주문조회</p>
                                <div
                                    onClick={() => router.push("/market")}
                                    className="bg-gray-200 rounded-lg relative w-28 h-8 cursor-pointer hover:opacity-70"
                                >
                                    <Image
                                        className="w-full h-full rounded-lg"
                                        src={giftCardImg}
                                        alt=""
                                    />
                                    <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                                        <p
                                            className="font-semibold text-sm text-white"
                                        >
                                            상품권 시세보기
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-0.5 bg-gray-200"></div>
                    </div>
            }
        </>
    );
}