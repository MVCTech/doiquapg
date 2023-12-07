import { useState } from "react";
import { userDataLocal } from "../../services/localService/localService";
import "../../assets/css/background.css";
import "../../assets/css/backgroundHeader.css";
import "../../assets/css/Login.css";
import "../../assets/css/Register.css";
import "../../assets/css/background__Footer.css";
import "../../assets/css/font-text.css";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { userServices } from "../../services/apiService/userServices";
import { toast } from "react-toastify";
import { useEffect } from "react";
import MainPopupTnC from "../../component/ConfirmPopupTnC/MainPopupTnC";
import IconPhoneAndZalo from "../../component/IconPhoneAndZalo/IconPhoneAndZalo";
import Footer from "../../component/Footer/Footer";
import OtpInput from "react-otp-input";
import { setAuthorization } from "../../services/apiService/configURL";
import { useDispatch } from "react-redux";
import { setUserData } from "../../Redux/Action/userAction";
import HeaderBackground from "../UpdateCustomerInfo/HeaderBackground";
import SubmitReceipt from "../../component/SubmitReceipt/SubmitReceipt";

const TITLE = "Nhập OTP";
const styleButton = {
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "20px",
};
ConfirmOtpRegister.propTypes = {
  updateInfo: PropTypes.string,
};
const style = {
  width: "100%",
  border: "2px solid #98EBFF",
  borderRadius: "15px",
};
export default function ConfirmOtpRegister({ updateInfo }) {
  const [triggerSubmitReceipt, setTriggerSubmitReceipt] = useState(false);

  const navigation = useNavigate();
  const [checkAgree1, setCheckAgree1] = useState(false);
  const location = useLocation();
  const { otp_expired_minutes } = userDataLocal.get();
  const back = location.pathname.split("/")[2];
  const appCode = localStorage.getItem("CAMPAIGN_CODE");
  const phoneData = JSON.parse(localStorage.getItem("PHONE_NUMBER" || "{}"));
  let gcsResult = JSON.parse(localStorage.getItem("GCS_RESULT"));
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  let [otp, setOtp] = useState(0);
  let [otpParams, setOtpParams] = useState({});

  const [check1, setCheck1] = useState(checkAgree1);
  const [check2, setCheck2] = useState(checkAgree1);
  useEffect(() => {
    if (check1 === true && check2 === true) {
      setCheckAgree1(true);
    } else {
      setCheckAgree1(false);
    }
  }, [show]);
  const handleChangeOtp = (e) => {
    setOtp(e);
    setOtpParams({ otp: e });
  };
  const [minutes, setMinutes] = useState(otp_expired_minutes);
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
  const resendOTP = () => {
    const phoneFormat = {
      name: phoneData?.name,
      phone: phoneData?.phone,
      password: phoneData?.password,
      login_type: "otp",
    };
    userServices
      .postUserLogin(phoneFormat)
      .then((res) => {
        console.log(res);
        localStorage.setItem("PHONE_NUMBER", JSON.stringify(phoneFormat));
        userDataLocal.set(res);
        dispatch(setUserData(res));
        setAuthorization(res.token);
        if (gcsResult) {
          console.log(phoneData);
          if (phoneData === null) {
            let phoneCheck = phoneFormat?.phone;
            gcsResult = { ...gcsResult, phoneCheck };
            localStorage.setItem("GCS_RESULT", JSON.stringify(gcsResult));
            setTriggerSubmitReceipt(true);
          } else if (phoneData === gcsResult?.phoneCheck) {
            setTriggerSubmitReceipt(true);
          } else {
            // navigation(`/${appCode}`);
          }
        } else {
          // navigation(`/${appCode}`);
        }
        setMinutes(otp_expired_minutes);
        setSeconds(0);
        navigation(`/confirm-otp-register`);
      })
      .catch((err) => {
        toast.error(err);
        localStorage.removeItem("GCS_RESULT");
      })
      .finally(() => {
        console.log("finally");
      });
  };

  return (
    <div>
      <HeaderBackground
        TITLE={TITLE}
        buttonBack={`${back === "tick" ? `/infor-customer` : `/register-new`}`}
      />
      <div className=" w-full bg-white rounded-[30px_30px_0_0] absolute top-[80px] z-50">
        <div className="flex justify-center items-center px-[25px] max-h-full">
          <div className="block ">
            <div className="text-center font-italic-mon text-[13px] mt-5">
              Một mã xác định gồm 6 chữ số đã gửi đến số điện thoại{" "}
              <span className="text-[#003DA5] text-[20px] font-bold-mon">
                {phoneData?.phone}
              </span>
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
                className="text-[#333333] flex justify-center font-regular-mon mb-16"
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
                          className=" text-[#3599e9] font-semibold-mon mx-1.5"
                          onClick={resendOTP}
                        >
                          Gửi lại
                        </button>
                      )}
                    </div>
                  </span>
                </span>
              </div>
              <div className="flex justify-center py-[56px] box-border text-[#ffffff] font-light-mon">
                {otp?.length === 6 ? (
                  <input
                    style={styleButton}
                    id="button__D"
                    type="button"
                    className=" color-button-blue text-buttonOTP font-semibold-mon "
                    value="Xác nhận OTP"
                    onClick={() => handleClickShowInfoGift()}
                  />
                ) : (
                  <input
                    id="button__D"
                    type="button"
                    className=" color-button-disable text-[#333333] text-buttonOTP  font-semibold-mon"
                    value="Xác nhận OTP"
                  />
                )}
              </div>
            </div>

            {show ? (
              <MainPopupTnC
                setShow={setShow}
                checkAgree1={checkAgree1}
                setCheckAgree1={setCheckAgree1}
              />
            ) : null}
          </div>
        </div>
        <Footer />
      </div>
      <IconPhoneAndZalo />
      <SubmitReceipt trigger={triggerSubmitReceipt}></SubmitReceipt>
    </div>
  );
}
