import React from "react";
import "../../assets/css/backgroundNotifyGift.css";
import Image from "../../assets/fontawesome/image/popup-tc.png";
import Image_GIFT from "../../assets/fontawesome/image/popup-gift-ani.png";
import PropTypes from "prop-types";
import phone_icon from "../../assets/fontawesome/image/phone-icon.png";
import { useNavigate } from "react-router-dom";
import BTN_NEXT_GUIDE from "../../assets/fontawesome/image/btn-cancel-guide.svg";

MainPopup.propTypes = {
  image: PropTypes.string,
  btnLater: PropTypes.func,
  btnAgree: PropTypes.func,
  titlePopup: PropTypes.string,
  onClosePopup: PropTypes.func,
  handleCancel: PropTypes.string,
  handleOk: PropTypes.string,
  children: PropTypes.string,
  flagButton: PropTypes.string,
};
const styleButtonOk = {
  color: "#fff",
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "20px",
};

export default function MainPopup({
  setCheckAgree1,
  handleChangeAnnounceStatus,
  handleEnableBtn,
  checkAgree1,
  btnAgree,
  onClosePopup = () => {},
  handleCancel,
  onSubmit,
  children,
  flagButton,
  statusLuckyDraw,
  soIds,
  flag,
}) {
  const navigation = useNavigate();
  const winningGift = JSON.parse(localStorage.getItem("WINNING_GIFT"));
  let contact = localStorage.getItem("CONTACT");
  const handleClickOk = () => {};
  const handleNavigateSucess = () => {
    navigation(`/list-gift`);
  };
  const handleRotation = () => {
    navigation(`/list-rotation`);
  };
  const handleLuckyDraw = () => {
    if (soIds.length !== 1) {
      navigation(`/list-rotation`);
    } else {
      navigation(`/wheel/${soIds}`);
    }
  };
  return (
    <div className="z-50">
      <div
        className="fixed z-50 overflow-y-auto top-0 w-full left-0 show"
        id="modal"
      >
        <div
          className="flex items-center justify-center min-height-100vh
         px-4 pb-20 text-center sm:block sm:p-0"
        >
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-900 opacity-70" />
            <div className="content-popup-condition w-full">
              <div className="popup-otp relative top-10 w-full z-50">
                <div
                  className={`containerNotify__background-tc  absolute w-9/12 rounded-3xl 
                 z-50  left-1/2 -translate-x-1/2 bg-white py-2 border-notify ${
                   flagButton === "gift_prize"
                     ? "top-[170px] h-[62%]"
                     : "top-[135px] h-[62%]"
                 }`}
                >
                  {children}
                </div>
                <div
                  className={`relative w-[99%] left-1/2 -translate-x-1/2 ${
                    flagButton === "gift_prize" ? "top-10" : ""
                  } `}
                >
                  <div className="relative">
                    {flag === true ? (
                      <>
                        <div className="absolute -top-[170px] background-light-ani"></div>
                        <div className="absolute -top-36 background-firework-ani"></div>
                      </>
                    ) : null}
                    <img
                      src={flagButton === "gift_prize" ? Image_GIFT : Image}
                      className="w-10/12 relative left-1/2 -translate-x-1/2"
                    />
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-11/12 bottom-5 px-8">
                    {flagButton === "gift_prize" ? (
                      <>
                        {flag === true ? (
                          <button
                            type="submit"
                            className="border_btn-agree text-white text-[16px] bg-[#2B67BE] px-4 
                          rounded-xl py-2 font-semibold-mon"
                            defaultValue="Đồng ý"
                            value={btnAgree}
                            onClick={() => {
                              if (winningGift?.spinRemain >= 1) {
                                handleChangeAnnounceStatus();
                                handleEnableBtn();
                              } else {
                                handleNavigateSucess();
                              }
                            }}
                          >
                            {winningGift?.spinRemain >= 1 ? (
                              <>
                                Quay tiếp
                                <br /> (còn {winningGift.spinRemain} lượt quay)
                              </>
                            ) : (
                              <>Nhận quà ngay</>
                            )}
                          </button>
                        ) : (
                          <div className="flex justify-around -mt-[70px]">
                            <a
                              href={"tel:" + contact}
                              className="bg-[#00AF43] hotline-btn text-[#ffffff] flex
                         justify-center items-center rounded-[16px] px-[10px] py-[12px] gap-1 w-[120px] mr-2"
                            >
                              <img src={phone_icon} alt="" />
                              <span className="font-semibold-mon w-full text-[13px]">
                                Liên hệ <br />
                                Hỗ trợ
                              </span>
                            </a>
                            <button
                              type="submit"
                              className="border_btn-agree w-48 text-white bg-[#2B67BE] px-1 rounded-xl text-[13px] font-semibold-mon"
                              defaultValue="Đồng ý"
                              value={btnAgree}
                              onClick={() => {
                                if (statusLuckyDraw) {
                                  handleLuckyDraw();
                                } else {
                                  handleRotation();
                                }
                              }}
                            >
                              <div className="flex justify-around">
                                <img src={BTN_NEXT_GUIDE} />
                                Xác nhận đủ quà
                                <br /> hoặc lượt quay
                              </div>
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div>
                          <button
                            style={styleButtonOk}
                            className="border_btn-agree text-[16px] bg-[#4E7CCF] px-8 rounded-xl py-3"
                            defaultValue="Đồng ý"
                            onClick={handleClickOk}
                          >
                            Đăng nhập
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
