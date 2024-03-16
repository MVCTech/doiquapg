import BG_LIGHT_CODE from "../../assets/fontawesome/image/bg-ligh-code.png";
import BT_LEFT from "../../assets/fontawesome/image/bt-left.png";
import BT_RIGHT from "../../assets/fontawesome/image/bt-right.png";
import POPUP_CARD_TOP from "../../assets/fontawesome/image/popup-card-top.png";
import POPUP_CARD_BOTTOM from "../../assets/fontawesome/image/popup-card-bottom.png";
import POPUP_GUIDE from "../../assets/fontawesome/image/popup-guide-freefire.png";
import GIFT_CODE from "../../assets/fontawesome/image/code.png";
import { WHEEL_LUOTQUAY, WHEEL_PHANTHUONG } from "../../utils/KeyConstant";
import { useNavigate, useParams } from "react-router-dom";
import { Fragment, useEffect, useRef, useState } from "react";
import { luckyDrawService } from "../../services/apiService/LuckyDraw";

export default function PageReceiveGiftCodeAuto() {
  const navigation = useNavigate();
  const [giftCodeDetails, setGiftCodeDetails] = useState();
  const { id } = useParams();
  const data = JSON.parse(localStorage.getItem(WHEEL_PHANTHUONG));
  const dataLuotQuay = JSON.parse(localStorage.getItem(WHEEL_LUOTQUAY));
  let appCode = window.location.pathname.split("/")[1];
  let giftCode = window.location.pathname.split("/")[2];
  let soids = window.location.pathname.split("/")[3];
  console.log(data?.gift_code.includes("cbmm"));
  console.log(appCode);
  console.log(soids);
  console.log(giftCode);
  const [isOpen, setIsOpen] = useState(false);
  const handleBack = () => {
    if (dataLuotQuay === 0) {
      navigation(`/`);
    } else {
      navigation(`/spin-freefire/${soids}`);
    }
  };
  useEffect(() => {
    luckyDrawService
      .getDetailGiftCode(giftCode)
      .then((res) => {
        console.log(res);
        setGiftCodeDetails(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
  }
  const handleOpenGuide = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Fragment>
      {" "}
      {isOpen ? (
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
                <img
                  src={POPUP_GUIDE}
                  className="relative z-50 top-10"
                  onClick={handleOpenGuide}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative top-0 bg-black min-h-full">
          <img
            src={BG_LIGHT_CODE}
            className="animation-bg-code relative top-0"
          />
          <div className="absolute top-[10%] px-5 text-white">
            <div className="relative">
              <div className="relative">
                <div className="relative top-0">
                  <img src={POPUP_CARD_TOP} />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: giftCodeDetails?.conditions_receiving_prize,
                    }}
                    className="absolute bottom-10 text-justify text-[12px] px-10 w-full"
                  ></div>
                </div>
                <div className="absolute top-10 w-full">
                  <div className="relative text-center">
                    <div>
                      <div className="text-[#FFED00] font-bold-mon text-[32px]">
                        CHÚC MỪNG
                      </div>
                      <div className="text-[14px]">Bạn đã trúng</div>
                    </div>

                    <div className="font-bold-mon text-[#FFED00] mt-5">
                      {giftCodeDetails?.gift_name}
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                  <img src={giftCodeDetails?.image} />
                  <div className="relative top-0 w-full">
                    <div className="absolute top-0 w-full">
                      <div
                        className="relative w-full"
                        onClick={copyToClipboard}
                      >
                        <input
                          ref={textAreaRef}
                          className="absolute w-10/12 text-[14px] z-50 -mt-1 top-3 pr-5 font-semibold-mon text-center input-hidden-link"
                          value={giftCode}
                        />
                        <img src={GIFT_CODE} />
                        {/* <div className="absolute z-50 top-1 left-1/2 -translate-x-1/2 pr-5 font-semibold-mon text-right input-hidden-link">
                      {giftCode}
                    </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative top-0 w-full">
                <img src={POPUP_CARD_BOTTOM} className="relative top-0" />
                <div className="absolute top-1/2 -translate-y-1/2 left-[5%]">
                  <button
                    className="relative w-10/12 left-1/2 -translate-x-1/2"
                    onClick={handleOpenGuide}
                  >
                    <img src={BT_LEFT} className="w-full" />
                    <div className="absolute font-bold-mon top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-[11px] w-full">
                      HƯỚNG DẪN
                      <br /> ĐỔI MÃ
                    </div>
                  </button>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-[5%]">
                  <button
                    className="relative font-bold-mon w-10/12 left-1/2 -translate-x-1/2"
                    onClick={handleBack}
                  >
                    <img src={BT_RIGHT} />
                    <div className="absolute font-bold-mon top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-[11px] w-full">
                      <Fragment>
                        BẠN CÒN{" "}
                        <span className="text-[12px] text-yellow-300">
                          {giftCodeDetails?.wheel}
                        </span>
                        <br />
                        LƯỢT QUAY
                      </Fragment>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
