import React, { useState } from "react";
import logo_png from "../../assets/fontawesome/image/logo_png.svg";
import "./AnnouncePrize.css";
import IconPhoneAndZalo from "../../component/IconPhoneAndZalo/IconPhoneAndZalo";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

AnnouncePrize.propTypes = {
  handleChangeAnnounceStatus: PropTypes.func,
  handleEnableBtn: PropTypes.func,
};
const style = {
  color: "#130682",
  fontSize: "16px",
  fontHeight: "20px",
  fontWeight: "600",
};

export default function AnnouncePrize({
  handleChangeAnnounceStatus,
  handleEnableBtn,
}) {
  const winningGift = JSON.parse(localStorage.getItem("WINNING_GIFT"));
  const [isShorten, setIsShorten] = useState(true);
  const navigate = useNavigate();
  const handleShortingText = () => {
    setIsShorten(!isShorten);
  };
  const handleNavigateSucess = () => {
    navigate(`/wheel-success`);
  };

  return (
    <div className="bg-[#244FAF]">
      <div className="annouce-prize text-[#FFFFFF] contain">
        <div className="pt-[20px]">
          <div className="flex justify-center flex-col items-center">
            <div>
              <img className="" src={logo_png} alt="" />
            </div>
            <div className="text-center">
              <h1 className="uppercase my-[26px] text-[28px]">xin chúc mừng</h1>
              <p className="font-light-mon">Bạn đã trúng một phần quà là</p>
              <span>{winningGift?.gift}</span>
            </div>
            <div className="mt-[31px]">
              <img className="px-[30px]" src={winningGift?.gift_image} alt="" />
            </div>
          </div>
        </div>
        <div className="font-light-mon mx-auto px-[39px] mt-[25px] text-[12px]">
          <p>
            Đối với Giải thưởng là Thẻ quà tặng: Quí khách sẽ được gửi qua tin
            nhắn vào SĐT có kèm đường link voucher trong vòng 1 tiếng.{" "}
            <span
              className={`text-[#EFDB8E] cursor-pointer ${
                isShorten ? "inline-block" : "hidden"
              } ml-1`}
              onClick={() => {
                handleShortingText();
              }}
            >
              {" "}
              Xem thêm...{" "}
            </span>
          </p>
          <p className={`${isShorten ? "hidden" : "block"} mt-3`}>
            Đối với Giải thưởng là vàng hoặc quà hiện vật: Bộ phận CSKH sẽ liên
            hệ với Khách hàng để thông báo và xin thông tin địa chỉ và tiến hành
            giao hàng tận nhà cho khách hàng. Quà tặng sẽ được trao trong vòng
            15 - 30 ngày kể từ ngày kết thúc Chương trình. Vui lòng giữ tin nhắn
            SMS thông báo trúng giải để nhận thưởng.{" "}
            <span
              className={`text-[#EFDB8E] cursor-pointer `}
              onClick={() => {
                handleShortingText();
              }}
            >
              {" "}
              Rút gọn...
            </span>
          </p>
        </div>
        <div className="flex justify-center py-[50px] box-border text-[#333] font-light-mon">
          <button
            onClick={() => {
              if (winningGift?.spinRemain >= 1) {
                handleChangeAnnounceStatus();
                handleEnableBtn();
              } else {
                handleNavigateSucess();
              }
            }}
            style={style}
            type="submit"
            className="color-button-enable border-0 text-[#333] px-[32px] py-[15px] text-center no-underline inline-block rounded-3xl text-[16px] cursor-pointer not-italic font-[Montserrat-Light] font-bold-mon leading-5"
          >
            {winningGift?.spinRemain >= 1
              ? `Quay tiếp (còn ${winningGift.spinRemain} lượt quay)`
              : "Nhận quà ngay"}
          </button>
        </div>
      </div>
      <IconPhoneAndZalo />
    </div>
  );
}
