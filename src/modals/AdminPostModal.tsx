import AdminPost from "@/models/AdminPost";
import Post from "@/models/Post";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { useRef } from "react";

interface AdminPostModalProps {
    isOpen: boolean,
    onOpenChange: () => void,
    post: Post | null;
    adminPost: AdminPost | null;
}

export default function AdminPostModal(props: AdminPostModalProps) {
    return (
        <>
            <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-medium text-txt-active">
                                관리자 답변
                            </ModalHeader>
                            <ModalBody>
                                {
                                    props.post && props.adminPost &&
                                        <div>
                                            <div className="mt-4">
                                                <p className="font-medium text-sm mb-2">제목</p>
                                                <p className="font-regular text-sm bg-gray-100 p-3 rounded">{props.post.title}</p>
                                            </div>
                                            <div className="mt-6 mb-4">
                                                <p className="font-medium text-sm mb-2">내용</p>
                                                <p className="font-regular text-sm whitespace-pre-line bg-gray-100 p-3 rounded">{props.post.content}</p>
                                            </div>
                                            <div className="mt-6 mb-4">
                                                <p className="font-medium text-sm mb-2">답변</p>
                                                <p className="font-regular text-sm whitespace-pre-line bg-gray-100 p-3 rounded">{props.adminPost.content}</p>
                                            </div>
                                        </div>
                                }
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}