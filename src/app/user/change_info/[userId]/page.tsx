"use client";

import { fetchUser } from "@/apis/FirestoreGET";
import { updateUserInfo } from "@/apis/FirestorePOST";
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
import { KeyboardEvent, useEffect, useRef, useState } from "react";

export default function Page({ params }: { params: { userId: string } }) {
    const router = useRouter();

    const [name, setName] = useState("");
    const [phoneNumber1, setPhoneNumber1] = useState("");
    const [phoneNumber2, setPhoneNumber2] = useState("");
    const [phoneNumber3, setPhoneNumber3] = useState("");
    const [address, setAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [email, setEmail] = useState("");
    const [orderEmail2, setOrderEmail2] = useState("naver.com");
    const [showEmailAddress, setShowEmailAddress] = useState("naver.com");
    const [isCustomEmail, setIsCustomEmail] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef1 = useRef<HTMLInputElement>(null);
    const phoneNumberRef2 = useRef<HTMLInputElement>(null);
    const phoneNumberRef3 = useRef<HTMLInputElement>(null);
    const detailAddressRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    const searchAddressModal = useDisclosure();

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const myUser = await fetchUser(params.userId);
        if (myUser) {
            setName(myUser.name);
            setPhoneNumber1(myUser.phoneNumber.split("-")[0]);
            setPhoneNumber2(myUser.phoneNumber.split("-")[1]);
            setPhoneNumber3(myUser.phoneNumber.split("-")[2]);
            setAddress(myUser.address);
            setDetailAddress(myUser.addressDetail);
            setEmail(myUser.email.split("@")[0]);
            setShowEmailAddress(myUser.email.split("@")[1]);
        }
    }

    const handleNameKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            phoneNumberRef1.current?.focus();
        }
    };

    const handleEmailKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            changeInfo();
        }
    };

    async function changeInfo() {
        if (
            nameRef.current &&
            phoneNumberRef1.current &&
            phoneNumberRef2.current &&
            phoneNumberRef3.current &&
            emailRef.current
        ) {
            const name = nameRef.current.value;
            const phoneNumber =
                phoneNumberRef1.current.value +
                "-" +
                phoneNumberRef2.current.value +
                "-" +
                phoneNumberRef3.current.value;
            const email = emailRef.current.value;

            if (phoneNumber.length === 0 || email.length === 0) {
                alert("항목을 모두 입력해주세요.");
            } else if (address.trim().length === 0) {
                alert("주소를 입력해주세요");
            } else {
                await updateUserInfo(
                    params.userId,
                    name,
                    phoneNumber,
                    address,
                    detailAddress,
                    email + "@" + orderEmail2
                );

                localStorage.setItem("misoticket-userName", name);
                alert("회원정보가 변경되었습니다.");
                router.replace("/");
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
                            회원정보 수정
                        </p>
                        <div className="mt-8">
                            <div className="mb-6">
                                <p className="font-medium text-sm w-24 mb-2">
                                    성함
                                </p>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                        value={phoneNumber1}
                                        onChange={(e) =>
                                            setPhoneNumber1(e.target.value)
                                        }
                                        ref={phoneNumberRef1}
                                        type="number"
                                        className="flex-1 h-10 bg-white rounded border px-2 text-sm font-medium w-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <p className="font-semibold font-sm">-</p>
                                    <input
                                        value={phoneNumber2}
                                        onChange={(e) =>
                                            setPhoneNumber2(e.target.value)
                                        }
                                        ref={phoneNumberRef2}
                                        type="number"
                                        className="flex-1 h-10 bg-white rounded border px-2 text-sm font-medium w-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <p className="font-semibold font-sm">-</p>
                                    <input
                                        value={phoneNumber3}
                                        onChange={(e) =>
                                            setPhoneNumber3(e.target.value)
                                        }
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
                                        <div>
                                            <p className="font-medium text-sm mb-2">
                                                {address}
                                            </p>
                                            <button
                                                onClick={() =>
                                                    searchAddressModal.onOpen()
                                                }
                                                className="font-regular text-gray-500 bg-gray-200 rounded px-1 py-0.5 hover:opacity-60 text-sm my-1"
                                            >
                                                주소 변경
                                            </button>
                                        </div>
                                        <input
                                            value={detailAddress}
                                            onChange={(e) =>
                                                setDetailAddress(e.target.value)
                                            }
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
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
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
                                onClick={() => changeInfo()}
                                className="w-full h-10 bg-gray-800 mt-6 rounded-lg text-white hover:opacity-80"
                            >
                                수정 완료
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
