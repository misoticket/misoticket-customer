import Product from "@/models/Product";

interface ProductCellProps {
    product: Product;
    handleClick: () => void;
}

export default function ProductCell(props: ProductCellProps) {
    return (
        <>
            <div 
                className="w-56 cursor-pointer hover:bg-gray-100 border border-gray-100"
                onClick={() => props.handleClick()}
            >
                <div className="px-5">
                    <img 
                        className="object-contain h-44"
                        src={ props.product.mainImageUrl }
                    />
                </div>
                <div className="mb-4">
                    <p className="text-center my-2 font-medium text-sm">{props.product.name}</p>
                    <p className="text-center font-regular text-xs line-through text-gray-400">{props.product.originalPrice.toLocaleString()}원</p>
                    <p className="text-center font-semibold text-sm text-theme">{props.product.price.toLocaleString()}원</p>
                </div>
            </div>
        </>
    );
}