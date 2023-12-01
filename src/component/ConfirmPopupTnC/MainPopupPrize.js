import React from "react";
import "../../assets/css/backgroundNotifyGift.css";
import Image from "../../assets/fontawesome/image/popup-tc.png";
import PropTypes from "prop-types";
import { useState } from "react";

MainPopupPrize.propTypes = {
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

export default function MainPopupPrize({ flagButton, setShow, titlePopup }) {
  const [checkStatus, setCheckStatus] = useState("");
  const handleClickOk = () => {
    setShow(false);
    localStorage.removeItem("prize")
  };
  return (
    <div className="relative z-50">
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
                     ? "top-[170px] h-[60%]"
                     : "top-[120px] h-[58%]"
                 }`}
                >
                  <p
                    className="containerNotify__background-list dont-break-out font-regular-mon
                   text-justify text-[#333] text-[13px] px-1 py-3"
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: titlePopup,
                      }}
                    ></div>
                  </p>
                </div>

                <div
                  className={`relative w-[99%] left-1/2 -translate-x-1/2 ${
                    flagButton === "gift_prize" ? "top-10" : ""
                  } `}
                >
                  <div className="relative z-50">
                    <img
                      src={Image}
                      className="w-10/12 relative z-[9999999] left-1/2 -translate-x-1/2"
                    />
                  </div>
                  <div className="absolute z-[9999] left-1/2 -translate-x-1/2 w-11/12 bottom-5 px-8">
                    <>
                      <div>
                        <div className="text-red-600 font-semibold text-[18px] relative bottom-1">
                          {checkStatus}
                        </div>
                        <button
                          style={styleButtonOk}
                          className="border_btn-agree text-[16px] bg-[#4E7CCF] px-8 rounded-xl py-3"
                          defaultValue="Đồng ý"
                          onClick={handleClickOk}
                        >
                          Tiếp tục
                        </button>
                      </div>
                    </>
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
