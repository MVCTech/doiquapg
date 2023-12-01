import ICON_HOME_COLOR from "../../assets/fontawesome/image/home_icon_color.svg";
import ICON_PROFILE_COLOR from "../../assets/fontawesome/image/profile_icon-color.png";
import ICON_GIFT_COLOR from "../../assets/fontawesome/image/gift_icon-color.svg";
import ICON_TAKEPHOTO_COLOR from "../../assets/fontawesome/image/takephoto_icon-color.svg";
import HOME_ICON from "../../assets/fontawesome/image/home_icon.svg";
import PROFILE_ICON from "../../assets/fontawesome/image/profile_icon.svg";
import GIFT_ICON from "../../assets/fontawesome/image/gift_icon.svg";
import TAKEPHOTO_ICON from "../../assets/fontawesome/image/takephoto_icon.svg";
import "../../assets/css/Home.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import ConfirmPopupGuideTakePhoto from "../ConfirmPopupGuideTakePhoto/ConfirmPopupGuideTakePhoto";

export default function NavbarHome() {
  const login_type = localStorage.getItem("LOGIN_TYPE");
  const location = useLocation();
  const { token } = JSON.parse(localStorage.getItem("USER_DATA_LOCAL") || "{}");
  const appCode = localStorage.getItem("CAMPAIGN_CODE");
  const navigation = useNavigate();
  const handleClickMenuHome = () => {
    navigation(`/${appCode}`);
  };
  const [isGuidePopup, setIsGuidePopup] = useState(false);
  const [isOpenPopupGuide, setIsOpenPopupGuide] = useState();
  const handleClickMenuTakePhoto = (status) => {
    setIsGuidePopup(status);
    setIsOpenPopupGuide(true);
  };
  const handleClickMenuProfile = () => {
    if (token) {
      if (appCode === "") {
        navigation(`/infor-customer`);
      } else {
        navigation(`/infor-customer`);
      }
    } else {
      navigation(
        `${login_type === "password" ? "/login-password" : "/login-password"}`
      );
    }
  };
  const handleClickMenuGift = () => {
    if (token) {
      navigation(`/list-gift`);
    } else {
      navigation(
        `${login_type === "password" ? "/login-password" : "/login-password"}`
      );
    }
  };
  return (
    <div className="navbar__home w-[100%] h-[82px] rounded-t-3xl bg-[#fff] fixed bottom-0 left-0 z-30">
      <div className="flex justify-between">
        <ul className="px-1 mt-1 h-[60px] w-full grid grid-cols-4 gap-2">
          <li className="icon-nav-home col-span-1">
            {location?.pathname === `/${appCode}` ? (
              <div className="flex justify-center">
                <img src={ICON_HOME_COLOR} className="w-8 h-9" />
              </div>
            ) : (
              <div className="flex justify-center">
                <img
                  src={HOME_ICON}
                  className="w-6 h-9"
                  onClick={handleClickMenuHome}
                />
              </div>
            )}
            <div
              className="w-full font-semibold-mon flex justify-center text-[13px]"
              style={{
                color: `${
                  location?.pathname === `/${appCode}` ? "#003DA5" : "#333333"
                }`,
              }}
            >
              Trang chủ
            </div>
          </li>

          <li className="icon-nav-home col-span-1">
            {location?.pathname === `/guide-takeaphoto` ? (
              <img src={ICON_TAKEPHOTO_COLOR} className="w-20 h-12" />
            ) : (
              <div className="flex justify-center">
                <img
                  src={TAKEPHOTO_ICON}
                  className="w-6 h-9"
                  onClick={() => handleClickMenuTakePhoto(false)}
                />
              </div>
            )}
            <div
              className="w-full font-semibold-mon flex justify-center text-[13px]"
              style={{
                color: `${
                  location?.pathname === `/guide-takeaphoto`
                    ? "#003DA5"
                    : "#333333"
                }`,
              }}
            >
              Chụp hình
            </div>
          </li>

          <li className="icon-nav-home col-span-1">
            {location?.pathname === `/list-gift` ? (
              <div className="flex justify-center">
                <img src={ICON_GIFT_COLOR} className="w-8" />
              </div>
            ) : (
              <div className=" flex justify-center">
                <img
                  src={GIFT_ICON}
                  onClick={handleClickMenuGift}
                  className="w-6 h-8"
                />
              </div>
            )}
            <div
              className="mt-1 w-full font-semibold-mon flex justify-center text-[13px]"
              style={{
                color: `${
                  location?.pathname === `/list-gift` ? "#003DA5" : "#333333"
                }`,
              }}
            >
              Quà của tôi
            </div>
          </li>

          <li className="icon-nav-home col-span-1">
            {location?.pathname === `/infor-customer` ? (
              <div className="flex justify-center">
                <img src={ICON_PROFILE_COLOR} className="w-8" />
              </div>
            ) : (
              <div className="flex justify-center">
                <img
                  src={PROFILE_ICON}
                  className="w-6 h-8"
                  onClick={handleClickMenuProfile}
                />
              </div>
            )}
            <div
              className="mt-1 w-full font-semibold-mon flex justify-center text-[13px]"
              style={{
                color: `${
                  location?.pathname === `/infor-customer`
                    ? "#003DA5"
                    : "#333333"
                }`,
              }}
            >
              Tài khoản
            </div>
          </li>
          {isOpenPopupGuide ? (
            <ConfirmPopupGuideTakePhoto
              isGuidePopup={isGuidePopup}
              setIsOpenPopupGuide={setIsOpenPopupGuide}
            />
          ) : null}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
