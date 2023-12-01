import "../../assets/css/backgroundListNotify.css";
import "../../assets/css/backgroundPhone.css";
import "../../assets/css/listNotify.css";
import LOGO_PG from "../../assets/fontawesome/image/logo_png.svg";
import IconPhoneAndZalo from "../../component/IconPhoneAndZalo/IconPhoneAndZalo";
import { useEffect, useState } from "react";
import { homeServices } from "../../services/apiService/homeServices";
import { NavLink } from "react-router-dom";
import HeaderBackground from "../UpdateCustomerInfo/HeaderBackground";

const TITLE = "Thông Báo";

function ListNotify() {
  const [listNotify, setListNotify] = useState([]);
  let tick = window.location.pathname.split("/")[2];
  const appCode = localStorage.getItem("CAMPAIGN_CODE");
  useEffect(() => {
    homeServices
      .getRunningCampaign(appCode)
      .then((res) => {
        setListNotify(res.campaign_list);
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="contain">
      <HeaderBackground
        TITLE={TITLE}
        buttonBack={`${tick === "tick" ? "/infor-customer" : `/${appCode}`}`}
      />
      <div className="containerNotify__background bg-[#fff] absolute rounded-[30px_30px_0_0] top-20 h-[86%] w-full z-10">
        <ul className="containerNotify__background-list pt-7 box-border  z-50">
          {listNotify.map((lstProduct) => (
            <NavLink to={`/deal-details/${lstProduct.id}`} key={lstProduct.id}>
              <li className="containerNotify__background-item">
                <img
                  src={
                    lstProduct.campaign_banner
                      ? lstProduct.campaign_banner
                      : LOGO_PG
                  }
                  alt="image"
                  className="containerNotify__background-itemImage max-w-[48px] rounded-lg"
                />
                <div className="containerNotify__background-itemChild pl-2.5 box-border">
                  <div className="containerNotify__background-itemChildName font-semibold-mon content-notify  ">
                    {lstProduct.name}
                  </div>
                  <div className="font-regular-mon containerNotify__background-itemChildContent content-notify  leading-[18px]">
                    {lstProduct.content}
                  </div>
                  <div className="containerNotify__background-itemChildTime font-light-mon">
                    Từ {lstProduct.start_date} đến {lstProduct.end_date}
                  </div>
                </div>
              </li>
            </NavLink>
          ))}
        </ul>
      </div>
      <IconPhoneAndZalo />
    </div>
  );
}
export default ListNotify;
