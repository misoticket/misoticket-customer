"use client";

import { deletePost as deletePostFromServer } from "@/apis/FirestoreDELETE";
import {
    fetchAdminPostList,
    fetchPostList,
    fetchUserList,
} from "@/apis/FirestoreGET";
import { addPost as addPostToServer } from "@/apis/FirestorePOST";
import CategoryTabBar from "@/components/CategoryTabBar";
import MyFooter from "@/components/MyFooter";
import MyHeader from "@/components/MyHeader";
import AddPostModal from "@/modals/AddPostModal";
import AdminPostModal from "@/modals/AdminPostModal";
import PostModal from "@/modals/PostModal";
import AdminPost from "@/models/AdminPost";
import Post from "@/models/Post";
import User from "@/models/User";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Page() {
    const router = useRouter();

    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    const [postList, setPostList] = useState<Post[]>([]);
    const [adminPostList, setAdminPostList] = useState<AdminPost[]>([]);
    const [userList, setUserList] = useState<User[]>([]);
    const [openingPost, setOpeningPost] = useState<Post | null>(null);
    const [openingAdminPost, setOpeningAdminPost] = useState<AdminPost | null>(
        null
    );

    const postModal = useDisclosure();
    const addPostModal = useDisclosure();
    const adminPostModal = useDisclosure();

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setUserList(await fetchUserList());
        setAdminPostList(await fetchAdminPostList());
        setPostList(await fetchPostList());
    }

    async function addPost(title: string, content: string) {
        const userId = localStorage.getItem("misoticket-userId");

        if (userId !== null) {
            addPostModal.onOpenChange();
            await addPostToServer(userId, title, content);
            await fetchData();
        }
    }

    function startAddingPost() {
        const isLogIn = localStorage.getItem("misoticket-isLogIn");

        if (isLogIn !== null) {
            if (isLogIn === "y") {
                addPostModal.onOpen();
            } else {
                alert("로그인 후 이용해주세요.");
                router.push("/user/log_in");
            }
        } else {
            alert("로그인 후 이용해주세요.");
            router.push("/user/log_in");
        }
    }

    function getUser(userId: string): User | null {
        const uList = userList.filter((u) => u.id === userId);

        if (uList.length === 0) {
            return null;
        } else {
            return uList[0];
        }
    }

    function getDateTimeStr(date: Date): string {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const yearStr = year.toString();
        const monthStr = month < 10 ? "0" + month.toString() : month.toString();
        const dayStr = day < 10 ? "0" + day.toString() : day.toString();

        const nowYear = new Date().getFullYear();
        let dateStr = "";

        if (nowYear === year) {
            dateStr = monthStr + "." + dayStr;
        } else {
            dateStr = yearStr + "." + monthStr + "." + dayStr;
        }

        const hour = date.getHours();
        const min = date.getMinutes();

        const hourStr = hour < 10 ? `0${hour}` : `${hour}`;
        const minStr = min < 10 ? `0${min}` : `${min}`;

        const timeStr = hourStr + ":" + minStr;

        return dateStr + " " + timeStr;
    }

    function openPost(post: Post) {
        const isLogIn = localStorage.getItem("misoticket-isLogIn");

        if (isLogIn !== null) {
            if (isLogIn === "y") {
                const userId = localStorage.getItem("misoticket-userId")!;

                if (userId === post.userId || userId === "misoticket") {
                    setOpeningPost(post);
                    postModal.onOpen();
                } else {
                    alert("작성자만 글을 볼 수 있어요.");
                }
            } else {
                alert("로그인 후 이용해주세요.");
                router.push("/user/log_in");
            }
        } else {
            alert("로그인 후 이용해주세요.");
            router.push("/user/log_in");
        }
    }

    function openAdminPost(post: Post) {
        const isLogIn = localStorage.getItem("misoticket-isLogIn");

        if (isLogIn !== null) {
            if (isLogIn === "y") {
                const userId = localStorage.getItem("misoticket-userId")!;

                if (userId === post.userId || userId === "misoticket") {
                    setOpeningPost(post);
                    setOpeningAdminPost(getAdminPost(post.id));
                    adminPostModal.onOpen();
                } else {
                    alert("작성자만 글을 볼 수 있어요.");
                }
            } else {
                alert("로그인 후 이용해주세요.");
                router.push("/user/log_in");
            }
        } else {
            alert("로그인 후 이용해주세요.");
            router.push("/user/log_in");
        }
    }

    async function deletePost(post: Post) {
        postModal.onOpenChange();
        await deletePostFromServer(post.id);
        fetchData();
    }

    function getAdminPost(postId: string): AdminPost | null {
        console.log(adminPostList);
        const aList = adminPostList.filter((a) => a.postId === postId);
        return aList.length === 0 ? null : aList[0];
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
                                    <div className="mb-6 flex justify-between items-center">
                                        <div className="flex items-end">
                                            <p className="border-l-5 px-3 border-gray-800 text-lg font-medium">
                                                Q&A
                                            </p>
                                            <p className="text-xs font-medium mb-1 text-gray-400">
                                                상품에 관한 질문 & 답변입니다.
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => startAddingPost()}
                                            className="px-4 py-1 bg-gray-800 text-white font-medium text-sm hover:opacity-80 rounded-lg"
                                        >
                                            글쓰기
                                        </button>
                                    </div>
                                    <div className="border-l border-t border-r">
                                        <div className="flex bg-gray-100 border-b">
                                            <p className="text-xs font-medium flex-1 px-2 border-r py-1.5">
                                                제목
                                            </p>
                                            <p className="text-xs font-medium w-24 px-2 border-r py-1.5 text-center">
                                                작성자
                                            </p>
                                            <p className="text-xs font-medium w-24 px-2 py-1.5 text-center">
                                                작성일
                                            </p>
                                        </div>
                                        <div>
                                            {postList.map((post) => (
                                                <div key={post.id}>
                                                    <div
                                                        onClick={() =>
                                                            openPost(post)
                                                        }
                                                        key={post.id}
                                                        className="flex border-b hover:bg-gray-50 cursor-pointer"
                                                    >
                                                        <p className="text-xs font-regular flex-1 px-2 border-r py-2">
                                                            {post.title}
                                                        </p>
                                                        <p
                                                            className={`text-xs font-regular w-24 px-2 py-2 text-center border-r ${
                                                                getUser(
                                                                    post.userId
                                                                ) === null
                                                                    ? "text-gray-300"
                                                                    : "text-black"
                                                            }`}
                                                        >
                                                            {getUser(
                                                                post.userId
                                                            )
                                                                ? getUser(
                                                                      post.userId
                                                                  )!.name
                                                                : "삭제된 회원"}
                                                        </p>
                                                        <p className="text-xs font-regular w-24 px-2 py-2 text-center">
                                                            {getDateTimeStr(
                                                                post.createdTime
                                                            )}
                                                        </p>
                                                    </div>
                                                    {getAdminPost(post.id) !==
                                                        null && (
                                                        <div
                                                            onClick={() =>
                                                                openAdminPost(
                                                                    post
                                                                )
                                                            }
                                                            key={
                                                                getAdminPost(
                                                                    post.id
                                                                )!.id
                                                            }
                                                            className="flex border-b hover:bg-gray-50 cursor-pointer"
                                                        >
                                                            <p className="text-xs font-regular flex-1 px-2 border-r py-2">
                                                                (답변){" "}
                                                                {post.title}
                                                            </p>
                                                            <p className="text-xs font-regular w-24 px-2 border-r py-2 text-center">
                                                                관리자
                                                            </p>
                                                            <p className="text-xs font-regular w-24 px-2 py-2 text-center">
                                                                {getDateTimeStr(
                                                                    getAdminPost(
                                                                        post.id
                                                                    )!
                                                                        .createdTime
                                                                )}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-52 px-96">
                                <div>
                                    <div className="mb-6 flex justify-between items-center">
                                        <div className="flex items-end">
                                            <p className="border-l-5 px-3 border-gray-800 text-lg font-medium">
                                                Q&A
                                            </p>
                                            <p className="text-xs font-medium mb-1 text-gray-400">
                                                상품에 관한 질문 & 답변입니다.
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => startAddingPost()}
                                            className="px-4 py-1 bg-gray-800 text-white font-medium text-sm hover:opacity-80 rounded-lg"
                                        >
                                            글쓰기
                                        </button>
                                    </div>
                                    <div className="border">
                                        <div className="flex bg-gray-100 border-b">
                                            <p className="text-sm font-medium flex-1 px-4 border-r py-1.5 text-center">
                                                제목
                                            </p>
                                            <p className="text-sm font-medium w-40 px-4 border-r py-1.5 text-center">
                                                작성자
                                            </p>
                                            <p className="text-sm font-medium w-44 px-4 py-1.5 text-center">
                                                작성일
                                            </p>
                                        </div>
                                        <div>
                                            {postList.map((post) => (
                                                <div key={post.id}>
                                                    <div
                                                        onClick={() =>
                                                            openPost(post)
                                                        }
                                                        key={post.id}
                                                        className="flex border-b hover:bg-gray-50 cursor-pointer"
                                                    >
                                                        <p className="text-sm font-regular flex-1 px-4 border-r py-2">
                                                            {post.title}
                                                        </p>
                                                        <p
                                                            className={`text-sm font-regular w-40 px-4 border-r py-2 text-center ${
                                                                getUser(
                                                                    post.userId
                                                                ) === null
                                                                    ? "text-gray-300"
                                                                    : "text-black"
                                                            }`}
                                                        >
                                                            {getUser(
                                                                post.userId
                                                            )
                                                                ? getUser(
                                                                      post.userId
                                                                  )!.name
                                                                : "삭제된 회원"}
                                                        </p>
                                                        <p className="text-sm font-regular w-44 px-4 py-2 text-center">
                                                            {getDateTimeStr(
                                                                post.createdTime
                                                            )}
                                                        </p>
                                                    </div>
                                                    {getAdminPost(post.id) !==
                                                        null && (
                                                        <div
                                                            onClick={() =>
                                                                openAdminPost(
                                                                    post
                                                                )
                                                            }
                                                            key={
                                                                getAdminPost(
                                                                    post.id
                                                                )!.id
                                                            }
                                                            className="flex border-b hover:bg-gray-50 cursor-pointer"
                                                        >
                                                            <p className="text-sm font-regular flex-1 px-4 border-r py-2">
                                                                (답변){" "}
                                                                {post.title}
                                                            </p>
                                                            <p className="text-sm font-regular w-40 px-4 border-r py-2 text-center">
                                                                관리자
                                                            </p>
                                                            <p className="text-sm font-regular w-44 px-4 py-2 text-center">
                                                                {getDateTimeStr(
                                                                    getAdminPost(
                                                                        post.id
                                                                    )!
                                                                        .createdTime
                                                                )}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
                <MyFooter />
                <AddPostModal
                    isOpen={addPostModal.isOpen}
                    onOpenChange={addPostModal.onOpenChange}
                    handleDone={(title, content) => addPost(title, content)}
                />
                <PostModal
                    isOpen={postModal.isOpen}
                    onOpenChange={postModal.onOpenChange}
                    post={openingPost}
                    deletePost={(post) => deletePost(post)}
                />
                <AdminPostModal
                    isOpen={adminPostModal.isOpen}
                    onOpenChange={adminPostModal.onOpenChange}
                    post={openingPost}
                    adminPost={openingAdminPost}
                />
            </div>
        </>
    );
}
