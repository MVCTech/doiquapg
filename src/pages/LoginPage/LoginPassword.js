import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";
import { userServices } from "../../services/apiService/userServices";
import { userDataLocal } from "../../services/localService/localService";
import { setUserData } from "../../Redux/Action/userAction";
import { useDispatch } from "react-redux";
import "../../assets/css/font-text.css";
import "../../assets/fontawesome/css/all.min.css";
import "../../assets/css/background.css";
import "../../assets/css/backgroundHeader.css";
import "../../assets/css/backgroundButton.css";
import "../../assets/css/Login.css";
import ContentTCPopup from "../../component/ConfirmPopupTnC/ContentTCPopup";
import MainPopup from "../../component/ConfirmPopupTnC/MainPopup";
import SubmitReceipt from "../../component/SubmitReceipt/SubmitReceipt";
import PHONE from "../../assets/fontawesome/image/phone-auth-icon.png";
import SHOW from "../../assets/fontawesome/image/show.png";
import HIDE from "../../assets/fontawesome/image/hide.png";
import { useEffect } from "react";
import { setAuthorization } from "../../services/apiService/configURL";
import HeaderBackground from "../UpdateCustomerInfo/HeaderBackground";
import LOCKAUTH from "../../assets/fontawesome/image/lock-auth-icon.png";
import Footer from "../../component/Footer/Footer";
import { Consent } from "../../utils/consent";
import IconPhoneAndZalo from "../../component/IconPhoneAndZalo/IconPhoneAndZalo";

const TITLE = "Đăng nhập";
const style = {
  width: "100%",
  border: "2px solid #98EBFF",
  borderRadius: "15px",
};

