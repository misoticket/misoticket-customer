import Post from "@/models/Post";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { useRef } from "react";

interface PostModalProps {
    isOpen: boolean,
    onOpenChange: () => void,
    post: Post | null;
    deletePost: (post: Post) => void;
}

export default function PostModal(props: PostModalProps) {
    async function deletePost() {
        if (props.post) {
            props.deletePost(props.post);
        }
    }

    return (
        <>
            <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-medium text-txt-active">
                                   Q&A 작성
                            </ModalHeader>
                            <ModalBody>
                                {
                                    props.post &&
                                        <div>
                                            <div className="mt-4">
                                                <p className="font-medium text-sm mb-2">제목</p>
                                                <p className="font-regular text-sm bg-gray-100 p-3 rounded">{props.post.title}</p>
                                            </div>
                                            <div className="mt-6 mb-4">
                                                <p className="font-medium text-sm mb-2">내용</p>
                                                <p className="font-regular text-sm whitespace-pre-line bg-gray-100 p-3 rounded">{props.post.content}</p>
                                            </div>
                                        </div>
                                }
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={() => deletePost()} color="danger" className="text-white">게시글 삭제</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}