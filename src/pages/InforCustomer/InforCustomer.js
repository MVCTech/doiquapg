import HeaderBackground from "../../component/HeaderBackground/HeaderBackground";
import ICON_NOTIFY from "../../assets/fontawesome/image/icon_notify.svg";
import NavbarHome from "../../component/NavbarHome/NavbarHome";
import GHIM from "../../assets/fontawesome/image/ghim.png";
import ICON_HISTORY_PARTICI from "../../assets/fontawesome/image/icon-history-participate.png";
import UPDATE_INFOR from "../../assets/fontawesome/image/update-infor.png";
import "../../assets/css/inforCustomer.css";
import ICON_RIGHT from "../../assets/fontawesome/image/icon-right.png";
import LOGOUT from "../../assets/fontawesome/image/logout.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ConfirmPopupLogin from "../../component/ConfirmPopupLogin/ConfirmPopupLogin";
import CheckPermission from "../../component/PopupPermissionCamera/CheckPermission";
import { image_android, image_ios } from "../../utils/dataFormat";
import { userServices } from "../../services/apiService/userServices";
import { useDispatch } from "react-redux";
import { setLogout } from "../../Redux/Action/userAction";
import { setAuthorization } from "../../services/apiService/configURL";
import LOCKAUTH from "../../assets/fontawesome/image/lock-auth-icon.png";
import { luckyDrawService } from "../../services/apiService/LuckyDraw";
import { WHEEL_LUOTQUAY, WHEEL_PHANTHUONG } from "../../utils/KeyConstant";

const TITLE = "Thông tin khách hàng";
const clickFilter = `/list-notify/tick`;

export default function InforCustomer() {
  const navigation = useNavigate();
  const appCode = localStorage.getItem("CAMPAIGN_CODE");
  const { token } = JSON.parse(localStorage.getItem("USER_DATA_LOCAL") || "{}");
  const login_type = localStorage.getItem("LOGIN_TYPE");
  const [isPopupLogout, setIsPopupLogout] = useState(false);
  const [isOpenPermission, setPopupGuide] = useState();
  const dispatch = useDispatch();
  const handleLogout = () => {
    setIsPopupLogout(true);
  };
  const handleHistory = () => {
    navigation(`/participate-history/tick`);
  };
  const handleChangePassword = () => {
    navigation(`/change-password/tick`);
  };
  const handleGhim = () => {
    setPopupGuide(true);
  };
  const handleLogoutSystem = () => {
    {
      userServices
        .postUserLogout()
        .then((res) => {
          dispatch(setLogout());
          localStorage.removeItem("contact");
          localStorage.removeItem("phoneData");
          localStorage.removeItem("USER_DATA_LOCAL");
          localStorage.removeItem("WINNING_GIFT");
          localStorage.removeItem("SET_CHECK_CAM");
          localStorage.removeItem("GCS_RESULT");
          localStorage.removeItem("PHONE_NUMBER");
          localStorage.removeItem("NAME_USER");
          localStorage.removeItem(WHEEL_LUOTQUAY);
          localStorage.removeItem(WHEEL_PHANTHUONG);
          navigation(`${login_type === "password" ? "/login" : "/login"}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    setAuthorization(token);
    luckyDrawService
      .getLuckyDrawList()
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <HeaderBackground
        TITLE={TITLE}
        buttonBack={`/${appCode}`}
        filter={ICON_NOTIFY}
        clickFilter={clickFilter}
      />
      <div className="containerNotify__background bg-[#fff] absolute rounded-[30px_30px_0_0] top-20 h-[90%] w-full z-10">
        <ul className="containerNotify__background-list mt-8 mx-6 box-border z-20 grid-rows-2">
          <NavLink
            to="/update-customer-info/tick"
            className="content-info-li font-regular-mon py-1 rounded-xl"
          >
            <div className="icon-infor-li">
              <img src={UPDATE_INFOR} className="w-5" />
            </div>
            <div className="text-center">Cập nhật thông tin cá nhân</div>
            <div className="ml-auto mr-6">
              <img src={ICON_RIGHT} />
            </div>
          </NavLink>
          <li
            className="content-info-li font-regular-mon mt-3 py-1 rounded-xl"
            onClick={handleChangePassword}
          >
            <div className="icon-infor-li">
              <img src={LOCKAUTH} className="w-5" />
            </div>
            <div>Thay đổi mật khẩu</div>
            <div className="ml-auto mr-6">
              <img src={ICON_RIGHT} />
            </div>
          </li>
          <li
            className="content-info-li font-regular-mon mt-3 py-1 rounded-xl"
            onClick={handleHistory}
          >
            <div className="icon-infor-li">
              <img src={ICON_HISTORY_PARTICI} className="w-5" />
            </div>
            <div>Lịch sử tham gia</div>
            <div className="ml-auto mr-6">
              <img src={ICON_RIGHT} />
            </div>
          </li>
          <li
            className="content-info-li font-regular-mon py-1 mt-3 rounded-xl"
            onClick={handleGhim}
          >
            <div className="icon-infor-li">
              <img src={GHIM} className="w-4" />
            </div>
            <div>Ghim Website vào màn hình </div>
            <div className="ml-auto mr-6">
              <img src={ICON_RIGHT} />
            </div>
          </li>
          <li
            className="content-info-li font-regular-mon py-1 mt-3 rounded-xl"
            onClick={handleLogout}
          >
            <div className="py-[15px] px-4">
              <img src={LOGOUT} className="w-5" />
            </div>
            <div>Đăng xuất</div>
            <div className="ml-auto mr-6">
              <img src={ICON_RIGHT} />
            </div>
          </li>
        </ul>
      </div>
      {isPopupLogout ? (
        <ConfirmPopupLogin
          titlePopup={"Bạn có muốn đăng xuất thiết bị này"}
          labelCancel={"Để sau"}
          labelOK={"Đồng ý"}
          handleCancel={() => {
            setIsPopupLogout(false);
          }}
          handleOk={() => handleLogoutSystem()}
        />
      ) : null}
      {isOpenPermission ? (
        <CheckPermission
          dataAndroid={image_android}
          dataIOS={image_ios}
          typePopup={"ghimWebsite"}
          setPopupGuide={setPopupGuide}
        />
      ) : null}
      <NavbarHome />
    </div>
  );
}
