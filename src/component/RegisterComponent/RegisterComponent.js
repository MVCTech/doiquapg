import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { userDataLocal } from "../../services/localService/localService";
import { userServices } from "../../services/apiService/userServices";
import "../../assets/css/background.css";
import "../../assets/css/backgroundHeader.css";
import "../../assets/css/Login.css";
import "../../assets/css/Register.css";
import "../../assets/css/background__Footer.css";
import "../../assets/css/font-text.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setAuthorization } from "../../services/apiService/configURL";
import PropTypes from "prop-types";
import MainPopup from "../ConfirmPopupTnC/MainPopup";
import ContentTCPopup from "../ConfirmPopupTnC/ContentTCPopup";
import PROFILE from "../../assets/fontawesome/image/profile-icon.png";
import { ErrorMessage } from "@hookform/error-message";
import PHONE from "../../assets/fontawesome/image/phone-auth-icon.png";

RegisterComponent.propTypes = {
  updateInfo: PropTypes.string,
};

const style = {
  width: "100%",
  border: "2px solid #98EBFF",
  borderRadius: "15px",
};
export default function RegisterComponent({ updateInfo, dataUserProfile }) {
  console.log(dataUserProfile);
  const navigation = useNavigate();
  let { token } = userDataLocal.get();
  let dataUser = userDataLocal.get();
  const appCode = localStorage.getItem("CAMPAIGN_CODE");
  const [userInfo, setUserInfo] = useState(dataUserProfile);
  const [customerName, setCustomerName] = useState(dataUserProfile?.name);
  console.log(customerName);
  const [customerPhone, setCustomerPhone] = useState("");
  const [checkAgree1, setCheckAgree1] = useState(false);
  const [checkAgree2, setCheckAgree2] = useState(false);
  useEffect(() => {
    setCustomerName(dataUserProfile?.name);
  }, [dataUserProfile]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });
  const [isShow, setShow] = useState(false);

  const onSubmit = (value) => {
    const data = {
      pnj_customer_id: dataUser.pnj_customer_id,
      name: customerName,
      phone: customerPhone,
    };
    console.log(data);
    userServices
      .postUserInfo(data)
      .then((res) => {
        console.log(res);
        navigation(`/${appCode}`);
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  const [textNotify, setNotify] = useState("");
  useEffect(() => {
    setCustomerPhone(dataUser?.phone);
    setUserInfo(dataUser);
    setAuthorization(token);
  }, []);

  const handleAgree = (e) => {
    if (e === "ag1") {
      setCheckAgree1(!checkAgree1);
    } else if (e === "ag2") {
      setCheckAgree2(!checkAgree2);
    }
  };
  const handleOnchangeName = (event) => {
    setCustomerName(event.target.value);
  };
  useEffect(() => {
    if (checkAgree1 && checkAgree2) {
      setNotify("");
    }
  }, [checkAgree1, checkAgree2]);
  const handleCheckAgree = () => {
    setNotify("Vui lòng chọn tôi đồng ý để tiếp tục");
  };

  return (
    <>
      <form className="form_register mt-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center relative z-10 bg-white" style={style}>
          <div className="ml-3">
            <img src={PROFILE} className="w-5" />
          </div>
          <input
            className="form__name input-hidden input-size font-regular-mon input-data "
            placeholder="Nhập tên của bạn"
            defaultValue={dataUserProfile?.name}
            value={customerName}
            onChange={handleOnchangeName}
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
          className="flex items-center mt-7 relative z-10 bg-[#D9D9D9]"
          style={style}
        >
          <div className="ml-3 bg-[#D9D9D9]">
            <img src={PHONE} className="w-5" />
          </div>
          <input
            className="form__name input-hidden input-size font-regular-mon input-data bg-[#D9D9D9]"
            placeholder="Nhập số điện thoại của bạn"
            disabled
            defaultValue={customerPhone}
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
        <div className="mt-5 text-center text-[red]">{textNotify}</div>
        <div className="mt-10 flex font-light-mon">
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
        {checkAgree1 && checkAgree2 ? (
          <div className="flex justify-center py-[56px] box-border text-[#333] font-light-mon">
            <input
              type="submit"
              className="color-button-enable font-bold-mon text-[#130682] px-[32px] py-[15px] text-center rounded-xl text-[16px]"
              value={`${updateInfo ? "Lưu lại thông tin" : "Đăng nhập"}`}
            />
          </div>
        ) : (
          <div className="flex justify-center py-[56px] box-border text-[#333] font-light-mon">
            <input
              type="button"
              className="color-button-disable font-bold-mon text-[#33333] px-[32px] py-[15px] text-center rounded-xl text-[16px]"
              value={`${updateInfo ? "Lưu lại thông tin" : "Đăng nhập"}`}
              onClick={handleCheckAgree}
            />
          </div>
        )}
        {isShow ? (
          <MainPopup checkAgree1={checkAgree1} setCheckAgree1={setCheckAgree1}>
            <ContentTCPopup />
          </MainPopup>
        ) : null}
      </form>
    </>
  );
}
