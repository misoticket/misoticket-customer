'use client';

import { fetchProduct } from "@/apis/FirestoreGET";
import { uploadOrder } from "@/apis/FirestorePOST";
import CategoryTabBar from "@/components/CategoryTabBar";
import MyFooter from "@/components/MyFooter";
import MyHeader from "@/components/MyHeader";
import ProgressModal from "@/modals/ProgressModal";
import Order from "@/models/Order";
import Product from "@/models/Product";
import ProductOrder from "@/models/ProductOrder";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { OrderStatus } from "../constants/OrderStatus";

const OrderFrom = {
    product: "product",
    basket: "basket"
}

export default function Page() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [from, setFrom] = useState<string | null>(null);
    const [amount, setAmount] = useState<number | null>(null);
    const [product, setProduct] = useState<Product | null>(null);

    const orderPersonNameRef = useRef<HTMLInputElement>(null);
    const orderPhoneNumber1Ref = useRef<HTMLInputElement>(null);
    const orderPhoneNumber2Ref = useRef<HTMLInputElement>(null);
    const orderPhoneNumber3Ref = useRef<HTMLInputElement>(null);
    const orderEmail1Ref = useRef<HTMLInputElement>(null);
    const orderEmail2Ref = useRef<HTMLInputElement>(null);
    const orderPasswordRef = useRef<HTMLInputElement>(null);
    const orderPasswordConfirmRef = useRef<HTMLInputElement>(null);
    const deliveryPersonNameRef = useRef<HTMLInputElement>(null);
    const deliveryPhoneNumber1Ref = useRef<HTMLInputElement>(null);
    const deliveryPhoneNumber2Ref = useRef<HTMLInputElement>(null);
    const deliveryPhoneNumber3Ref = useRef<HTMLInputElement>(null);
    const deliveryMessageRef = useRef<HTMLInputElement>(null);
    const depositorNameRef = useRef<HTMLInputElement>(null);

    const [isOrdering, setIsOrdering] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setFrom(searchParams.get("from"));
        setAmount(Number(searchParams.get("amount")));
        setProduct(await fetchProduct(searchParams.get("productId")!));
    }

    async function order() {
        const orderPersonName = orderPersonNameRef.current!.value;
        const orderPhoneNumber1 = orderPhoneNumber1Ref.current!.value;
        const orderPhoneNumber2 = orderPhoneNumber2Ref.current!.value;
        const orderPhoneNumber3 = orderPhoneNumber3Ref.current!.value;
        const orderEmail1 = orderEmail1Ref.current!.value;
        const orderEmail2 = orderEmail2Ref.current!.value;
        const orderPassword = orderPasswordRef.current!.value;
        const orderPasswordConfirm = orderPasswordConfirmRef.current!.value;
        const deliveryPersonName = deliveryPersonNameRef.current!.value;
        const deliveryPhoneNumber1 = deliveryPhoneNumber1Ref.current!.value;
        const deliveryPhoneNumber2 = deliveryPhoneNumber2Ref.current!.value;
        const deliveryPhoneNumber3 = deliveryPhoneNumber3Ref.current!.value;
        const deliveryMessage = deliveryMessageRef.current!.value;
        const depositorName = depositorNameRef.current!.value;

        if (orderPersonName.trim().length === 0 ||
            orderPhoneNumber1.trim().length === 0 ||
            orderPhoneNumber2.trim().length === 0 ||
            orderPhoneNumber3.trim().length === 0 ||
            orderEmail1.trim().length === 0 ||
            orderEmail2.trim().length === 0 ||
            orderPassword.trim().length === 0 ||
            orderPasswordConfirm.trim().length === 0 ||
            deliveryPersonName.trim().length === 0 ||
            deliveryPhoneNumber1.trim().length === 0 ||
            deliveryPhoneNumber2.trim().length === 0 ||
            deliveryPhoneNumber3.trim().length === 0 ||
            depositorName.trim().length === 0) {
            alert("필수항목을 모두 입력해주세요.");
        } else if (orderPassword !== orderPasswordConfirm) {
            alert("주문조회 비밀번호가 일치하지 않습니다.");
        } else if (orderPassword.length < 4 || orderPassword.length > 12) {
            alert("주문조회 비밀번호는 4~12자로 입력해주세요.");
        } else {
            if (from && product && amount && from === OrderFrom.product) {
                setIsOrdering(true);
                const orderId = await uploadOrder(new Order(
                                            "",
                                            new Date(),
                                            [new ProductOrder(product.id, amount)],
                                            orderPersonName,
                                            orderPhoneNumber1 + orderPhoneNumber2 + orderPhoneNumber3,
                                            orderEmail1 + orderEmail2,
                                            orderPassword,
                                            deliveryPersonName,
                                            deliveryPhoneNumber1 + deliveryPhoneNumber2 + deliveryPhoneNumber3,
                                            deliveryMessage,
                                            depositorName,
                                            OrderStatus.PREPARE_DELIVERY
                                        ));
                router.push(`/order/${orderId}`);
            } else {
                alert("Todo");
            }
        }
    }

    function openEscrow() {
        window.open("http://escrow1.kbstar.com/quics?page=B009111&cc=b010807%3Ab008491&mHValue=034d60a69b928601e8ab5b534f1ca8a8", "_blank");
    }

    return (
        <>
            <div>
                <MyHeader />
                <CategoryTabBar selectedCategoryId={null} />
                <div className="px-60">
                    <div className="mt-44">
                        <div className="flex gap-5 mt-20">
                            <p className="font-meium text-base text-gray-300">1. 상품선택</p>
                            <p className="font-meium text-base text-gray-300">&gt;</p>
                            <p className="font-semibold text-base">2. 주문서 작성</p>
                            <p className="font-semibold text-base">&gt;</p>
                            <p className="font-meium text-base text-gray-300">3. 주문 완료</p>
                        </div>
                        <div className="w-full mt-8">
                            <p className="bg-gray-100 font-medium px-5 py-2 border border-gray-300">주문내역</p>
                            <div className="flex border-r border-l border-b border-1 border-gray-300">
                                <p className="w-full font-regular text-sm bg-gray-50 px-5 py-2 border-r border-1 border-gray-300">상품정보</p>
                                <p className="w-56 font-regular text-sm bg-gray-50 text-center py-2 border-r border-1 border-gray-300">판매가</p>
                                <p className="w-56 font-regular text-sm bg-gray-50 text-center py-2 border-r border-1 border-gray-300">수량</p>
                                <p className="w-56 font-regular text-sm bg-gray-50 text-center py-2 border-r border-1 border-gray-300">배송구분</p>
                                <p className="w-56 font-regular text-sm bg-gray-50 text-center py-2 border-r border-1 border-gray-300">배송비</p>
                                <p className="w-56 font-regular text-sm bg-gray-50 text-center py-2">합계</p>
                            </div>
                        </div>
                        {
                            from && from === OrderFrom.product && amount && product &&
                                <div>
                                    <div className="flex border-r border-l border-b border-1 border-gray-300">
                                        <p className="w-full font-regular text-sm bg-white px-5 py-6 border-r border-1 border-white">{ product.name }</p>
                                        <p className="w-56 font-medium text-sm bg-white text-center py-6 border-r border-1 border-white">{ product.price.toLocaleString() }원</p>
                                        <p className="w-56 font-regular text-sm bg-white text-center py-6 border-r border-1 border-white">{ amount }</p>
                                        <p className="w-56 font-regular text-sm bg-white text-center py-6 border-r border-1 border-white">기본배송</p>
                                        <p className="w-56 font-medium text-sm bg-white text-center py-6 border-r border-1 border-white">고정</p>
                                        <p className="w-56 font-semibold text-sm bg-white text-center py-6">{ (product.price*amount).toLocaleString() }<span className="font-medium">원</span></p>
                                    </div>
                                    <div className="flex justify-end border-r border-l border-b border-1 border-gray-300 bg-gray-100">
                                        <div className="flex py-6">
                                            <div className="flex gap-2 items-center">
                                                <p className="font-regular text-xs text-gray-400">상품 총 금액</p>
                                                <p className="font-medium text-sm">{ (product.price*amount).toLocaleString() }<span className="font-medium">원</span></p>
                                            </div>
                                            <p className="font-medium mx-4">+</p>
                                            <div className="flex gap-2 items-center">
                                                <p className="font-regular text-xs text-gray-400">배송비</p>
                                                <p className="font-medium text-sm">{ (4000).toLocaleString() }<span className="font-medium">원</span></p>
                                            </div>
                                            <p className="font-medium mx-4">=</p>
                                            <p className="font-bold text-xl text-theme mr-5">{ (product.price*amount).toLocaleString() }<span className="font-medium">원</span></p>
                                        </div>
                                    </div>
                                    <p className="font-medium text-theme opacity-80 mt-4 text-xs mx-5">상품의 옵션 및 수량 변경은 상품상세 또는 장바구니에서 가능합니다.</p>
                                </div>
                        }
                        <div className="w-full h-0.5 bg-gray-100 my-10"></div>
                        <div>
                            <p className="font-medium text-sm mx-2">주문 정보</p>
                            <div className="flex mt-4 border border-gray-200">
                                <p className="w-56 font-regular text-sm p-4 bg-gray-50 border-r border-1 border-gray-200">주문하시는 분 <span className="font-medium text-theme">*</span></p>
                                <div className="w-full flex items-center px-5">
                                    <input 
                                        ref={orderPersonNameRef}
                                        className="w-64 border border-gray-300 px-2 py-1 text-sm font-regular" 
                                    />
                                </div>
                            </div>
                            <div className="flex border-l border-r border-b border-1 border-gray-200">
                                <p className="w-56 font-regular text-sm p-4 bg-gray-50 border-r border-1 border-gray-200">휴대폰 번호 <span className="font-medium text-theme">*</span></p>
                                <div className="w-full flex items-center px-5">
                                    <input 
                                        ref={orderPhoneNumber1Ref}
                                        type="number"
                                        className="w-16 border border-gray-300 px-2 py-1 text-sm font-regular [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                                    />
                                    <p className="font-medium text-sm mx-2">-</p>
                                    <input 
                                        ref={orderPhoneNumber2Ref}
                                        type="number"
                                        className="w-20 border border-gray-300 px-2 py-1 text-sm font-regular [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                                    />
                                    <p className="font-medium text-sm mx-2">-</p>
                                    <input 
                                        ref={orderPhoneNumber3Ref}
                                        type="number"
                                        className="w-20 border border-gray-300 px-2 py-1 text-sm font-regular [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                                    />
                                </div>
                            </div>
                            <div className="flex border-l border-r border-b border-1 border-gray-200">
                                <p className="w-56 font-regular text-sm p-4 bg-gray-50 border-r border-1 border-gray-200">이메일 <span className="font-medium text-theme">*</span></p>
                                <div className="w-full flex items-center px-5">
                                    <input 
                                        ref={orderEmail1Ref}
                                        className="w-36 border border-gray-300 px-2 py-1 text-sm font-regular" 
                                    />
                                    <p className="font-medium text-sm mx-2">@</p>
                                    <input 
                                        ref={orderEmail2Ref}
                                        className="w-36 border border-gray-300 px-2 py-1 text-sm font-regular" 
                                    />
                                </div>
                            </div>
                            <div className="flex border-l border-r border-b border-1 border-gray-200">
                                <p className="w-56 font-regular text-sm p-4 bg-gray-50 border-r border-1 border-gray-200">주문조회 비밀번호 <span className="font-medium text-theme">*</span></p>
                                <div className="w-full flex items-center px-5">
                                    <input 
                                        ref={orderPasswordRef}
                                        type="password"
                                        className="w-64 border border-gray-300 px-2 py-1 text-sm font-regular" 
                                    />
                                    <p className="ml-4 font-regular text-xs text-gray-400">(주문조회시 필요합니다. 4자에서 12자 영문 또는 숫자 대소문자 구분)</p>
                                </div>
                            </div>
                            <div className="flex border-l border-r border-b border-1 border-gray-200">
                                <p className="w-56 font-regular text-sm p-4 bg-gray-50 border-r border-1 border-gray-200">주문조회 비밀번호 확인 <span className="font-medium text-theme">*</span></p>
                                <div className="w-full flex items-center px-5">
                                    <input 
                                        ref={orderPasswordConfirmRef}
                                        type="password"
                                        className="w-64 border border-gray-300 px-2 py-1 text-sm font-regular" 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-10">
                            <p className="font-medium text-sm mx-2">배송 정보</p>
                            <div className="flex mt-4 border border-gray-200">
                                <p className="w-56 font-regular text-sm p-4 bg-gray-50 border-r border-1 border-gray-200">받으시는 분 <span className="font-medium text-theme">*</span></p>
                                <div className="w-full flex items-center px-5">
                                    <input 
                                        ref={deliveryPersonNameRef}
                                        className="w-64 border border-gray-300 px-2 py-1 text-sm font-regular" 
                                    />
                                </div>
                            </div>
                            <div className="flex border-l border-r border-b border-1 border-gray-200">
                                <p className="w-56 font-regular text-sm p-4 bg-gray-50 border-r border-1 border-gray-200">휴대폰 번호 <span className="font-medium text-theme">*</span></p>
                                <div className="w-full flex items-center px-5">
                                    <input 
                                        ref={deliveryPhoneNumber1Ref}
                                        type="number"
                                        className="w-16 border border-gray-300 px-2 py-1 text-sm font-regular [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                                    />
                                    <p className="font-medium text-sm mx-2">-</p>
                                    <input 
                                        ref={deliveryPhoneNumber2Ref}
                                        type="number"
                                        className="w-20 border border-gray-300 px-2 py-1 text-sm font-regular [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                                    />
                                    <p className="font-medium text-sm mx-2">-</p>
                                    <input 
                                        ref={deliveryPhoneNumber3Ref}
                                        type="number"
                                        className="w-20 border border-gray-300 px-2 py-1 text-sm font-regular [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                                    />
                                </div>
                            </div>
                            <div className="flex border-l border-r border-b border-1 border-gray-200">
                                <p className="w-56 font-regular text-sm p-4 bg-gray-50 border-r border-1 border-gray-200">배송메시지</p>
                                <div className="w-full flex items-center px-5 py-4">
                                    <textarea 
                                        ref={deliveryMessageRef}
                                        className="w-full h-16 border border-gray-300 px-2 py-2 text-xs font-regular" 
                                    />
                                </div>
                            </div>
                        </div>
                        {
                            from && from === OrderFrom.product && amount && product &&
                                <div className="mt-10">
                                    <p className="font-medium text-sm mx-2">결제 정보</p>
                                    <div className="mt-4 border border-gray-200 flex items-center">
                                        <div className="w-full">
                                            <p className="my-4 mx-6 font-medium text-sm">무통장 입금</p>
                                            <div className="my-4 mx-6">
                                                <div className="flex mt-4 border border-gray-200">
                                                    <p className="w-56 font-regular text-sm p-4 bg-gray-50 border-r border-1 border-gray-200">입금자명</p>
                                                    <div className="w-full flex items-center px-5">
                                                        <input 
                                                            ref={depositorNameRef}
                                                            className="w-64 border border-gray-300 px-2 py-1 text-sm font-regular" 
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex border-l border-r border-b border-1 border-gray-200">
                                                    <p className="w-56 font-regular text-sm p-4 bg-gray-50 border-r border-1 border-gray-200">입금은행</p>
                                                    <div className="w-full flex items-center px-5">
                                                        <p className="w-full text-sm font-medium">국민은행 85250104084385 백승헌(티켓나라잠실)</p>
                                                    </div>
                                                </div>
                                                <div className="flex border-l border-r border-b border-1 border-gray-200">
                                                    <p className="w-56 font-regular text-sm p-4 bg-gray-50 border-r border-1 border-gray-200">안심구매 (에스크로)</p>
                                                    <div className="w-full flex items-center px-5">
                                                        <button 
                                                            onClick={() => openEscrow()}
                                                            className="font-medium text-sm underline hover:opacity-50"
                                                        >
                                                            KB에스크로 바로가기
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-96 bg-gray-100 px-5 py-8 h-full flex flex-col">
                                            <div>
                                                <p className="font-regular text-sm">무통장입금 최종결제 금액</p>
                                                <p className="font-bold text-xl mt-1 text-theme">{ (product.price*amount).toLocaleString() }<span className="font-medium">원</span></p>
                                            </div>
                                            <div>
                                                <p className="font-medium text-xs mt-10 mb-1">결제정보를 확인하였으며,<br/>구매진행에 동의합니다.</p>
                                                <button 
                                                    onClick={() => order()}
                                                    className="font-medium w-full py-4 text-white bg-black opacity-90 mt-2 hover:opacity-70"
                                                >
                                                    결제하기
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <MyFooter />
            </div>
            <ProgressModal inProgress={isOrdering} />
        </>
    );
}