import { Banner } from "@/models/Banner";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";

interface BannerModalProps {
    banner: Banner | null;
    isOpen: boolean;
    onOpenChange: () => void;
}

export default function BannerModal(props: BannerModalProps) {
    function skipBannerToday() {
        if (props.banner !== null) {
            localStorage.setItem(props.banner.id, makeTodayStr());
            props.onOpenChange();
        }
    }

    function makeTodayStr(): string {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const dateString = `${year}-${month}-${day}`;
        return dateString;
    }

    return (
        <>
            <Modal
                placement="center"
                size="sm"
                isOpen={props.isOpen}
                onOpenChange={props.onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <div>
                                    <p className="font-bold text-lg text-center my-8">
                                        {props.banner?.title}
                                    </p>
                                    <div className="mt-4 flex justify-center">
                                        <p className="font-medium text-base mb-2 whitespace-pre-wrap">
                                            {props.banner?.desc}
                                        </p>
                                    </div>
                                    <div className="h-1 w-full bg-gray-100 mt-8"></div>
                                    <button
                                        onClick={() => skipBannerToday()}
                                        className="font-regular text-base text-gray-400 text-center my-6 w-full"
                                    >
                                        오늘 하루 보지않기
                                    </button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
