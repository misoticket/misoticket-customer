export default function MyFooter() {
    return (
        <>
            <div className="flex flex-col gap-5 mt-32">
                <div className="flex px-56 gap-5">
                    <div className="rounded-lg py-4 border border-solid border-gray-200 pl-4 pr-16">
                        <p className="font-semibold text-2xl">02-421-6311</p>
                        <div className="mt-4 flex flex-col gap-1">
                            <p className="font-medium text-xs">월~토 : 오전 9:40 ~ 오후 7:30</p>
                            <p className="font-medium text-xs">공휴일 : 오전 11시 ~ 오후 6시</p>
                            <p className="font-medium text-xs">일요일 : 휴무</p>
                        </div>
                    </div>
                    <div className="rounded-lg py-4 border border-solid border-gray-200 pl-4 pr-16">
                        <p className="font-medium text-xs text-gray-400">BANK INFO</p>
                        <div className="flex h-full flex-col justify-center">
                            <p className="font-medium text-base">국민 852501-04-084385</p>
                            <p className="font-medium text-base">예금주 : 백승헌 (티켓나라 잠실)</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 py-10 px-56 flex flex-col gap-6">
                    <div className="flex gap-5">
                        <button className="font-medium text-xs text-gray-400">회사소개</button>
                        <button className="font-medium text-xs text-gray-400">이용약관</button>
                        <button className="font-medium text-xs text-gray-400">개인정보처리방침</button>
                        <button className="font-medium text-xs text-gray-400">이용안내</button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-8">
                            <p className="font-medium text-xs text-gray-400">상호: 티켓나라 잠실</p>
                            <p className="font-medium text-xs text-gray-400">대표자: 백승헌</p>
                            <p className="font-medium text-xs text-gray-400">사업자등록번호: 215-91-54203</p>
                            <p className="font-medium text-xs text-gray-400">통신판매업: 제20080-서울송파-0565호</p>
                        </div>
                        <div className="flex gap-8">
                            <p className="font-medium text-xs text-gray-400">전화번호: 02-421-6311</p>
                            <p className="font-medium text-xs text-gray-400">팩스: 02-421-0911</p>
                            <p className="font-medium text-xs text-gray-400">주소: 05510 서울특별시 송파구 올림픽로 289 (신천동) 시그마타워 지하 1층 101호</p>
                        </div>
                        <p className="font-medium text-xs text-gray-400">개인정보보호책임자: 백승헌 (baerer@naver.com)</p>
                        <p className="font-medium text-xs text-gray-400">Copyright © 2024 티켓나라 잠실. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </>
    );
}