import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import "../../assets/css/background.css";
import "../../assets/css/backgroundHeader.css";
import "../../assets/css/Login.css";
import "../../assets/css/Register.css";
import "../../assets/css/background__Footer.css";
import "../../assets/css/font-text.css";
import { useNavigate } from "react-router-dom";
import PHONE from "../../assets/fontawesome/image/phone-auth-icon.png";
import { ErrorMessage } from "@hookform/error-message";
import { userServices } from "../../services/apiService/userServices";
import { toast } from "react-toastify";
import ConfirmPopupLogin from "../ConfirmPopupLogin/ConfirmPopupLogin";

const style = {
  width: "100%",
  border: "2px solid #98EBFF",
  borderRadius: "15px",
};
export default function ForgotPassword() {
  const navigation = useNavigate();
  const login_type = localStorage.getItem("LOGIN_TYPE");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isExist, setIsExist] = useState();

  const handleForgetPass = () => {
    navigation(`${login_type === "password" ? "/login" : "/login"}`);
  };
  const handleRegister = () => {
    navigation(`/register-new`);
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });
  const [phone, setPhone] = useState("");
  const [popupNotiNumberPhone, setPopupNotiNumberPhone] = useState();
  const [popup, setPopup] = useState(false);
  useEffect(() => {
    console.log(phone.length);
    setIsExist();
    if (phone.length === 10) {
      const data = {
        phone: phone,
      };
      userServices
        .checkPhoneExist(data)
        .then((res) => {
          setIsExist(res.existed);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [phone]);
  const checkPhone = (e) => {
    setPhone(e);
  };
  const onSubmit = (value) => {
    const data = {
      phone: value.phone,
    };
    userServices
      .forgotPassword(data)
      .then((res) => {
        setCustomerPhone(data?.phone);
        setPopupNotiNumberPhone(
          "Chúng tôi đã gửi bạn tin nhắn xác nhận lấy lại mật khẩu. Vui lòng kiểm tra tin nhắn tại số điện thoại "
        );
        setPopup(true);
      })
      .catch((error) => {
        toast.warn(error);
        navigation("/login");
      });
  };

  return (
    <>
      <form className="form_register mt-5" onSubmit={handleSubmit(onSubmit)}>
        <div
          className="flex items-center mt-5 relative z-10 bg-white"
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
                message: "Vui lòng nhập đúng định dạng số điện thoại",
              },
              onChange: (e) => {
                checkPhone(e.target.value);
              },
            })}
          />
        </div>
        {isExist === false ? (
          <div className="flex justify-center mt-1">
            <div className="text-[red] text-center">
              Số điện thoại này chưa được đăng kí
            </div>
          </div>
        ) : null}
        <div className="font-normal z-0 -mt-3 text-[red] text-[13px] text-center">
          <ErrorMessage
            errors={errors}
            name="phone"
            render={({ messages }) => {
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
        <div className="mt-8 font-light-mon">
          <div className="flex justify-between font-regular-mon">
            <a onClick={handleForgetPass}>Đăng nhập</a>
            <a onClick={handleRegister}>Đăng kí tài khoản</a>
          </div>
        </div>
        <div className="flex justify-center py-[56px] box-border text-[#333] font-light-mon">
          {isExist === false ? (
            <input
              type="button"
              className="color-button-disable font-bold-mon border-0 text-[#ffffff] px-[32px] py-[15px] text-center rounded-xl text-[16px] cursor-pointer leading-5"
              value={"Tiếp tục"}
            />
          ) : (
            <input
              type="submit"
              className="color-button-blue font-bold-mon border-0 text-[#ffffff] px-[32px] py-[15px] text-center rounded-xl text-[16px] cursor-pointer leading-5"
              value={"Tiếp tục"}
            />
          )}
        </div>
      </form>
      {popup ? (
        <ConfirmPopupLogin
          titlePopup={popupNotiNumberPhone}
          phone={customerPhone}
          labelCancel={"Để sau"}
          labelOK={"Đồng ý"}
          handleCancel={() => {
            setPopup(false);
          }}
          handleOk={() => {
            navigation(`${login_type === "password" ? "/login" : "/login"}`);
          }}
        />
      ) : null}
    </>
  );
}
