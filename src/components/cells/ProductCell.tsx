import Product from "@/models/Product";

interface ProductCellProps {
    product: Product;
    handleClick: () => void;
}

export default function ProductCell(props: ProductCellProps) {
    return (
        <>
            <div 
                className="w-72 cursor-pointer hover:bg-gray-50"
                onClick={() => props.handleClick()}
            >
                <div>
                    <div className="h-44 bg-slate-100"></div>
                </div>
                <div className="mt-4">
                    <p className="text-center my-2 font-medium text-xs">{props.product.name}</p>
                    <p className="text-center font-regular text-xs">{props.product.originalPrice}</p>
                    <p className="text-center font-semibold text-sm">{props.product.price}</p>
                </div>
            </div>
        </>
    );
}