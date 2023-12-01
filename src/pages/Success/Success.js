import React from "react";
import check_img from "../../assets/fontawesome/image/check-img.png";
import home_icon from "../../assets/fontawesome/image/home_blue.png";
import gift_icon from "../../assets/fontawesome/image/Gift-success.png";
import { Link } from "react-router-dom";
import "./Success.css";

export default function Success() {
  const appCode = localStorage.getItem("CAMPAIGN_CODE");
  return (
    <div>
      <div className="success contain text-[#FFFFFF]">
        <div className="temp">
          <div className="pt-[102px] flex justify-center text-center text-[24px] font-semibold-mon">
            <h1>
              Chúc mừng bạn <br /> đã đổi quà thành công
            </h1>
          </div>
          <div className="flex justify-center mt-[145px] ">
            <img src={check_img} alt="" />
          </div>
          <div className="flex justify-center gap-1 mt-[250px] ">
            <Link to={`/${appCode}`} className="bg-[#47CCFF] success-btn">
              <img src={home_icon} alt="" />
              <span>Về trang chủ</span>
            </Link>
            <Link
              to={`/list-gift/${appCode}`}
              className="bg-[#1D86FA] success-btn"
            >
              <img src={gift_icon} alt="" />
              <span>Quà của tôi</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
