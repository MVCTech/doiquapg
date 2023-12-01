import HeaderBackground from "./HeaderBackground";
import RegisterComponent from "../../component/RegisterComponent/RegisterComponent";
import { useLocation } from "react-router-dom";
import Footer from "../../component/Footer/Footer";
import { useEffect } from "react";
import { userServices } from "../../services/apiService/userServices";
import { userDataLocal } from "../../services/localService/localService";
import { useState } from "react";

const TITLE = "Cập nhật thông tin";
const updateInfo = "UPDATE_INFOR";

export default function UpdateCustomerInfo() {
  const appCode = localStorage.getItem("CAMPAIGN_CODE");
  const location = useLocation();
  const back = location.pathname.split("/")[2];
  let dataUser = userDataLocal.get();
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
  return (
    <div>
      <HeaderBackground
        TITLE={TITLE}
        buttonBack={`${back === "tick" ? `/infor-customer` : `/${appCode}`}`}
      />
      <div className=" w-full bg-white rounded-[30px_30px_0_0] absolute top-[80px] z-50">
        <div className="flex justify-center items-center px-[25px] mt-[70px]  max-h-full ">
          <div className="block -mt-10">
            <RegisterComponent
              updateInfo={updateInfo}
              dataUserProfile={dataUserProfile}
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
