import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../component/Footer/Footer";
import { useEffect } from "react";
import { userServices } from "../../services/apiService/userServices";
import { userDataLocal } from "../../services/localService/localService";
import { useState } from "react";
import HeaderBackground from "../../pages/UpdateCustomerInfo/HeaderBackground";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { setAuthorization } from "../../services/apiService/configURL";
import { ErrorMessage } from "@hookform/error-message";
import MainPopup from "../ConfirmPopupTnC/MainPopup";
import ContentTCPopup from "../ConfirmPopupTnC/ContentTCPopup";
import LOCKAUTH from "../../assets/fontawesome/image/lock-auth-icon.png";
import LOCK from "../../assets/fontawesome/image/lock-icon.png";
import SHOW from "../../assets/fontawesome/image/show.png";
import HIDE from "../../assets/fontawesome/image/hide.png";

const TITLE = "Thay đổi mật khẩu";

const style = {
  width: "100%",
  border: "2px solid #98EBFF",
  borderRadius: "15px",
};
export default function ChangePassword() {
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
  const navigation = useNavigate();
  let { token } = userDataLocal.get();
  let dataUser = userDataLocal.get();
  const appCode = localStorage.getItem("CAMPAIGN_CODE");
  const nameData = localStorage.getItem("nameData");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [checkAgree1, setCheckAgree1] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowPassAuth, setIsShowPassAuth] = useState(false);
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });
  const [isShow, setShow] = useState(false);

  const onSubmit = (value) => {
    const data = {
      password: value.password,
    };
    userServices
      .changePassword(data)
      .then((res) => {
        console.log(res);
        navigation(`/${appCode}`);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  useEffect(() => {
    setCustomerName(nameData);
    setCustomerPhone(dataUser?.phone);
    setAuthorization(token);
  }, []);

  return (
    <div>
      <HeaderBackground
        TITLE={TITLE}
        buttonBack={`${back === "tick" ? `/infor-customer` : `/${appCode}`}`}
      />
      <div className="w-full bg-white rounded-[30px_30px_0_0] absolute top-[80px] z-50">
        <div className="text-center mt-5 font-italic-mon">
          Vui lòng nhập mật khẩu mới
        </div>
        <div className="flex justify-center items-center px-[25px] mt-[70px]  max-h-full ">
          <div className="block -mt-10 w-full">
            <form className="form_register" onSubmit={handleSubmit(onSubmit)}>
              <div
                className="flex items-center relative z-10 bg-white"
                style={style}
              >
                <div className="ml-3">
                  <img src={LOCK} className="w-5" />
                </div>
                <input
                  className="form__name input-hidden input-size font-regular-mon input-data "
                  placeholder="Nhập mật khẩu mới"
                  type={isShowPass ? "text" : "password"}
                  {...register("password", {
                    required: "Không được để trống",
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z]).{6,19}$/,
                      message:
                        "Vui lòng nhập ít nhất 6 đến 19 kí và tự bao gồm ít nhất 1 số",
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
              <div
                className="flex items-center mt-7 relative z-10 bg-[#ffffff]"
                style={style}
              >
                <div className="ml-3 bg-[#ffffff]">
                  <img src={LOCKAUTH} className="w-5" />
                </div>
                <input
                  className="form__name input-hidden input-size font-regular-mon input-data bg-[#ffffff]"
                  placeholder="Xác nhận mật khẩu"
                  type={isShowPassAuth ? "text" : "password"}
                  {...register("confirmpassword", {
                    required: "Không được để trống",
                    validate: (val) => {
                      if (watch("password") != val) {
                        return "Mật khẩu không khớp";
                      }
                    },
                  })}
                />
                <div onClick={() => setIsShowPassAuth(!isShowPassAuth)}>
                  {isShowPassAuth ? (
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
                  name="confirmpassword"
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

              <div className="flex justify-center py-[56px] box-border text-[#333] font-light-mon">
                <input
                  type="submit"
                  className="color-button-blue font-bold-mon text-[#ffffff] px-[32px] py-[15px] rounded-xl text-[16px] leading-5"
                  value={"Tiếp tục"}
                />
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
    </div>
  );
}
