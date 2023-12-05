import { WHEEL_PHANTHUONG } from "../../utils/KeyConstant";

export default function ContentGiftPrize() {
  const winningGift = JSON.parse(localStorage.getItem(
    // "WINNING_GIFT"
    WHEEL_PHANTHUONG
    ));
  return (
    <p className="containerNotify__background-list ">
      <div className="text-center">
        <h1 className="uppercase my-[5px] leading-8 font-bold-mon text-[24px] text-[#003DA5]">
          chúc mừng bạn
          <br /> đã trúng
        </h1>
      </div>
      <div className="">
        <img
          className="relative left-1/2 -translate-x-1/2 w-7/12"
          src={winningGift?.gift_image}
          alt=""
        />
        <span className="font-bold-mon">{winningGift?.gift}</span>
      </div>
      <p className="block px-3 text-justify font-regular-mon">
        <div
          dangerouslySetInnerHTML={{
            __html: winningGift?.conditions_receiving_prize,
          }}
          className="dont-break-out"
        ></div>
      </p>
    </p>
  );
}
