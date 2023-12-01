import { useLocation } from "react-router-dom";
import "../../assets/css/background.css";
import "../../assets/css/backgroundHeader.css";
import "../../assets/css/Login.css";
import "../../assets/css/background__Footer.css";
import "../../assets/css/Register.css";
import "react-datepicker/dist/react-datepicker.css";
import RegisterComponentNew from "../../component/RegisterComponent/RegisterComponentNew";
import HeaderBackground from "../UpdateCustomerInfo/HeaderBackground";
import Footer from "../../component/Footer/Footer";

const TITLE = "Đăng kí tài khoản";
const updateInfo = "UPDATE_INFOR";

function RegisterNew() {
  document.body.style.backgroundColor = "white";
  const location = useLocation();
  const back = location.pathname.split("/")[2];

  return (
    <div>
      <HeaderBackground
        TITLE={TITLE}
        buttonBack={`${
          back === "tick" ? `/infor-customer` : `/login-password`
        }`}
      />
      <div className=" w-full bg-white rounded-[30px_30px_0_0] absolute top-[80px] z-50">
        <div className="flex justify-center items-center px-[25px] max-h-full">
          <div className="block ">
            <div className="text-center font-italic-mon text-[13px] mt-5">
              Để tham gia chương trình, vui lòng tạo tài khoản. Quà sẽ được gửi
              bằng tin nhắn qua số điện thoại, vì vậy vui lòng cung cấp thông
              tin chính xác
            </div>
            <RegisterComponentNew updateInfo={updateInfo} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
export default RegisterNew;
