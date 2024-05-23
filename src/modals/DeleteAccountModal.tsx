import { Button } from "@nextui-org/button";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/modal";
import { useMediaQuery } from "react-responsive";

interface DeleteAccountModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    handleDelete: () => void;
}

export default function DeleteAccountModal(props: DeleteAccountModalProps) {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

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
                                계정 삭제
                            </ModalHeader>
                            <ModalBody>
                                <div>
                                    <p className="font-medium text-sm">
                                        계정을 삭제하면 다시 되돌릴 수 없어요.
                                    </p>
                                    <p className="font-medium text-sm">
                                        정말 삭제할까요?
                                    </p>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={() => props.onOpenChange()}>
                                    취소
                                </Button>
                                <Button
                                    color="danger"
                                    onClick={() => props.handleDelete()}
                                >
                                    삭제하기
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
