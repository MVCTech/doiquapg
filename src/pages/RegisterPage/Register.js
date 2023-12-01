import { useNavigate } from "react-router-dom";
import "../../assets/css/background.css";
import "../../assets/css/backgroundHeader.css";
import "../../assets/css/Login.css";
import "../../assets/css/background__Footer.css";
import Logo from "../../assets/fontawesome/image/logo_mvc.png";
import { useState } from "react";
import "../../assets/css/Register.css";
import "react-datepicker/dist/react-datepicker.css";
import SubmitReceipt from "../../component/SubmitReceipt/SubmitReceipt";
import RegisterComponent from "../../component/RegisterComponent/RegisterComponent";

function Register() {
  const [triggerSubmitReceipt, setTriggerSubmitReceipt] = useState(false);

  const navigation = useNavigate();

  const handleBack = (e) => {
    navigation(`/confirm-otp`);
  };

  return (
    <div className=" relative bg_default text-[#fff] w-screen min-w-full min-h-screen px-[25px] flex flex-col">
      <header
        className="icon-back mt-[7%] py-[36px] h-8 flex items-center opacity-100 max-w-full w-full z-50"
        onClick={(e) => handleBack(e)}
      >
        <i className="fa-solid fa-chevron-left fa-solid-back"></i>
      </header>
      <header className="p-0 w-full h-9 leading-9 text-2xl font-bold-mon">
        NHẬP THÔNG TIN
      </header>
      <div className="container__login-item  p-[16px_0_68px_0] text-[#fff] text-base font-light-mon w-[87%]">
        Nhập thông tin đầy đủ để nhận được các phần quà hấp dẫn tại P&G
      </div>
      <div className="block -mt-10">
        <RegisterComponent />
        <div className="form__footer corlor-text-darkblue">
          <img src={Logo} />
          <span className="form__space1 mb-1">|</span>
          <div className="font-regular-mon text-[#ffffff]">
            Copyright © 2023 MVC Company. All rights reserved.
          </div>
        </div>
      </div>
      <SubmitReceipt trigger={triggerSubmitReceipt}></SubmitReceipt>
    </div>
  );
}
export default Register;
