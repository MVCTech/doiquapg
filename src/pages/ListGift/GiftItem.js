import { Fragment, useState } from "react";
import "../../assets/css/font-text.css";
import PropTypes from "prop-types";
import { useEffect } from "react";
import TORIGHT from "../../assets/fontawesome/image/toright.png";
import COPY from "../../assets/fontawesome/image/icno-copy.png";

GiftItem.propTypes = {
  infor: PropTypes.string,
};
export default function GiftItem({ infor, current, setOpenPopup }) {
  console.log(infor);
  const [status, setStatus] = useState(false);
  const handleToggle = () => {
    setStatus(!status);
  };
  function reformatDate(dateStr) {
    const date = dateStr.substring(0, dateStr.indexOf(" "));
    let dArr = date.split("-"); // ex input: "2010-01-18"
    return dArr[2] + "/" + dArr[1] + "/" + dArr[0]; //ex output: "18/01/10"
  }
  useEffect(() => {
    setStatus(false);
  }, [current]);

  const handleCopy = async () => {
    let pin = document.getElementById("myPin").innerHTML;
    try {
      await navigator.clipboard.writeText(pin);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  const handlePopupPrize = (e) => {
    localStorage.setItem("prize", e);
    setOpenPopup(true);
  };
  return (
    <>
      <li className={`mx-[25px] bg-[#f0f0f0] rounded-xl mb-4 overflow-hidden`}>
        <div
          className="relative z-40 flex pt-[13px] pl-[14px] pb-2"
          onClick={handleToggle}
        >
          <div className="flex items-center">
            <img src={infor.gift_image} className="w-16 " />
          </div>
          <div className="ml-2">
            <div className="text-reponsive font-regular-mon text-[16px] leading-6">
              Bạn đã trúng phần quà là
            </div>
            <div className="font-semibold-mon text-[16px] ">{infor.gift}</div>
            {infor.exchange_status_str !== "Chưa nhận" ? (
              <div className="item-status font-regular-mon text-[#00AF43]">
                Đã nhận{" "}
                {infor?.urbox_details === "" ? null : (
                  <Fragment>{infor?.urbox_details}</Fragment>
                )}
              </div>
            ) : (
              <div className="item-status font-regular-mon text-red-600 ">
                {infor.exchange_status_str}
              </div>
            )}
          </div>
        </div>
        {status === true ? (
          <div
            className={`product-infomation pl-[14px] py-2${
              infor?.exchange_status_str === "Chưa nhận" ? "" : ""
            }`}
          >
            {infor?.is_physical_gift === true ? (
              <div className="text-item-gift font-light-mon mt-1">
                ID
                <div className="pr-3 font-semibold-mon text-[#363534]">
                  {infor.id}
                </div>
              </div>
            ) : null}
            <div className="text-item-gift font-light-mon mt-1">
              Chương trình
              <div className="pr-3 font-semibold-mon text-[#52A0F7] text-right">
                {infor.campaign_name}
              </div>
            </div>
            <div className="text-item-gift font-light-mon mt-1">
              Ngày tham gia
              <div className="pr-3 font-semibold-mon corlor-text-darkblack">
                {infor.attend_date}
              </div>
            </div>
            {infor?.is_physical_gift === true ? (
              <div className="text-item-gift font-light-mon mt-1">
                Ngày đổi quà
                <div className="pr-3 font-semibold-mon corlor-text-darkblack">
                  {infor.exchange_date === ""
                    ? null
                    : reformatDate(infor.exchange_date)}
                </div>
              </div>
            ) : null}
            {infor?.gift_type === "evoucher_urbox" ? (
              <div className="text-item-gift font-light-mon mt-1">
                Ngày hết hạn sử dụng
                <div className="pr-3 font-semibold-mon corlor-text-darkblue">
                  {infor?.exchange_expired_date}
                </div>
              </div>
            ) : null}
            {infor?.is_physical_gift === false ? (
              <div className="font-regular-mon mt-1 justify-between text-[12px] text-[#1D86FA] flex flex-nowrap">
                Link
                <div className="pr-3 font-semibold-mon corlor-text-darkblue text-[14px] text-right">
                  <a href={infor?.urbox_link} target="_blank">
                    {infor?.urbox_link}
                  </a>
                </div>
              </div>
            ) : null}
            {infor?.gift_type === "evoucher_urbox" ? (
              <div
                className="font-regular-mon mt-1 text-[12px] text-[#fa1d1d] flex justify-between pb-5"
                onClick={handleCopy}
              >
                Mã bảo vệ
                <div className="flex">
                  <div className="font-semibold-mon" id="myPin">
                    {infor?.urbox_pin}
                  </div>
                  <div className="px-3 tooltip" onClick={handleCopy}>
                    <img src={COPY} />
                    <span class="tooltiptext font-semibold-mon">
                      Đã sao chép!!
                    </span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <></>
        )}
        <div className="flex justify-between">
          {status === true ? (
            <div className="flex justify-center items-center">
              {infor?.is_physical_gift === true ? (
                <Fragment>
                  <div className="img-code ml-2 items-center mt-2 bg-white ">
                    <img
                      src={"data:image/png;base64," + infor?.qrcode}
                      size={80}
                    />
                  </div>
                </Fragment>
              ) : null}
              <div
                className={`${
                  infor?.is_physical_gift === true
                    ? `bg-[#003DA5] h-14 text-white rounded-xl px-3 py-1 ml-2 flex items-center`
                    : `mb-3 bg-[#003DA5] h-14 text-white rounded-xl px-3 py-1 ml-2 flex items-center`
                }`}
                onClick={() => handlePopupPrize(infor?.prize_exchange_manual)}
              >
                <div className="font-semibold-mon">
                  Hướng dẫn
                  <br /> đổi quà
                </div>
                <div className="ml-3">
                  <img src={TORIGHT} />
                </div>
              </div>
            </div>
          ) : (
            <div
              className="font-text-13 font-regular-mon text-[#4F4F4F] pl-5 mt-2"
              onClick={handleToggle}
            >
              Ngày trúng thưởng{" "}
              <span className="text-[#003DA5]">{infor.attend_date}</span>
            </div>
          )}
          <div className=" flex flex-col justify-end items-end">
            <div
              className=" bgr-icon-back flex background-bottom-icon w-10 h-10 z-30"
              onClick={handleToggle}
            >
              {status === true ? (
                <div className="icon-droptop icon-size"></div>
              ) : (
                <div className="icon-dropdown icon-size"></div>
              )}
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
