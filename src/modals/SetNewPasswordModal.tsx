import { Button } from "@nextui-org/button";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/modal";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

interface SetNewPasswordModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    handleDone: (newPassword: string) => void;
}

export default function SetNewPasswordModal(props: SetNewPasswordModalProps) {
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    async function setNewPassword() {
        if (newPasswordRef.current) {
            const newPassword = newPasswordRef.current.value;

            if (newPassword.length < 6 || newPassword.length > 20) {
                alert("비밀번호는 6~20자 입니다.");
            } else {
                props.handleDone(newPassword);
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
                                새로운 비밀번호 설정
                            </ModalHeader>
                            <ModalBody>
                                <div>
                                    <p className="font-medium text-sm mb-10">
                                        홈페이지가 개편되어
                                        <br />새 비밀번호 설정이 필요합니다.
                                    </p>
                                    <div className="mt-4">
                                        <p className="font-meium text-sm mb-2">
                                            비밀번호
                                        </p>
                                        <input
                                            type="password"
                                            ref={newPasswordRef}
                                            className="font-medium text-sm border h-10 w-full rounded px-3"
                                        />
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    onClick={() => setNewPassword()}
                                    className="bg-gray-800 text-white"
                                >
                                    설정하기
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
