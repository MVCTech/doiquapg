import BG_LIGHT_CODE from "../../assets/fontawesome/image/bg-ligh-code.png";
import BT_LEFT from "../../assets/fontawesome/image/bt-left.png";
import BT_RIGHT from "../../assets/fontawesome/image/bt-right.png";
import POPUP_CARD_TOP from "../../assets/fontawesome/image/popup-card-top.png";
import POPUP_CARD_BOTTOM from "../../assets/fontawesome/image/popup-card-bottom.png";
import GIFT_TEST from "../../assets/fontawesome/image/gift-test.png";
import GIFT_CODE from "../../assets/fontawesome/image/code.png";
import { WHEEL_LUOTQUAY, WHEEL_PHANTHUONG } from "../../utils/KeyConstant";
import { useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react";

export default function PageReceiveGiftCode() {
  const navigation = useNavigate();
  const { id } = useParams();
  const data = JSON.parse(localStorage.getItem(WHEEL_PHANTHUONG));
  const dataLuotQuay = JSON.parse(localStorage.getItem(WHEEL_LUOTQUAY));
  let appCode = window.location.pathname.split("/")[1];
  let giftCode = window.location.pathname.split("/")[2];
  console.log(data?.gift_code.includes("cbmm"));
  const handleBack = () => {
    if (dataLuotQuay === 0) {
      navigation(`/list-rotation`);
    } else {
      navigation(`/spin-freefire/${id}`);
    }
  };
  return (
    <div className="relative top-0 bg-black min-h-full">
      <img src={BG_LIGHT_CODE} className="animation-bg-code relative top-0" />
      <div className="absolute top-[10%] px-5 text-white">
        <div className="relative">
          <div className="relative">
            <div className="relative top-0">
              <img src={POPUP_CARD_TOP} />
              {data?.gift_code.includes("cbmm") ? null : (
                <div className="absolute bottom-10 text-justify text-[12px] px-10 w-full">
                  {data?.message}
                </div>
              )}
            </div>
            <div className="absolute top-10 w-full">
              <div className="relative text-center">
                {data?.gift_code.includes("cbmm") ? null : (
                  <div>
                    <div className="text-[#FFED00] font-bold-mon text-[32px]">
                      CHÚC MỪNG
                    </div>
                    <div className="text-[14px]">Bạn đã trúng</div>
                  </div>
                )}

                <div className="font-bold-mon text-[#FFED00] mt-5">
                  {data?.gift}
                </div>
              </div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
              <img src={data?.gift_image} />
              {appCode !== "receive-code" ? (
                <div className="relative top-0 w-full">
                  <div className="absolute top-0">
                    <div className="relative">
                      <img src={GIFT_CODE} />
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 pr-5">
                        {giftCode}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="relative top-0 w-full">
            <img src={POPUP_CARD_BOTTOM} className="relative top-0" />
            <div className="absolute top-1/2 -translate-y-1/2 left-[5%]">
              <button className="relative w-9/12 left-1/2 -translate-x-1/2">
                <img src={BT_LEFT} />
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-[10px] w-full">
                  HƯỚNG DẪN
                  <br /> ĐỔI MÃ
                </div>
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-[5%]">
              <button
                className="relative w-9/12 left-1/2 -translate-x-1/2"
                onClick={handleBack}
              >
                <img src={BT_RIGHT} />
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-[10px] w-full">
                  {dataLuotQuay === 0 ? (
                    <Fragment>
                      BẠN HẾT <br /> LƯỢT QUAY
                    </Fragment>
                  ) : (
                    <Fragment>
                      BẠN CÒN{" "}
                      <span className="text-[12px] text-yellow-300">
                        {dataLuotQuay > 9 ? dataLuotQuay : "0" + dataLuotQuay}
                      </span>
                      <br />
                      LƯỢT QUAY
                    </Fragment>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
