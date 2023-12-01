import React, { useEffect, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { userServices } from "../../services/apiService/userServices";
import {
  campaignURL,
  checkPhoneStatus,
  setAuthorization,
} from "../../services/apiService/configURL";
import { userDataLocal } from "../../services/localService/localService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export default function RegisterPage() {
  let { giftCode } = useParams();

  let { token } = useSelector((state) => {
    return state.userReducer.userData;
  });
  let navigate = useNavigate();
  let [isDisableButton, setIsDisableButton] = useState(false);

  let campaignInfo = useSelector((state) => {
    return state.campaignInfoReducer.campaignInfo;
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });
  useEffect(() => {
    if (token) {
      return navigate(`/spinthewheel/` + giftCode);
    }
  }, []);

  const onSubmit = (data) => {
    setIsDisableButton(true);
    data.url = campaignURL;
    data.gift_code = giftCode;

    userServices
      .postUserLogin(data)
      .then((res) => {
        setAuthorization(res.token);
        userDataLocal.set(res);
        toast.success("Đăng nhập thành công!!");
        setTimeout(() => {
          if (
            res.session.status === checkPhoneStatus.notValidate ||
            !res.session.status
          ) {
            navigate(`/confirm-otp/` + giftCode);
          } else {
            navigate(`/spinthewheel/` + giftCode);
          }
        }, 1000);
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        console.log("finnaly");
        setIsDisableButton(false);
      });
  };
  return (
    <div className="login-page container">
      <form name="phone" onSubmit={handleSubmit(onSubmit)}>
        <div className="login-top ">
          <h1 className="login-top_title">ĐĂNG NHẬP</h1>
          <p className="login-top_description">
            Nhập số điện thoại của bạn để nhận mã OTP
          </p>
        </div>
        <div className="user-input ">
          <input
            className="user-input-number"
            placeholder="Vui lòng nhập số điện thoại của bạn"
            {...register("phone", {
              required: "Không được để trống",
              pattern: {
                value: /\d+/,
                message: "Vui lòng nhập số",
              },
            })}
          />
        </div>
        <ErrorMessage
          errors={errors}
          name="phone"
          render={({ messages }) => {
            return messages
              ? Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                ))
              : null;
          }}
        />
        <div className="policy-check ">
          <input
            id="check_tc"
            type="checkbox"
            {...register("is_agree_tc", {
              required: "Bạn phải đồng ý",
            })}
          />
          <label className="policy-decription" htmlFor="check_tc">
            Tôi đồng ý với các{" "}
            <a href="" className="bold">
              Điều khoản & Điều kiện
            </a>{" "}
            của chương trình.
          </label>
        </div>
        <ErrorMessage
          errors={errors}
          name="is_agree_tc"
          render={({ messages }) => {
            return messages
              ? Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                ))
              : null;
          }}
        />
        <div className="login-button ">
          <button
            className={isDisableButton ? "disable bold" : "enable bold"}
            type="submit"
            disabled={isDisableButton}
          >
            tham gia ngay
          </button>
          <a
            className="rule bold"
            type="button"
            href={campaignInfo.tc_url}
            target="_blank"
          >
            thể lệ chương trình
          </a>
        </div>
      </form>
    </div>
  );
}
