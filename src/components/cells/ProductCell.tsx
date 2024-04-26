import Product from "@/models/Product";
import { useEffect, useState } from "react";

interface ProductCellProps {
    product: Product;
    handleClick: () => void;
}

export default function ProductCell(props: ProductCellProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    checkIsMobile();
  }, []);

  function checkIsMobile() {
      if (window.innerWidth < 576) {
          setIsMobile(true);
      }
  }
    return (
        <>
            {
                isMobile ?
                    <div 
                        className="cursor-pointer hover:bg-gray-100 border border-gray-100 w-56 flex flex-col items-center"
                        onClick={() => props.handleClick()}
                    >
                        <div className="px-5 w-44 relative">
                            <img 
                                className="object-contain h-24"
                                src={ props.product.mainImageUrl }
                            />
                            <div className="absolute top-4 l-0 flex gap-2">
                                {
                                    props.product.isPopular &&
                                        <p className="font-medium text-xs text-white bg-red-400 py-0.5 px-1 rounded">인기상품</p>
                                }
                                {
                                    props.product.isSoldOut &&
                                        <p className="font-medium text-xs text-white bg-gray-400 py-0.5 px-1 rounded">품절</p>
                                }
                            </div>
                        </div>
                        <div className="mb-4 px-4">
                            <p className="text-center my-2 font-medium text-sm">{props.product.name}</p>
                            <p className="text-center font-regular text-xs line-through text-gray-400">{props.product.originalPrice.toLocaleString()}원</p>
                            <p className="text-center font-semibold text-sm text-theme">{props.product.price.toLocaleString()}원</p>
                        </div>
                    </div> : 
                    <div 
                        className="w-56 cursor-pointer hover:bg-gray-100 border border-gray-100 z-0"
                        onClick={() => props.handleClick()}
                    >
                        <div className="px-5 relative">
                            <img 
                                className="object-contain h-44"
                                src={ props.product.mainImageUrl }
                            />
                            <div className="absolute top-4 l-0 flex gap-2">
                                {
                                    props.product.isPopular &&
                                        <p className="font-medium text-xs text-white bg-red-400 py-0.5 px-1 rounded">인기상품</p>
                                }
                                {
                                    props.product.isSoldOut &&
                                        <p className="font-medium text-xs text-white bg-gray-400 py-0.5 px-1 rounded">품절</p>
                                }
                            </div>
                        </div>
                        <div className="mb-4">
                            <p className="text-center my-2 font-medium text-sm whitespace-nowrap">{props.product.name}</p>
                            <p className="text-center font-regular text-xs line-through text-gray-400">{props.product.originalPrice.toLocaleString()}원</p>
                            <p className="text-center font-semibold text-sm text-theme">{props.product.price.toLocaleString()}원</p>
                        </div>
                    </div>
            }
        </>
    );
}