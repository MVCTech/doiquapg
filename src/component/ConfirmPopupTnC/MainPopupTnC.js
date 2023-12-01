import React from "react";
import "../../assets/css/backgroundNotifyGift.css";
import Image from "../../assets/fontawesome/image/popup-tc.png";
import Image_GIFT from "../../assets/fontawesome/image/popup-gift-ani.png";
import PropTypes from "prop-types";
import { useState } from "react";
import phone_icon from "../../assets/fontawesome/image/phone-icon.png";
import { useNavigate } from "react-router-dom";

MainPopupTnC.propTypes = {
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

export default function MainPopupTnC({
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
  setShow,
  flag,
}) {
  const [check1, setCheck1] = useState(checkAgree1);
  const [check2, setCheck2] = useState(checkAgree1);
  const [checkStatus, setCheckStatus] = useState("");
  const navigation = useNavigate();
  const winningGift = JSON.parse(localStorage.getItem("WINNING_GIFT"));
  const handleClickOk = () => {
    setShow(false);
  };
  const handleClickNoOk = () => {
    setCheckStatus("Vui lòng nhấn đông ý để tiếp tục");
  };
  const handleAgree1 = (e) => {
    setCheck1(!check1);
  };
  const handleAgree2 = (e) => {
    setCheck2(!check2);
  };
  const handleNavigateSucess = () => {
    navigation(`/list-gift`);
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
                  <p
                    className="containerNotify__background-list dont-break-out font-regular-mon
                   text-left text-[#333] text-[13px] px-1 py-3"
                  >
                    <div className="checkbox-tc w-full">
                      <div className="flex font-light-mon">
                        <div>
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            defaultChecked={checkAgree1}
                            value={check1}
                            onClick={(e) => handleAgree1()}
                            className="checkbox-confirm-register w-3 text-blue-600 "
                          />
                        </div>
                        <label
                          htmlFor="check"
                          className="text-[#333333] text-[13px]"
                        >
                          {" "}
                        </label>
                        <label
                          htmlFor="check"
                          className={`corlor-text-black w-full text-left ml-2
                         text-[13px] leading-[20px] font-regular-mon`}
                        >
                          Tôi đồng ý
                        </label>
                      </div>
                    </div>
                    P&G Việt Nam và đơn vị cung cấp dịch vụ của P&G có thể xử lý
                    dữ liệu cá nhân của bạn nhằm mục đích đánh giá điều kiện bạn
                    tham chương trình khuyến mại, liên hệ trao giải thưởng, quản
                    lý và báo cáo kết quả của chương trình theo quy định của
                    luật pháp. Nếu bạn từ chối đồng ý, bạn sẽ không thể tham gia
                    chương trình này. {" "}
                    <div className="checkbox-tc w-full pt-3">
                      <div className="flex font-light-mon">
                        <div>
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            defaultChecked={checkAgree1}
                            onClick={(e) => handleAgree2()}
                            className="checkbox-confirm-register w-3 text-blue-600 "
                          />
                        </div>
                        <label
                          htmlFor="check"
                          className="text-[#333333] text-[13px]"
                        >
                          {" "}
                        </label>
                        <label
                          htmlFor="check"
                          className={`corlor-text-black w-full text-left ml-2
                         text-[13px] leading-[20px] font-regular-mon`}
                        >
                          Tôi đồng ý
                        </label>
                      </div>
                    </div>
                    P&G Việt Nam và đơn vị cung cấp dịch vụ của P&G có thể xử lý
                    dữ liệu cá nhân của bạn nhằm mục đích gửi cho bạn thông tin
                    quảng bá, tiếp thị về các sản phẩm, thông tin chương trình
                    khuyến mại và sự kiện của P&G. Các thông tin này sẽ được gửi
                    qua tin nhắn với tần suất tối đa 4 lần/tháng. Sự đồng ý của
                    bạn sẽ thay thế các lựa chọn từ chối quảng cáo trước đó (bao
                    gồm cả việc bạn đã đăng ký danh sách không nhận cuộc gọi
                    quảng cáo "Do not call list”), và bạn sẽ thông báo cho P&G
                    biết nếu muốn từ chối nhận quảng cáo. {" "}
                  </p>
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
                              "Nhận quà ngay"
                            )}
                          </button>
                        ) : (
                          <div className="flex justify-around -mt-[70px]">
                            <a
                              href={"tel:" + "02836222399"}
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
                              className="border_btn-agree text-white bg-[#2B67BE] px-1 
                      rounded-xl text-[13px] font-semibold-mon"
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
                                  Xác nhận đủ quà
                                  <br /> hoặc lượt quay
                                </>
                              ) : (
                                "Nhận quà ngay"
                              )}
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {check1 && check2 ? (
                          <div>
                            <button
                              style={styleButtonOk}
                              className="border_btn-agree text-[16px] bg-[#4E7CCF] px-8 rounded-xl py-3"
                              defaultValue="Đồng ý"
                              onClick={handleClickOk}
                            >
                              Tiếp tục
                            </button>
                          </div>
                        ) : (
                          <div>
                            <div className="text-red-600 font-semibold text-[18px] relative bottom-1">
                              {checkStatus}
                            </div>
                            <button
                              style={styleButtonOk}
                              className="border_btn-agree text-[16px] bg-[#d3d3d3] px-8 rounded-xl py-3"
                              defaultValue="Đồng ý"
                              onClick={handleClickNoOk}
                            >
                              Tiếp tục
                            </button>
                          </div>
                        )}
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
