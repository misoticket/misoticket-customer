import Post from "@/models/Post";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { useRef } from "react";

interface SelectOrderStyleModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    handleLogIn: () => void;
    handleNoneUserOrder: () => void;
}

export default function SelectOrderStyleModal(props: SelectOrderStyleModalProps) {
    return (
        <>
            <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-medium text-txt-active">
                                주문하기 
                            </ModalHeader>
                            <ModalBody className="mt-10 mb-10">
                                <button onClick={() => props.handleLogIn()} className="font-medium text-sm bg-gray-800 text-white py-3 rounded-lg mb-4 mx-10">로그인</button>
                                <p className="font-medium text-center text-sm text-gray-500 mb-4">또는</p>
                                <button onClick={() => props.handleNoneUserOrder()} className="font-medium text-sm bg-gray-200 text-black py-3 rounded-lg mb-4 mx-10">비회원으로 주문하기</button>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}