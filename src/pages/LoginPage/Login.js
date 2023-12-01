import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import PHONE from "../../assets/fontawesome/image/phone-auth-icon.png";

function Login() {
  document.body.style.backgroundColor = "black";
  const appCode = localStorage.getItem("CAMPAIGN_CODE");
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
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });

  const onSubmit = (data) => {
    const phoneFormat = {
      phone: data.phone,
      name: data.name,
      password: "123456",
    };
    console.log(phoneFormat);
    userServices
      .postUserLogin(phoneFormat)
      .then((res) => {
        localStorage.setItem("phoneData", data.phone);
        localStorage.setItem("nameData", data.name);
        userDataLocal.set(res);
        dispatch(setUserData(res));
        navigation(`/confirm-otp`);
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        console.log("finally");
      });
  };

  const handleBack = () => {
    navigation(`/${appCode}`);
  };
  const [isShow, setIsShow] = useState(false);
  const showMore = () => {
    setIsShow(!isShow);
  };
  return (
    <div className="container bg_default text-[#fff] w-screen min-w-full h-full min-h-screen px-[25px] flex flex-col box-border">
      <div className="icon-back mt-[7%] py-[36px] h-8 flex items-center opacity-100 max-w-full w-full z-50">
        <i
          className="fa-solid fa-chevron-left fa-solid-back"
          onClick={handleBack}
        ></i>
      </div>
      <header className="font-bold-mon p-0 w-52 h-9 leading-9 text-2xl not-italic ">
        ĐĂNG NHẬP
      </header>
      <div className="container__login-item p-[16px_0_68px_0] text-[#fff] text-base font-light-mon w-[87%]">
        Nhập số điện thoại của bạn để nhận phần thưởng
      </div>
      <div className="container__login-form">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__login">
            <div className="flex flex-nowrap h-[70px] rounded-[14px] mt-0  bg-[#fff] relative z-10 border-[#98EBFF] border-[1px]">
              <input
                className="form__phone  text-[15px] box-border flex-[6]  pl-4 h-full z-10 text-black font-['Montserrat-Regular'] rounded-r-xl rounded-l-xl"
                placeholder="Nhập tên của bạn "
                {...register("name", {
                  required: "Không được để trống",
                  pattern: {
                    value: /^[\D*]{1,}$/,
                    message: "Vui lòng chỉ nhập kí tự",
                  },
                })}
              />
            </div>
            <div className="font-normal z-0 font-[Montserrat-Regular] mb-7 text-[red] text-[13px] text-center">
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ messages }) => {
                  console.log("messages", messages);
                  setIsShow(false);
                  return messages
                    ? Object.entries(messages).map(([type, message]) => (
                        <p
                          key={type}
                          className="bg-[#EEE6E7] pt-2.5 -mt-2.5 z-0 rounded-bl-xl rounded-br-xl border-[#F63440] border-[1px]"
                        >
                          {message}
                        </p>
                      ))
                    : null;
                }}
              />
            </div>
            <div className="flex flex-nowrap h-[70px] rounded-[14px] mt-0  bg-[#fff] relative z-10 border-[#98EBFF] border-[1px]">
              <div className="ml-3">
                <img src={PHONE} className="mt-5 pl-1 pr-2" />
              </div>
              <input
                className="form__phone m-[0_0_0_5px] text-[15px] box-border flex-[6] w-52 pl-2.5 h-full z-30 text-black font-regular-mon rounded-r-xl"
                placeholder="Nhập số điện thoại "
                type="tel"
                {...register("phone", {
                  required: "Không được để trống",
                  pattern: {
                    value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                    message: "Vui lòng nhập số",
                  },
                })}
              />
            </div>
            <div className="font-normal z-0 font-[Montserrat-Regular] text-[red] text-[13px] text-center">
              <ErrorMessage
                errors={errors}
                name="phone"
                render={({ messages }) => {
                  console.log("messages", messages);
                  return messages
                    ? Object.entries(messages).map(([type, message]) => (
                        <p
                          key={type}
                          className="bg-[#EEE6E7] pt-2.5 -mt-2.5 z-0 rounded-bl-xl rounded-br-xl border-[#F63440] border-[1px]"
                        >
                          {message}
                        </p>
                      ))
                    : null;
                }}
              />
            </div>
            <span
              className={`${"corlor-text-white"} text-[12px]  font-regular-mon leading-5 whitespace-pre-line 
              flex flex-wrap break-words mt-5`}
            >
              <div className="checkbox-tc" style={{ marginBottom: "8px" }}>
                <div className="m-[0] flex font-light-mon">
                  <div>
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      defaultChecked={checkAgree1}
                      onClick={(e) => handleAgree("ag1")}
                      className="checkbox-confirm-register w-3 h-3 bg-gray-100"
                    />
                  </div>
                  <label
                    htmlFor="check"
                    className="text-[#333333] mr-[10px] font-[Montserrat] not-italic font-normal
                     text-[13px] leading-[20px]"
                  >
                    {" "}
                  </label>
                  <label
                    htmlFor="check"
                    className={`${"corlor-text-white"} mr-[10px] font-regular-mon not-italic font-normal
                     text-[13px] leading-[20px]`}
                  >
                    Tôi đồng ý với các Điều khoản & điều kiện của chương trình{" "}
                    <span
                      style={{
                        cursor: "pointer",
                        color: `${"#FEDA00"}`,
                      }}
                      onClick={() => showMore()}
                    >
                      (Xem Chi tiết)
                    </span>
                  </label>
                </div>
              </div>
            </span>
            {isShow ? (
              <MainPopup
                checkAgree1={checkAgree1}
                setCheckAgree1={setCheckAgree1}
              >
                <ContentTCPopup />
              </MainPopup>
            ) : null}
            {checkAgree1 ? (
              <div className="flex justify-center py-[56px] box-border text-[#333] font-light-mon">
                <input
                  type="submit"
                  className="color-button-enable font-bold-mon border-0 text-[#130682] px-[32px] 
                  py-[15px] text-center inline-block rounded-3xl text-[16px] cursor-pointer"
                  value={"Đăng nhập"}
                />
              </div>
            ) : (
              <div className="flex justify-center py-[56px] box-border text-[#333333] font-light-mon">
                <input
                  type="button"
                  className="color-button-disable font-bold-mon border-0 text-[#333333] px-[32px]
                   py-[15px] text-center inline-block rounded-3xl text-[16px] cursor-pointer"
                  value={`${"Đăng nhập"}`}
                />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
