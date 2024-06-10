"use client";

import companyImg0 from "@/../public/images/miso_0.png";
import companyImg1 from "@/../public/images/miso_1.jpeg";
import companyImg2 from "@/../public/images/miso_2.jpeg";
import companyImg3 from "@/../public/images/miso_3.jpeg";
import { useMediaQuery } from "react-responsive";

export default function Page() {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    return (
        <>
            {isMobile ? (
                <div className="w-full flex flex-col items-center justify-center px-4">
                    <div className="w-full py-10">
                        <img className="w-full" src={companyImg0.src} alt="" />
                        <div className="px-4 py-2">
                            <img
                                className="rounded-xl"
                                src={companyImg1.src}
                                alt=""
                            />
                        </div>
                        <div className="px-4 py-2">
                            <img
                                className="rounded-xl"
                                src={companyImg2.src}
                                alt=""
                            />
                        </div>
                        <div className="px-4 py-2">
                            <img
                                className="rounded-xl"
                                src={companyImg3.src}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full flex flex-col items-center justify-center">
                    <div className="w-1/3 py-24">
                        <img className="w-full" src={companyImg0.src} alt="" />
                        <div className="px-4 py-2">
                            <img
                                className="rounded-xl"
                                src={companyImg1.src}
                                alt=""
                            />
                        </div>
                        <div className="px-4 py-2">
                            <img
                                className="rounded-xl"
                                src={companyImg2.src}
                                alt=""
                            />
                        </div>
                        <div className="px-4 py-2">
                            <img
                                className="rounded-xl"
                                src={companyImg3.src}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
