"use client";

import { fetchNoticeList } from "@/apis/FirestoreGET";
import CategoryTabBar from "@/components/CategoryTabBar";
import MyFooter from "@/components/MyFooter";
import MyHeader from "@/components/MyHeader";
import NoticeModal from "@/modals/NoticeModal";
import Notice from "@/models/Notice";
import { useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Page() {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    const [isFetchDone, setIsFetchDone] = useState(false);
    const [noticeList, setNoticeList] = useState<Notice[]>([]);
    const [willOpenNotice, setWillOpenNotice] = useState<Notice | null>(null);

    const noticeDisclosure = useDisclosure();

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setNoticeList(await fetchNoticeList());
        setIsFetchDone(true);
    }

    function getDateTimeStr(date: Date): string {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const yearStr = year.toString();
        const monthStr = month < 10 ? "0" + month.toString() : month.toString();
        const dayStr = day < 10 ? "0" + day.toString() : day.toString();

        const dateStr = yearStr + "-" + monthStr + "-" + dayStr;

        const hour = date.getHours();
        const min = date.getMinutes();

        const hourStr = hour < 10 ? `0${hour}` : `${hour}`;
        const minStr = min < 10 ? `0${min}` : `${min}`;

        const timeStr = hourStr + ":" + minStr;

        return dateStr + " " + timeStr;
    }

    return (
        <>
            <div>
                <MyHeader />
                <CategoryTabBar selectedCategoryId={null} />
                {isMobile !== null && (
                    <>
                        {isMobile === true ? (
                            <div className="mt-40 mx-4">
                                <div>
                                    <div className="flex items-end mb-4">
                                        <p className="border-l-5 px-3 border-gray-800 text-lg font-medium">
                                            공지사항
                                        </p>
                                    </div>
                                    <div className="border-l border-t border-r">
                                        <div className="flex bg-gray-100 border-b">
                                            <p className="text-xs font-medium flex-1 px-2 border-r py-1.5">
                                                제목
                                            </p>
                                            <p className="text-xs font-medium w-16 px-2 border-r py-1.5 text-center">
                                                작성자
                                            </p>
                                            <p className="text-xs font-medium w-24 px-2 py-1.5 text-center">
                                                작성일
                                            </p>
                                        </div>
                                        <div>
                                            {noticeList.map((notice) => (
                                                <div key={notice.id}>
                                                    <div
                                                        onClick={() => {
                                                            setWillOpenNotice(
                                                                notice
                                                            );
                                                            noticeDisclosure.onOpen();
                                                        }}
                                                        key={notice.id}
                                                        className="flex border-b hover:bg-gray-50 cursor-pointer items-center"
                                                    >
                                                        <p className="text-xs font-regular flex-1 px-2 border-r py-2">
                                                            {notice.title}
                                                        </p>
                                                        <p className="text-xs font-regular w-16 px-2 border-r py-2 text-center">
                                                            관리자
                                                        </p>
                                                        <p className="text-xs font-regular w-24 px-2 py-2 text-center">
                                                            {getDateTimeStr(
                                                                notice.createdTime
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-52 px-96">
                                <div>
                                    <div className="flex items-end mb-6">
                                        <p className="border-l-5 px-3 border-gray-800 text-lg font-medium">
                                            공지사항
                                        </p>
                                    </div>
                                    <div className="border">
                                        <div className="flex bg-gray-100 border-b">
                                            <p className="text-sm font-medium flex-1 px-4 border-r py-1.5">
                                                제목
                                            </p>
                                            <p className="text-sm font-medium w-32 px-4 border-r py-1.5 text-center">
                                                작성자
                                            </p>
                                            <p className="text-sm font-medium w-24 px-4 border-r py-1.5 text-center">
                                                조회수
                                            </p>
                                            <p className="text-sm font-medium w-44 px-4 py-1.5 text-center">
                                                작성일
                                            </p>
                                        </div>
                                        <div>
                                            {noticeList.map((notice) => (
                                                <div
                                                    onClick={() => {
                                                        setWillOpenNotice(
                                                            notice
                                                        );
                                                        noticeDisclosure.onOpenChange();
                                                    }}
                                                    key={notice.id}
                                                >
                                                    <div
                                                        onClick={() => null}
                                                        key={notice.id}
                                                        className="flex border-b hover:bg-gray-50 cursor-pointer"
                                                    >
                                                        <p className="text-sm font-regular flex-1 px-4 border-r py-2">
                                                            {notice.title}
                                                        </p>
                                                        <p className="text-sm font-regular w-32 px-4 border-r py-2 text-center">
                                                            관리자
                                                        </p>
                                                        <p className="text-sm font-regular w-24 px-4 border-r py-2 text-center">
                                                            {notice.numViews}
                                                        </p>
                                                        <p className="text-sm font-regular w-44 px-4 py-2 text-center">
                                                            {getDateTimeStr(
                                                                notice.createdTime
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
                <div className="mt-40">
                    <MyFooter isShow={isFetchDone} />
                </div>
            </div>
            <NoticeModal
                notice={willOpenNotice}
                isOpen={noticeDisclosure.isOpen}
                onOpenChange={noticeDisclosure.onOpenChange}
            />
        </>
    );
}