function LoginPassword() {
  const appCode = localStorage.getItem("CAMPAIGN_CODE");
  const phoneData = localStorage.getItem("phoneData");
  console.log(phoneData);
  const [isShow, setShow] = useState(false);
  const navigation = useNavigate();
  let dispatch = useDispatch();
  const [checkAgree1, setCheckAgree1] = useState(false);
  const [checkAgree2, setCheckAgree2] = useState(false);

  const handleAgree = (e) => {
    if (e === "ag1") {
      setCheckAgree1(!checkAgree1);
    } else if (e === "ag2") {
      setCheckAgree2(!checkAgree2);
    }
  };

  const [triggerSubmitReceipt, setTriggerSubmitReceipt] = useState(false);
  const onSubmit = (data) => {
    let gcsResult = JSON.parse(localStorage.getItem("GCS_RESULT"));
    console.log(gcsResult);
    const phoneFormat = {
      phone: data.phone,
      password: data.password,
    };
    userServices
      .postUserLogin(phoneFormat)
      .then((res) => {
        console.log(res);
        localStorage.setItem("phoneData", data.phone);
        userDataLocal.set(res);
        dispatch(setUserData(res));
        setAuthorization(res.token);
        if (gcsResult) {
          console.log(phoneData);
          if (phoneData === null) {
            let phoneCheck = phoneFormat?.phone;
            gcsResult = { ...gcsResult, phoneCheck };
            console.log(gcsResult);
            localStorage.setItem("GCS_RESULT", JSON.stringify(gcsResult));
            setTriggerSubmitReceipt(true);
          } else if (phoneData === gcsResult?.phoneCheck) {
            setTriggerSubmitReceipt(true);
          } else {
            navigation(`/${appCode}`);
          }
        } else {
          navigation(`/${appCode}`);
        }
      })
      .catch((err) => {
        toast.error(err);
        // localStorage.removeItem("GCS_RESULT");
      })
      .finally(() => {
        console.log("finally");
      });
  };

  const handleForgetPass = () => {
    navigation(`/forgot-password`);
  };
  const handleRegister = () => {
    navigation(`/register-new`);
  };

  const location = useLocation();
  const back = location.pathname.split("/")[2];
  const [dataUserProfile, setDataUserProfile] = useState();
  useEffect(() => {
    userServices
      .getUserInfo(dataUser?.pnj_customer_id)
      .then((res) => {
        setDataUserProfile(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let { token } = userDataLocal.get();
  let dataUser = userDataLocal.get();
  const [textNotify, setNotify] = useState("");
  const [isShowPass, setIsShowPass] = useState(false);
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    if (checkAgree1 && checkAgree2) {
      setNotify("");
    }
  }, [checkAgree1, checkAgree2]);

  useEffect(() => {
    setAuthorization(token);
  }, []);

  const handleCheckAgree = () => {
    setNotify("Vui lòng chọn tôi đồng ý để tiếp tục");
  };
  return (
    <div>
      <HeaderBackground
        TITLE={TITLE}
        buttonBack={`${back === "tick" ? `/infor-customer` : `/${appCode}`}`}
      />
      <div className="w-full bg-white rounded-[30px_30px_0_0] absolute top-20 z-50">
        <div className="text-[#333333] text-[13px] mt-7 px-3 text-center font-italic-mon">
          Nhập tài khoản của bạn để tham gia chương trình
        </div>
        <div className="flex justify-center items-center px-[25px] mt-[40px] max-h-full ">
          <div className="block -mt-10 w-full">
            <form
              className="form_register mt-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div
                className="flex items-center relative z-10 bg-white"
                style={style}
              >
                <div className="ml-3">
                  <img src={PHONE} className="w-5" />
                </div>
                <input
                  className="form__name input-hidden input-size font-regular-mon input-data "
                  placeholder="Nhập số điện thoại của bạn"
                  type="tel"
                  {...register("phone", {
                    required: "Không được để trống",
                    pattern: {
                      value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                      message: "Vui lòng nhập đúng số điện thoại",
                    },
                  })}
                />
              </div>
              <div className="font-normal z-0 -mt-3 text-[red] text-[13px] text-center">
                <ErrorMessage
                  errors={errors}
                  name="phone"
                  render={({ messages }) => {
                    setShow(false);
                    return messages
                      ? Object.entries(messages).map(([type, message]) => (
                          <p
                            key={type}
                            className="bg-[#EEE6E7] pt-2.5 -mt-1 z-0 rounded-bl-xl rounded-br-xl border-[#F63440] border-[1px]"
                          >
                            {message}
                          </p>
                        ))
                      : null;
                  }}
                />
              </div>
              <div
                className="flex items-center mt-7 relative z-10 bg-[#ffffff]"
                style={style}
              >
                <div className="ml-3 bg-[#ffffff]">
                  <img src={LOCKAUTH} className="w-6" />
                </div>
                <input
                  className="form__name input-hidden input-size font-regular-mon input-data bg-[#ffffff]"
                  placeholder="Nhập mật khẩu của bạn"
                  type={isShowPass ? "text" : "password"}
                  {...register("password", {
                    required: "Không được để trống",
                    pattern: {
                      value: /^(?=.*\d).{6,19}$/,
                      message:
                        "Vui lòng nhập ít nhất 6 đến 19 kí tự bao gồm ít nhất 1 số",
                    },
                  })}
                />
                <div onClick={() => setIsShowPass(!isShowPass)}>
                  {isShowPass ? (
                    <div className="w-10">
                      <img src={HIDE} className="w-9 pr-4" />
                    </div>
                  ) : (
                    <div className="w-10">
                      <img src={SHOW} className="w-9 pr-4" />
                    </div>
                  )}
                </div>
              </div>
              <div className="font-normal z-0 -mt-3 text-[red] text-[13px] text-center">
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ messages }) => {
                    setShow(false);
                    return messages
                      ? Object.entries(messages).map(([type, message]) => (
                          <p
                            key={type}
                            className="bg-[#EEE6E7] pt-2.5 -mt-1 z-0 rounded-bl-xl rounded-br-xl border-[#F63440] border-[1px]"
                          >
                            {message}
                          </p>
                        ))
                      : null;
                  }}
                />
              </div>
              <div className="flex justify-between text-[14px] mt-7 font-regular-mon">
                <a onClick={handleForgetPass}>Quên mật khẩu?</a>
                <a onClick={handleRegister}>Đăng kí tài khoản</a>
              </div>
              <div className="mt-5 text-center text-[red]">{textNotify}</div>
              <Consent
                checkAgree1={checkAgree1}
                checkAgree2={checkAgree2}
                setCheckAgree1={setCheckAgree1}
                setCheckAgree2={setCheckAgree2}
              />
              <div className="flex justify-center py-[56px] box-border text-[#333] font-light-mon">
                {checkAgree1 && checkAgree2 ? (
                  <input
                    type="submit"
                    className="color-button-blue font-bold-mon text-[#ffffff] px-[32px] py-[15px] rounded-xl text-[16px] leading-5"
                    value={"Tiếp tục"}
                  />
                ) : (
                  <input
                    type="button"
                    className="color-button-disable font-bold-mon text-[#ffffff] px-[32px] py-[15px] rounded-xl text-[16px] leading-5"
                    value={"Tiếp tục"}
                    onClick={handleCheckAgree}
                  />
                )}
              </div>
            </form>
            {isShow ? (
              <MainPopup
                checkAgree1={checkAgree1}
                setCheckAgree1={setCheckAgree1}
              >
                <ContentTCPopup />
              </MainPopup>
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

export default LoginPassword;
