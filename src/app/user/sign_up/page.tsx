"use client";

import { checkUserExist } from "@/apis/FirestoreGET";
import { makeUser } from "@/apis/FirestorePOST";
import CategoryTabBar from "@/components/CategoryTabBar";
import MyFooter from "@/components/MyFooter";
import MyHeader from "@/components/MyHeader";
import SearchAddressModal from "@/modals/SearchAddressModal";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useRef, useState } from "react";

export default function Page() {
    const router = useRouter();

    const [address, setAddress] = useState("");
    const [orderEmail2, setOrderEmail2] = useState("naver.com");
    const [showEmailAddress, setShowEmailAddress] = useState("naver.com");
    const [isCustomEmail, setIsCustomEmail] = useState(false);

    const idRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);
    const pwConfirmRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef1 = useRef<HTMLInputElement>(null);
    const phoneNumberRef2 = useRef<HTMLInputElement>(null);
    const phoneNumberRef3 = useRef<HTMLInputElement>(null);
    const detailAddressRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    const searchAddressModal = useDisclosure();

    const handleIdKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            pwRef.current?.focus();
        }
    };

    const handlePwKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            pwConfirmRef.current?.focus();
        }
    };

    const handlePwConfirmKeyPress = (
        event: KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            event.preventDefault();
            nameRef.current?.focus();
        }
    };

    const handleNameKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            phoneNumberRef1.current?.focus();
        }
    };

    const handleEmailKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            signUp();
        }
    };

    async function signUp() {
        if (
            idRef.current &&
            pwRef.current &&
            pwConfirmRef.current &&
            nameRef.current &&
            phoneNumberRef1.current &&
            phoneNumberRef2.current &&
            phoneNumberRef3.current &&
            emailRef.current
        ) {
            const id = idRef.current.value;
            const pw = pwRef.current.value;
            const pwConfirm = pwConfirmRef.current.value;
            const name = nameRef.current.value;
            const phoneNumber =
                phoneNumberRef1.current.value +
                "-" +
                phoneNumberRef2.current.value +
                "-" +
                phoneNumberRef3.current.value;
            const email = emailRef.current.value;

            if (
                id.length === 0 ||
                pw.length === 0 ||
                pwConfirm.length === 0 ||
                phoneNumber.length === 0 ||
                email.length === 0
            ) {
                alert("항목을 모두 입력해주세요.");
            } else if (id.length < 4 || id.length > 12) {
                alert("아이디는 4~12 글자입니다.");
            } else if (pw.length < 6 || pw.length > 20) {
                alert("비밀번호는 6~20 글자입니다.");
            } else if (pw !== pwConfirm) {
                alert("비밀번호가 일치하지 않습니다.");
            } else if (address.trim().length === 0) {
                alert("주소를 입력해주세요");
            } else {
                if (await checkUserExist(id)) {
                    alert("이미 존재하는 아이디입니다.");
                } else {
                    await makeUser(
                        id,
                        pw,
                        name,
                        phoneNumber,
                        address,
                        detailAddressRef.current!.value,
                        email + "@" + orderEmail2
                    );
                    localStorage.setItem("misoticket-isLogIn", "y");
                    localStorage.setItem("misoticket-userId", id);
                    localStorage.setItem("misoticket-userName", name);

                    alert("회원가입이 완료되었습니다.");
                    router.push("/");
                }
            }
        }
    }

    function handleSearchDone(address: string) {
        setAddress(address);
        searchAddressModal.onClose();
    }

    return (
        <>
            <div>
                <MyHeader />
                <CategoryTabBar selectedCategoryId={null} />
                <div className="flex justify-center items-center mt-40 flex-col">
                    <div className="w-96 p-6 bg-gray-100 border rounded-lg">
                        <p className="font-semibold text-base text-center">
                            회원가입
                        </p>
                        <p className="font-medium text-sm text-center text-gray-400 mt-1">
                            환영합니다! 아래 정보를 입력해주세요.
                        </p>
                        <div className="mt-8">
                            <div className="mb-6">
                                <p className="font-medium text-sm w-24 mb-2">
                                    아이디
                                </p>
                                <input
                                    onKeyDown={handleIdKeyPress}
                                    ref={idRef}
                                    placeholder="4~12 글자"
                                    className="w-full h-10 bg-white rounded border px-3 text-sm font-medium"
                                />
                            </div>
                            <div className="mb-6">
                                <p className="font-medium text-sm w-24 mb-2">
                                    비밀번호
                                </p>
                                <input
                                    onKeyDown={handlePwKeyPress}
                                    ref={pwRef}
                                    placeholder="6~20 글자"
                                    type="password"
                                    className="w-full h-10 bg-white rounded border px-3 text-sm font-medium"
                                />
                            </div>
                            <div className="mb-6">
                                <p className="font-medium text-sm w-24 mb-2">
                                    비밀번호 확인
                                </p>
                                <input
                                    onKeyDown={handlePwConfirmKeyPress}
                                    ref={pwConfirmRef}
                                    type="password"
                                    className="w-full h-10 bg-white rounded border px-3 text-sm font-medium"
                                />
                            </div>
                            <div className="mb-6">
                                <p className="font-medium text-sm w-24 mb-2">
                                    성함
                                </p>
                                <input
                                    onKeyDown={handleNameKeyPress}
                                    ref={nameRef}
                                    className="w-full h-10 bg-white rounded border px-3 text-sm font-medium"
                                />
                            </div>
                            <div className="mb-6">
                                <p className="font-medium text-sm w-24 mb-2">
                                    휴대폰 번호
                                </p>
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
                                <p className="font-medium text-sm w-24 mb-2">
                                    주소
                                </p>
                                {address.trim().length === 0 ? (
                                    <button
                                        onClick={() =>
                                            searchAddressModal.onOpen()
                                        }
                                        className="font-medium text-theme-sub text-sm px-4 py-1 bg-gray-200 rounded-lg hover:opacity-60"
                                    >
                                        주소 검색
                                    </button>
                                ) : (
                                    <div className="w-full">
                                        <p
                                            onClick={() =>
                                                searchAddressModal.onOpen()
                                            }
                                            className="font-medium text-sm mb-2 cursor-pointer hover:opacity-60"
                                        >
                                            {address}
                                        </p>
                                        <input
                                            ref={detailAddressRef}
                                            placeholder="상세주소 입력"
                                            className="border rounded h-10 text-regualr text-sm px-2 mt-1 w-2/3 border-gray-200"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <p className="font-medium text-sm w-24 mb-2">
                                    이메일
                                </p>
                                <div className="flex gap-2 items-center">
                                    <input
                                        onKeyDown={handleEmailKeyPress}
                                        ref={emailRef}
                                        className="w-32 h-10 bg-white rounded border px-3 text-sm font-medium"
                                    />
                                    <p>@</p>
                                    <div className="flex flex-col gap-2">
                                        <Dropdown>
                                            <DropdownTrigger>
                                                <p className="font-medium text-sm bg-gray-200 py-1.5 px-3 rounded cursor-pointer hover:opacity-70">
                                                    {showEmailAddress}
                                                </p>
                                            </DropdownTrigger>
                                            <DropdownMenu>
                                                <DropdownItem
                                                    onPress={() => {
                                                        setIsCustomEmail(false);
                                                        setShowEmailAddress(
                                                            "naver.com"
                                                        );
                                                        setOrderEmail2(
                                                            "naver.com"
                                                        );
                                                    }}
                                                >
                                                    naver.com
                                                </DropdownItem>
                                                <DropdownItem
                                                    onPress={() => {
                                                        setIsCustomEmail(false);
                                                        setShowEmailAddress(
                                                            "hanmail.net"
                                                        );
                                                        setOrderEmail2(
                                                            "hanmail.net"
                                                        );
                                                    }}
                                                >
                                                    hanmail.net
                                                </DropdownItem>
                                                <DropdownItem
                                                    onPress={() => {
                                                        setIsCustomEmail(false);
                                                        setShowEmailAddress(
                                                            "google.com"
                                                        );
                                                        setOrderEmail2(
                                                            "google.com"
                                                        );
                                                    }}
                                                >
                                                    google.com
                                                </DropdownItem>
                                                <DropdownItem
                                                    onPress={() => {
                                                        setIsCustomEmail(false);
                                                        setShowEmailAddress(
                                                            "daum.net"
                                                        );
                                                        setOrderEmail2(
                                                            "daum.net"
                                                        );
                                                    }}
                                                >
                                                    daum.net
                                                </DropdownItem>
                                                <DropdownItem
                                                    onPress={() => {
                                                        setIsCustomEmail(false);
                                                        setShowEmailAddress(
                                                            "nate.com"
                                                        );
                                                        setOrderEmail2(
                                                            "nate.com"
                                                        );
                                                    }}
                                                >
                                                    nate.com
                                                </DropdownItem>
                                                <DropdownItem
                                                    onPress={() => {
                                                        setIsCustomEmail(false);
                                                        setShowEmailAddress(
                                                            "kakao.com"
                                                        );
                                                        setOrderEmail2(
                                                            "kakao.com"
                                                        );
                                                    }}
                                                >
                                                    kakao.com
                                                </DropdownItem>
                                                <DropdownItem
                                                    onPress={() => {
                                                        setIsCustomEmail(true);
                                                        setShowEmailAddress(
                                                            "직접입력"
                                                        );
                                                        setOrderEmail2("");
                                                    }}
                                                >
                                                    직접 입력
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                        {isCustomEmail && (
                                            <input
                                                className="w-full h-10 font-regular text-black text-sm rounded border px-3"
                                                placeholder="이메일 주소 입력"
                                                onChange={(e) =>
                                                    setOrderEmail2(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => signUp()}
                                className="w-full h-10 bg-gray-800 mt-6 rounded-lg text-white hover:opacity-80"
                            >
                                가입하기
                            </button>
                        </div>
                    </div>
                </div>
                <MyFooter />
            </div>
            <SearchAddressModal
                isOpen={searchAddressModal.isOpen}
                onOpenChange={searchAddressModal.onOpenChange}
                handleDone={(address) => handleSearchDone(address)}
            />
        </>
    );
}
