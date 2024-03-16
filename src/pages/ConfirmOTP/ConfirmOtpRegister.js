import { useState } from "react";
import { userDataLocal } from "../../services/localService/localService";
import "../../assets/css/background.css";
import "../../assets/css/backgroundHeader.css";
import "../../assets/css/Login.css";
import "../../assets/css/Register.css";
import "../../assets/css/background__Footer.css";
import "../../assets/css/font-text.css";
import { useNavigate } from "react-router-dom";
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

export default function ConfirmOtpRegister({ updateInfo }) {
  const [triggerSubmitReceipt, setTriggerSubmitReceipt] = useState(false);
  const [isStatusDisable, setIsStatusDisable] = useState(false);
  const navigation = useNavigate();
  const [checkAgree1, setCheckAgree1] = useState(false);
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
  const [minutes, setMinutes] = useState(3);
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
    setIsStatusDisable(true);
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
      .finally(() => {
        setIsStatusDisable(false);
      });
  };
  const resendOTP = () => {
    setIsStatusDisable(false);
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
          }
        } else {
        }
        setMinutes(3);
        setSeconds(0);
        navigation(`/confirm-otp-register`);
      })
      .catch((err) => {
        toast.error(err);
        // localStorage.removeItem("GCS_RESULT");
      })
      .finally(() => {
        console.log("finally");
      });
  };

  return (
    <div>
      <HeaderBackground TITLE={TITLE} buttonBack={`/login`} />
      <div className=" w-full bg-white rounded-[30px_30px_0_0] absolute top-[80px] z-50">
        <div className="flex justify-center items-center px-[15px] max-h-full">
          <div className="block ">
            <div className="text-center font-italic-mon text-[13px] mt-5">
              Một mã xác định gồm 6 chữ số đã gửi đến số điện thoại{" "}
              <span className="text-[#003DA5] text-[20px] font-bold-mon">
                {phoneData?.phone}
              </span>
            </div>
            <div className="text-center font-italic-mon text-[13px] px-2 mt-5">
              Chúng tôi sẽ gửi mã OTP đến số điện thoại này qua{" "}
              <span className="font-bold-mon italic">ứng dụng Zalo</span>
              &nbsp; hoặc{" "}
              <span className="font-bold-mon italic"> tin nhắn SMS</span> trong
              vài phút tới.
            </div>
            <div className="container__input">
              <div className="container__input-otp flex justify-center flex-col -mb-6 items-center">
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
                  <>
                    {isStatusDisable ? (
                      <div
                        style={styleButton}
                        id="button__D"
                        className=" color-button-blue py-[9px] px-[47px] rounded-lg font-semibold-mon "
                      >
                        <div className="w-20 flex justify-center">
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span class="sr-only">Loading...</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        style={styleButton}
                        id="button__D"
                        type="button"
                        className=" color-button-blue text-buttonOTP font-semibold-mon "
                        onClick={() => handleClickShowInfoGift()}
                      >
                        Xác nhận OTP
                      </button>
                    )}
                  </>
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
