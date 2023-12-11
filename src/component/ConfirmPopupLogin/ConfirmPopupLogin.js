import React from "react";
import Image from "../../assets/fontawesome/image/poup-noti.png";
import phone_icon from "../../assets/fontawesome/image/phone-icon.png";
import PropTypes from "prop-types";
import "../../assets/css/popupPhone.css";
import "../../assets/css/backgroundNotifyGift.css";

ConfirmPopupLogin.propTypes = {
  image: PropTypes.string,
  labelCancel: PropTypes.func,
  labelOK: PropTypes.func,
  titlePopup: PropTypes.string,
  onClosePopup: PropTypes.func,
  handleCancel: PropTypes.string,
  handleOk: PropTypes.string,
};
const styleButton = {
  color: "#ffffff",
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "20px",
};
const styleButtonOk = {
  color: "#fff",
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "20px",
};

export default function ConfirmPopupLogin({
  image,
  labelCancel,
  statusError,
  labelOK,
  titlePopup,
  onClosePopup = () => {},
  handleCancel,
  handleOk,
  phone,
}) {
  const handleClickCancel = () => {
    onClosePopup();
    handleCancel();
  };
  const handleClickOk = () => {
    handleOk();
  };
  return (
    <div className="z-50">
      <div
        className="fixed z-50 overflow-y-auto top-0 w-full left-0 show"
        id="modal"
      >
        <div className="flex items-center justify-center min-height-100vh px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-900 opacity-70" />
            <div className="content-popup-condition w-full">
              <div className="popup-otp relative top-10 w-full z-50">
                <div
                  className={`absolute w-10/12 rounded-3xl mt-3 top-1/2 -translate-y-1/2 z-50 left-1/2 text-[#333333] 
                -translate-x-1/2 bg-white border-notify ${
                  statusError ? "py-1 h-[130px]" : "py-6 h-28"
                }`}
                >
                  <label className="w-full font-regular-mon absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                    {titlePopup}{" "}
                    <span className="font-semibold-mon text-[#003DA5]">
                      {phone}
                    </span>
                  </label>
                </div>
                <div className="relative left-1/2 -translate-x-1/2">
                  <img
                    src={Image}
                    className="relative left-1/2 -translate-x-1/2"
                  />
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-8 flex justify-center  items-center">
                    {statusError ? (
                      <a
                        href={"tel:" + "02836222399"}
                        className="bg-[#00AF43] hotline-btn text-[#ffffff] flex
                         justify-center items-center rounded-[16px] px-[10px] py-[12px] gap-1 h-14 w-[120px] mr-2"
                      >
                        <img src={phone_icon} alt="" />
                        <span className="font-semibold-mon w-full text-[13px]">
                          Liên hệ <br />
                          Hỗ trợ
                        </span>
                      </a>
                    ) : (
                      <input
                        style={styleButton}
                        type="button"
                        className="conatiner__notify-btnClose text-[#ffffff] text-[16px] flex justify-center items-center align-middle format-button-popup bg-[#00AF43]"
                        defaultValue={labelCancel}
                        value={labelCancel}
                        onClick={handleClickCancel}
                      />
                    )}

                    <input
                      style={styleButtonOk}
                      type="button"
                      className="conatiner__notify-btnOK text-[16px] bg-[#4E7CCF] flex justify-center format-button-popup"
                      defaultValue={labelOK}
                      value={labelOK}
                      onClick={handleClickOk}
                    />
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
