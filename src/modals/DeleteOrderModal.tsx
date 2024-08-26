import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";
import { useMediaQuery } from "react-responsive";

interface DeleteOrderModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    handleDelete: () => void;
}

export default function DeleteOrderModal(props: DeleteOrderModalProps) {
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
                                주문 취소
                            </ModalHeader>
                            <ModalBody>
                                <div className="mt-10 mb-16">
                                    <p className="font-medium text-base">
                                        주문을 취소할까요?
                                    </p>
                                    <p className="font-medium text-base">
                                        삭제된 주문내역은 복구할 수 없습니다.
                                    </p>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={() => props.onOpenChange()}>
                                    닫기
                                </Button>
                                <Button
                                    color="danger"
                                    onClick={() => props.handleDelete()}
                                >
                                    주문 취소
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
