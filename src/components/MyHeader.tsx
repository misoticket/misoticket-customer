'use client';

import Image from "next/image";
import logoImg from "@/../public/images/logo.png";
import { useRouter } from "next/navigation";

export default function MyHeader() {
    const router = useRouter();

    return (
        <>
            <div className="w-full">
                <div className="mx-10 py-5 ">
                    <Image onClick={() => router.push("/")} src={logoImg} alt="" width={200} className="cursor-pointer" />
                </div>
                <div className="h-0.5 bg-gray-200"></div>
            </div>
        </>
    );
}