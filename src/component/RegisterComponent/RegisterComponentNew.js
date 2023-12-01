import { useForm } from "react-hook-form";
import { useState } from "react";
import "../../assets/css/background.css";
import "../../assets/css/backgroundHeader.css";
import "../../assets/css/Login.css";
import "../../assets/css/Register.css";
import "../../assets/css/background__Footer.css";
import "../../assets/css/font-text.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import PHONE from "../../assets/fontawesome/image/phone-auth-icon.png";
import LOCKAUTH from "../../assets/fontawesome/image/lock-auth-icon.png";
import LOCK from "../../assets/fontawesome/image/lock-icon.png";
import PROFILE from "../../assets/fontawesome/image/profile-icon.png";
import { ErrorMessage } from "@hookform/error-message";
import { userServices } from "../../services/apiService/userServices";
import { toast } from "react-toastify";
import MainPopupTnC from "../ConfirmPopupTnC/MainPopupTnC";
import SHOW from "../../assets/fontawesome/image/show.png";
import HIDE from "../../assets/fontawesome/image/hide.png";
import TICK from "../../assets/fontawesome/image/tick.svg";
import { useEffect } from "react";

RegisterComponentNew.propTypes = {
  updateInfo: PropTypes.string,
};

const style = {
  width: "100%",
  border: "2px solid #98EBFF",
  borderRadius: "15px",
};

