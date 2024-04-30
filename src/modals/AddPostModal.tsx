import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

interface AddPostModalProps {
    isOpen: boolean,
    onOpenChange: () => void,
    handleDone: (title: string, content: string) => void,
}

export default function AddPostModal(props: AddPostModalProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    async function addPost() {
        if (titleRef.current && contentRef.current) {
            const title = titleRef.current.value;
            const content = contentRef.current.value;

            if (title.length === 0 || content.length === 0) {
                alert("항목을 모두 입력해주세요.");
            } else {
                props.handleDone(title, content);
            }
        }
    }

    return (
        <>
            <Modal 
                placement={`${isMobile ? "top-center" : "center"}`}
                isOpen={props.isOpen} 
                onOpenChange={props.onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-medium text-txt-active">
                                   Q&A 작성
                            </ModalHeader>
                            <ModalBody>
                                <div>
                                    <div className="mt-4">
                                        <p className="font-meium text-sm mb-2">제목</p>
                                        <input 
                                            ref={titleRef}
                                            className="font-medium text-sm border h-10 w-full rounded px-3"
                                        />
                                    </div>
                                    <div className="mt-6 mb-4">
                                        <p className="font-meium text-sm mb-2">내용</p>
                                        <textarea 
                                            ref={contentRef}
                                            className={`font-medium text-sm border w-full rounded p-3 ${isMobile ? "h-32" : "h-40"}`}
                                        />
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={() => addPost()} className="bg-gray-800 text-white">업로드</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}