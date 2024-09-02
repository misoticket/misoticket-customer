import { Banner } from "@/models/Banner";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";

interface BannerModalProps {
    banner: Banner | null;
    isOpen: boolean;
    onOpenChange: () => void;
}

export default function BannerModal(props: BannerModalProps) {
    return (
        <>
            <Modal
                placement="center"
                isOpen={props.isOpen}
                onOpenChange={props.onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-medium text-txt-active">
                                {props.banner?.title}
                            </ModalHeader>
                            <ModalBody>
                                <div>
                                    <div className="mt-4">
                                        <p className="font-medium text-sm mb-2">
                                            {props.banner?.desc}
                                        </p>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                {/* <Button onClick={() => addPost()} className="bg-gray-800 text-white">업로드</Button> */}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
