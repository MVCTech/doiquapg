import { useLocation } from "react-router-dom";
import "../../assets/css/background.css";
import "../../assets/css/backgroundHeader.css";
import "../../assets/css/Login.css";
import "../../assets/css/background__Footer.css";
import "../../assets/css/Register.css";
import "react-datepicker/dist/react-datepicker.css";
import HeaderBackground from "../UpdateCustomerInfo/HeaderBackground";
import Footer from "../../component/Footer/Footer";
import ForgotPassword from "../../component/RegisterComponent/ForgotPassword";

const TITLE = "Quên mật khẩu";
const updateInfo = "UPDATE_INFOR";

function ForgotPass() {
  document.body.style.backgroundColor = "white";
  const location = useLocation();
  const back = location.pathname.split("/")[2];

  return (
    <div>
      <HeaderBackground
        TITLE={TITLE}
        buttonBack={`${back === "tick" ? `/infor-customer` : `/login`}`}
      />
      <div className=" w-full bg-white rounded-[30px_30px_0_0] absolute top-[80px] z-50">
        <div className="flex justify-center px-5 items-center max-h-full w-full">
          <div className="block w-full">
            <div className="text-center font-italic-mon text-[13px] mt-5 w-full">
              Nhập số điện thoại của bạn để nhận mật khẩu
            </div>
            <ForgotPassword updateInfo={updateInfo} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
export default ForgotPass;
