"use client";

import { deleteUser } from "@/apis/FirestoreDELETE";
import { fetchUser } from "@/apis/FirestoreGET";
import CategoryTabBar from "@/components/CategoryTabBar";
import MyFooter from "@/components/MyFooter";
import MyHeader from "@/components/MyHeader";
import DeleteAccountModal from "@/modals/DeleteAccountModal";
import User from "@/models/User";
import { useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const router = useRouter();

    const [isFetchDone, setIsFetchDone] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const deleteAccountDisclosure = useDisclosure();

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    }, []);

    async function fetchData() {
        const isLogIn = localStorage.getItem("misoticket-isLogIn");
        if (isLogIn !== null) {
            if (isLogIn === "y") {
                const userId = localStorage.getItem("misoticket-userId")!;
                setUser(await fetchUser(userId));
                setIsFetchDone(true);
            } else {
                router.push("/");
            }
        } else {
            router.push("/");
        }
    }

    function logOut() {
        localStorage.setItem("misoticket-isLogIn", "n");
        router.push("/");
    }

    async function deleteAccount() {
        const userId = localStorage.getItem("misoticket-userId")!;
        await deleteUser(userId);
        localStorage.setItem("misoticket-isLogIn", "n");
        router.push("/");
    }

    return (
        <>
            <div>
                <MyHeader />
                <CategoryTabBar selectedCategoryId={null} />
                <div className="flex items-center mt-56 flex-col">
                    <div className="w-96 p-6 border rounded-lg flex flex-col gap-16">
                        <div className="flex flex-col gap-4">
                            <p className="font-semibold text-base text-center">
                                회원 정보
                            </p>
                            <div className="mt-8 px-3 flex flex-col gap-5">
                                <div className="flex gap-4">
                                    <p className="font-medium text-sm w-20 border-l-3 border-gray-300 pl-2">
                                        ID :
                                    </p>
                                    <p className="font-medium text-sm flex-1">
                                        {user?.id}
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <p className="font-medium text-sm w-20 border-l-3 border-gray-300 pl-2">
                                        성함 :
                                    </p>
                                    <p className="font-medium text-sm flex-1">
                                        {user?.name}
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <p className="font-medium text-sm w-20 border-l-3 border-gray-300 pl-2">
                                        이메일 :
                                    </p>
                                    <p className="font-medium text-sm flex-1">
                                        {user?.email}
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <p className="font-medium text-sm w-20 border-l-3 border-gray-300 pl-2">
                                        전화번호 :
                                    </p>
                                    <p className="font-medium text-sm flex-1">
                                        {user?.phoneNumber}
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <p className="font-medium text-sm w-20 border-l-3 border-gray-300 pl-2">
                                        주소 :
                                    </p>
                                    <p className="font-medium text-sm flex-1">
                                        {user?.address} {user?.addressDetail}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() =>
                                    router.push(`/user/change_info/${user!.id}`)
                                }
                                className="font-medium text-sm text-black"
                            >
                                회원정보 변경하기
                            </button>
                            <button
                                onClick={() => logOut()}
                                className="font-medium text-sm text-red-500"
                            >
                                로그아웃
                            </button>
                            <button
                                onClick={() => deleteAccountDisclosure.onOpen()}
                                className="font-medium text-sm text-gray-300"
                            >
                                계정 삭제
                            </button>
                        </div>
                    </div>
                </div>
                <MyFooter isShow={isFetchDone} />
            </div>
            <DeleteAccountModal
                isOpen={deleteAccountDisclosure.isOpen}
                onOpenChange={deleteAccountDisclosure.onOpenChange}
                handleDelete={() => deleteAccount()}
            />
        </>
    );
}
