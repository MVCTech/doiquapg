import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { userServices } from "../../services/apiService/userServices";
import { useDispatch } from "react-redux";
import { setUserData } from "../../Redux/Action/userAction";
import { userDataLocal } from "../../services/localService/localService";
import { setAuthorization } from "../../services/apiService/configURL";
import ConfirmPopupLogin from "../../component/ConfirmPopupLogin/ConfirmPopupLogin";
import SubmitReceipt from "../../component/SubmitReceipt/SubmitReceipt";
import Image from "../../assets/fontawesome/image/gift.png";
import "../../assets/css/backgroundButton.css";
import "../../assets/css/backgroundHeader.css";
import "../../assets/css/background.css";
import "../../assets/css/backgroundNotifyGift.css";

let titlePopup = "Đăng kí thông tin để nhận phần quà hấp dẫn từ chúng tôi";

const styleButton = {
  color: "#333",
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "20px",
};
function ConfirmOTP() {
  const login_type = localStorage.getItem("LOGIN_TYPE");
  const appCode = localStorage.getItem("CAMPAIGN_CODE");
  document.body.style.backgroundColor = "black";
  const dispatch = useDispatch();
  let phone_data = localStorage.getItem("phoneData");
  let name_data = localStorage.getItem("phoneData");
  let { token } = userDataLocal.get();
  const navigation = useNavigate();
  let [otp, setOtp] = useState(0);
  let [otpParams, setOtpParams] = useState({});
  const [showNotify, setShowNotify] = useState(false);
  let gcsResult = JSON.parse(localStorage.getItem("GCS_RESULT"));
  const [triggerSubmitReceipt, setTriggerSubmitReceipt] = useState(false);
  const handleUpdateInfoLater = () => {
    if (gcsResult) {
      setTriggerSubmitReceipt(true);
    } else {
      navigation(`/${appCode}`);
    }
  };
  useEffect(() => {
    if (token) {
      navigation(`/${appCode}`);
    }
  }, []);
  const handleBack = (e) => {
    navigation(
      `${login_type === "password" ? "/login-password" : "/login-password"}`
    );
  };
  const handleClickShowInfoGift = () => {
    userServices
      .postValidateOTP(otpParams)
      .then((res) => {
        setAuthorization(res.token);
        userDataLocal.set(res);
        dispatch(setUserData(res));
        if (gcsResult) {
          setTriggerSubmitReceipt(true);
        } else {
          navigation(`/${appCode}`);
        }
      })
      .catch((e) => {
        toast.error(e);
      })
      .finally(() => {});
  };

  const handleChangeOtp = (e) => {
    setOtp(e);
    setOtpParams({ otp: e });
  };
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  const resendOTP = () => {
    const phoneFormat = {
      name: name_data,
      phone: phone_data,
    };
    userServices
      .postUserLogin(phoneFormat)
      .then((res) => {
        userDataLocal.set(res);
        dispatch(setUserData(res));
        toast.success("Gửi lại thành công");
        navigation(`/confirm-otp`);
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {});
    setMinutes(1);
    setSeconds(0);
  };

  return (
    <div className="container bg_default text-[#fff] w-screen min-w-full h-full min-h-screen px-[25px] flex flex-col box-border">
      <header
        className="icon-back mt-[7%] py-[36px] h-8 flex items-center opacity-100 max-w-full w-full z-50"
        onClick={(e) => handleBack(e)}
      >
        <i className="fa-solid fa-chevron-left fa-solid-back"></i>
      </header>
      <header className="p-0 w-52 h-9 leading-9 text-2xl not-italic font-[Montserrat] font-bold-mon">
        ĐĂNG NHẬP
      </header>
      <div className="container__login-item p-[16px_0_68px_0] text-[#fff] text-base font-light-mon w-[87%]">
        Một mã xác định gồm 6 chữ số đã gửi đến số điện thoại{" "}
        <span className="color-phone">{phone_data}</span>
      </div>
      <div className="container__input">
        <div className="container__input-otp flex justify-center mt-3 flex-col -mb-6 items-center">
          <OtpInput
            className="otp-element text-[#333]"
            value={otp}
            onChange={handleChangeOtp}
            numInputs={6}
            isInputNum={true}
            separator={<span> </span>}
          />
        </div>
        <div
          className="text-[#fff] flex justify-center font-light-mon mb-16"
          style={{ marginTop: "10px" }}
        >
          Không nhận được mã{" "}
          <span className="" style={{ color: "#3599E9" }}>
            {" "}
            <span>
              <div className="countdown-text">
                {" "}
                {seconds > 0 || minutes > 0 ? (
                  <p>
                    &nbsp;{minutes < 10 ? `0${minutes}` : minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </p>
                ) : (
                  <button
                    disabled={seconds > 0 || minutes > 0}
                    className=" text-[#3599e9] mx-1.5"
                    onClick={resendOTP}
                  >
                    Gửi lại
                  </button>
                )}
              </div>
            </span>
          </span>
        </div>
        <div className="flex justify-center py-[56px] box-border text-[#333] font-light-mon">
          {otp?.length === 6 ? (
            <input
              style={styleButton}
              id="button__D"
              type="button"
              className=" color-button-enable text-buttonOTP font-semibold-mon "
              value="Đăng nhập"
              onClick={() => handleClickShowInfoGift()}
            />
          ) : (
            <input
              style={styleButton}
              id="button__D"
              type="button"
              className=" color-button-disable text-buttonOTP  font-semibold-mon"
              value="Đăng nhập"
            />
          )}
        </div>
      </div>
      <SubmitReceipt trigger={triggerSubmitReceipt}></SubmitReceipt>

      {showNotify === true ? (
        <ConfirmPopupLogin
          labelCancel={"Để sau"}
          labelOK={"Đồng ý"}
          image={Image}
          titlePopup={titlePopup}
          onClosePopup={() => {
            setShowNotify(false);
          }}
          handleCancel={() => {
            handleUpdateInfoLater();
          }}
          handleOk={() => {
            navigation(`/register`);
          }}
        />
      ) : null}
    </div>
  );
}
export default ConfirmOTP;