export default function RegisterComponentNew({ updateInfo }) {
  const navigation = useNavigate();
  const [checkAgree1, setCheckAgree1] = useState(false);
  const [checkAgree2, setCheckAgree2] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowPassAuth, setIsShowPassAuth] = useState(false);
  const [phone, setPhone] = useState("");
  const [isExist, setIsExist] = useState();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });
  const [show, setShow] = useState(false);

  const onSubmit = (value) => {
    const data = {
      name: value.name,
      phone: value.phone,
      password: value.password,
    };

    if (value.password === value.confirmPassword) {
      userServices
        .postRegister(data)
        .then((res) => {
          console.log(res);
          localStorage.setItem("PHONE_NUMBER", JSON.stringify(data));

          navigation("/confirm-otp-register");
        })
        .catch((error) => {
          toast.warn(error);
          navigation("/login-password");
        });
    } else {
      toast.error("Mật khẩu xác thực không trùng nhau");
    }
  };

  const handleAgree = (e) => {
    console.log(e);
    if (e === "ag1") {
      setCheckAgree1(!checkAgree1);
    } else {
      setCheckAgree2(!checkAgree2);
    }
  };
  const checkPhone = (e) => {
    setPhone(e);
  };
  useEffect(() => {
    console.log(phone.length);
    setIsExist()
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
  const [textNotify, setNotify] = useState("")
  const handleCheckAgree = ()=>{
    setNotify("Vui lòng chọn tôi đồng ý để tiếp tục")
  }
  useEffect(()=>{
    if(checkAgree1 && checkAgree2){
      setNotify("")
    }
  },[checkAgree1, checkAgree2])
  
  const handleLogin = ()=>{
    navigation("/login-password")
  }
  return (
    <>
      <form className="form_register mt-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center relative z-10 bg-white" style={style}>
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
                message: "Vui lòng nhập số",
              },
              onChange: (e) => {
                checkPhone(e.target.value);
              },
            })}
          />
          { isExist === false ? (
            <div>
              <img src={TICK} className="w-14 pr-4" />
            </div>
          ) : (
            <div></div>
          )}
        </div>
        {
          isExist ? <div className="flex justify-start mt-1">
            <div className="mr-2 w-24 text-white bg-[#003DA5] text-center rounded-md" onClick={handleLogin}>Đăng nhập</div>
            <div className="text-[red]">Số điện thoại này đã tồn tại</div>
          </div>: null
        }
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
          className="flex items-center mt-5 relative z-10 bg-white"
          style={style}
        >
          <div className="ml-3">
            <img src={PROFILE} className="w-5" />
          </div>
          <input
            className="form__name input-hidden input-size font-regular-mon input-data "
            placeholder="Nhập tên của bạn"
            {...register("name", {
              required: "Không được để trống",
              pattern: {
                value: /^[\D*]{1,}$/,
                message: "Vui lòng chỉ nhập kí tự",
              },
            })}
          />
        </div>
        <div className="font-normal z-0 -mt-3 text-[red] text-[13px] text-center">
          <ErrorMessage
            errors={errors}
            name="name"
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
          className="flex items-center mt-5 relative z-10 bg-white"
          style={style}
        >
          <div className="ml-3">
            <img src={LOCK} className="w-6" />
          </div>
          <input
            className="form__name input-hidden input-size font-regular-mon input-data "
            placeholder="Nhập mật khẩu của bạn"
            type={isShowPass ? "text" : "password"}
            {...register("password", {
              pattern: {
                value: /^(?=.{6,})(?=.*\d)/,
                message: "Vui lòng nhập ít nhất 6 kí tự bao gồm ít nhất 1 số",
              },
              validate: (val) => {
                console.log(watch("name").replace(" ", ""));
                if (
                  watch("name").replace(" ", "").toLowerCase() ===
                    val.toLowerCase() ||
                  watch("name").replace(" ", "") === val ||
                  watch("phone") === val
                ) {
                  return "Mật khẩu không trùng tên hoặc số điện thoại";
                }
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
          className="flex items-center mt-5 relative z-10 bg-white"
          style={style}
        >
          <div className="ml-3">
            <img src={LOCKAUTH} className="w-6" />
          </div>
          <input
            className="form__name input-hidden input-size font-regular-mon input-data "
            placeholder="Xác nhận lại mật khẩu của bạn"
            type={isShowPassAuth ? "text" : "password"}
            {...register("confirmPassword", {
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
            name="confirmPassword"
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
        <div className="mt-5 text-center text-[red]">{textNotify}</div>
        <div className="mt-5 flex font-light-mon">
          <div>
            <input
              id="default-checkbox"
              type="checkbox"
              defaultChecked={checkAgree1}
              value={checkAgree1}
              onClick={(e) => handleAgree("ag1")}
              className="checkbox-confirm-register w-3 h-3 text-blue-600"
            />
          </div>
          <label
            htmlFor="check"
            className="text-[#333333] mr-[10px] text-[13px]"
          >
            {" "}
          </label>
          <label
            htmlFor="check"
            className={`${
              updateInfo ? "corlor-text-darkblack" : "corlor-text-white"
            } mr-[10px] font-semibold-mon not-italic text-[16px]`}
          >
            Tôi đồng ý
          </label>
        </div>
        <div className="font-regular-mon text-[13px]">
          P&G Việt Nam và đơn vị cung cấp dịch vụ của P&G có thể xử lý dữ liệu
          cá nhân của bạn nhằm mục đích đánh giá điều kiện bạn tham chương trình
          khuyến mại, liên hệ trao giải thưởng, quản lý và báo cáo kết quả của
          chương trình theo quy định của luật pháp. Nếu bạn từ chối đồng ý, bạn
          sẽ không thể tham gia chương trình này. 
        </div>

        <div className="mt-5 flex font-light-mon">
          <div>
            <input
              id="default-checkbox"
              type="checkbox"
              defaultChecked={checkAgree2}
              value={checkAgree2}
              onClick={(e) => handleAgree("ag2")}
              className="checkbox-confirm-register w-3 h-3 text-blue-600"
            />
          </div>
          <label
            htmlFor="check"
            className="text-[#333333] mr-[10px] text-[13px]"
          >
            {" "}
          </label>
          <label
            htmlFor="check"
            className={`${
              updateInfo ? "corlor-text-darkblack" : "corlor-text-white"
            } mr-[10px] font-semibold-mon not-italic text-[16px]`}
          >
            Tôi đồng ý
          </label>
        </div>
        <div className="font-regular-mon text-[13px]">
          P&G Việt Nam và đơn vị cung cấp dịch vụ của P&G có thể xử lý dữ liệu
          cá nhân của bạn nhằm mục đích gửi cho bạn thông tin quảng bá, tiếp thị
          về các sản phẩm, thông tin chương trình khuyến mại và sự kiện của P&G.
          Các thông tin này sẽ được gửi qua tin nhắn với tần suất tối đa 4
          lần/tháng. Sự đồng ý của bạn sẽ thay thế các lựa chọn từ chối quảng
          cáo trước đó (bao gồm cả việc bạn đã đăng ký danh sách không nhận cuộc
          gọi quảng cáo "Do not call list”), và bạn sẽ thông báo cho P&G biết
          nếu muốn từ chối nhận quảng cáo. 
        </div>
        <div className="font-regular-mon mt-2 text-[13px]">
          Bạn quyết định việc đánh dấu vào các ô bên trên để xác nhận đồng ý cho
          chúng tôi sử dụng dữ liệu cá nhân của bạn. Lựa chọn từ chối của bạn có
          thể ảnh hưởng đến việc bạn được nhận sản phẩm/dịch vụ mà chúng tôi
          cung cấp theo chương trình, cũng như giới hạn trải nghiệm mà bạn có
          được khi tham gia chương trình này. P&G sẽ chia sẻ dữ liệu cá nhân của
          bạn với đơn vị cung cấp dịch vụ được P&G ủy quyền thực hiện chương
          trình và/hoặc chuyển dữ liệu cá nhân của bạn đến một địa điểm bên
          ngoài Việt Nam cho các mục đích xử lý được mô tả trên đây. P&G không
          bán dữ liệu cá nhân của bạn cho bên thứ ba. Bằng cách đánh dấu vào các
          ô ở trên, bạn đồng ý cho P&G được thu thập, sử dụng, xử lý và chuyển
          dữ liệu cá nhân của bạn theo Chính sách quyền riêng tư của chúng tôi,
          chi tiết tại{" "}
          <a
            href="https://www.pg.com/privacy/english/privacy_statement.shtml."
            target="_blank"
            className="dont-break-out text-[#003DA5] font-semibold-mon"
          >
            https://www.pg.com/privacy/english/privacy_statement.shtml.
          </a>
        </div>
        <div className="flex justify-center py-[20px] box-border text-[#333] font-light-mon">
          {checkAgree1 && checkAgree2 ? (
            <input
              type="submit"
              className={`color-button-blue w-40 font-bold-mon border-0 text-[#ffffff] px-[32px] py-[15px] text-center rounded-2xl text-[16px]`}
              value={`${updateInfo ? "Tiếp tục" : "Đăng nhập"}`}
            />
          ) : (
            <input
              type="button"
              className={`bg-[#d9d9d9] w-40 font-bold-mon border-0 text-[#ffffff] px-[32px] py-[15px] text-center rounded-2xl text-[16px]`}
              value={`${updateInfo ? "Tiếp tục" : "Đăng nhập"}`}
              onClick={handleCheckAgree}
            />
          )}
        </div>
      </form>
      {show ? (
        <MainPopupTnC
          setShow={setShow}
          checkAgree1={checkAgree1}
          setCheckAgree1={setCheckAgree1}
        />
      ) : null}
    </>
  );
}
