import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import DaumPostcodeEmbed from "react-daum-postcode";

interface SearchAddressModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    handleDone: (address: string) => void;
}

export default function SearchAddressModal(props: SearchAddressModalProps) {
    async function handleComplete(data: any) {
        const addr =
            data.address + " " + data.buildingName + ", " + data.zonecode;
        props.handleDone(addr);
    }

    return (
        <>
            <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-medium text-txt-active">
                                주소 검색
                            </ModalHeader>
                            <ModalBody>
                                <div>
                                    <DaumPostcodeEmbed
                                        onComplete={handleComplete}
                                    />
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
