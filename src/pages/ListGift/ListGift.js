import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import IconPhoneAndZalo from "../../component/IconPhoneAndZalo/IconPhoneAndZalo";
import NavbarHome from "../../component/NavbarHome/NavbarHome";
import GiftItem from "./GiftItem";
import "../../assets/css/listGift.css";
import { setAuthorization } from "../../services/apiService/configURL";
import { userServices } from "../../services/apiService/userServices";
import MainPopupPrize from "../../component/ConfirmPopupTnC/MainPopupPrize";
import HeaderBackground from "../UpdateCustomerInfo/HeaderBackground";

const TITLE = "Quà của tôi";

export default function () {
  let { token } = useSelector((state) => {
    return state.userReducer.userData;
  });
  const appCode = localStorage.getItem("CAMPAIGN_CODE");
  const location = useLocation();
  const back = location.pathname.split("/")[3];
  const [current, setCurrent] = useState("1");
  const [items, setItems] = useState();
  const [openPopup, setOpenPopup] = useState();

  setAuthorization(token);
  useEffect(() => {
    userServices
      .getMyPrizeList()
      .then((res) => {
        console.log(res);
        setItems(res.list_prizes);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  }, []);

  return (
    <div>
      <HeaderBackground
        TITLE={TITLE}
        buttonBack={`${back === "tick" ? `/infor-customer` : `/${appCode}`}`}
      />
      <div className="containerNotify__background absolute z-30 top-20 h-[88%] w-full ">
        <ul className="containerNotify__background-listnoti pt-7 box-border bottom-20 z-40 ">
          {items?.map((infor, index) => {
            return (
              <Fragment key={index}>
                <GiftItem
                  infor={infor}
                  current={current}
                  setOpenPopup={setOpenPopup}
                />
              </Fragment>
            );
          })}
          <div className="h-20"></div>
        </ul>
      </div>
      {openPopup ? (
        <MainPopupPrize
          titlePopup={localStorage.getItem("prize")}
          setShow={setOpenPopup}
        />
      ) : null}
      <IconPhoneAndZalo />
      <NavbarHome />
    </div>
  );
}
