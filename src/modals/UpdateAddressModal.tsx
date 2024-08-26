import { updateAddress } from "@/apis/FirestoreUPDATE";
import Order from "@/models/Order";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import SearchAddressModal from "./SearchAddressModal";

interface UpdateAddressModalProps {
    order: Order | null;
    isOpen: boolean;
    onOpenChange: () => void;
    handleDone: () => void;
}

export default function UpdateAddressModal(props: UpdateAddressModalProps) {
    const [address, setAddress] = useState("");
    const [addressDetail, setAddressDetail] = useState("");

    const searchAddressModal = useDisclosure();

    useEffect(() => {
        if (props.order !== null) {
            setAddress(props.order.address);
            setAddressDetail(props.order.addressDetail);
        }
    }, [props.order]);

    async function handleComplete() {
        if (props.order !== null) {
            await updateAddress(props.order.id, address, addressDetail);
            props.handleDone();
        }
    }

    return (
        <>
            <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-medium text-txt-active">
                                배송지 변경
                            </ModalHeader>
                            <ModalBody>
                                <div className="mt-10 mb-20 flex flex-col gap-4">
                                    <div className="flex">
                                        <button
                                            className="bg-gray-100 rounded font-medium text-sm py-3 px-4 hover:bg-gray-200 duration-200"
                                            onClick={() =>
                                                searchAddressModal.onOpen()
                                            }
                                        >
                                            {address}
                                        </button>
                                    </div>
                                    <input
                                        className="font-medium text-sm border h-10 w-full rounded px-3 outline-none"
                                        placeholder="상세주소 입력"
                                        value={addressDetail}
                                        onChange={(e) =>
                                            setAddressDetail(e.target.value)
                                        }
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={() => props.onOpenChange()}>
                                    취소
                                </Button>
                                <Button
                                    color="primary"
                                    onClick={() => handleComplete()}
                                >
                                    변경 완료
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <SearchAddressModal
                isOpen={searchAddressModal.isOpen}
                onOpenChange={searchAddressModal.onOpenChange}
                handleDone={(address) => {
                    setAddress(address);
                    searchAddressModal.onClose();
                }}
            />
        </>
    );
}
