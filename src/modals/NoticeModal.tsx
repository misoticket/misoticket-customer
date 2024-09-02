import Notice from "@/models/Notice";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";

interface NoticeModalProps {
    notice: Notice | null;
    isOpen: boolean;
    onOpenChange: () => void;
}

export default function NoticeModal(props: NoticeModalProps) {
    return (
        <>
            <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-medium text-txt-active">
                                공지사항
                            </ModalHeader>
                            <ModalBody>
                                {props.notice && (
                                    <div>
                                        <div className="mt-4">
                                            <p className="font-medium text-sm mb-2">
                                                제목
                                            </p>
                                            <p className="font-regular text-sm bg-gray-100 p-3 rounded">
                                                {props.notice.title}
                                            </p>
                                        </div>
                                        <div className="mt-6 mb-4">
                                            <p className="font-medium text-sm mb-2">
                                                내용
                                            </p>
                                            <p className="font-regular text-sm bg-gray-100 p-3 rounded whitespace-pre-wrap">
                                                {props.notice.content}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </ModalBody>
                            <ModalFooter className="mt-10">
                                <Button
                                    onClick={() => onClose()}
                                    color="default"
                                    variant="light"
                                >
                                    닫기
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
