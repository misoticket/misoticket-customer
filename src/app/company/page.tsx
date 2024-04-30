import companyImg from "@/../public/images/company.png";

export default function Page() {
    return (
        <>
            <div className="w-full flex justify-center">
                <img
                    src={companyImg.src}
                    alt=""
                />
            </div>
        </>
    );
}