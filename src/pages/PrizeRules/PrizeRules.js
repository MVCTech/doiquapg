import "../../assets/css/backgroundListNotify.css";
import "../../assets/css/prizeRules.css";
import IconPhoneAndZalo from "../../component/IconPhoneAndZalo/IconPhoneAndZalo";
import Footer from "../../component/Footer/Footer";
import { useEffect, useState } from "react";
import { campaignServices } from "../../services/apiService/campaignServices";
import HeaderBackground from "../UpdateCustomerInfo/HeaderBackground";

const TITLE = "Thể lệ giải thưởng";

export default function PrizeRules() {
  const appCode = localStorage.getItem("CAMPAIGN_CODE");
  const [prizeTerm, setPrizeTerm] = useState(null);
  useEffect(() => {
    campaignServices
      .getPrizeTerm()
      .then((res) => {
        setPrizeTerm(res?.prize_tc);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <HeaderBackground TITLE={TITLE} buttonBack={`/${appCode}`} />
      <div className="containerNotify__background bg-[#fff] absolute rounded-[30px_30px_0_0] top-20 h-[90%] w-full z-10">
        <div className="containerNotify__background-list py-5 box-border z-20 px-3 ">
          <div className=" box-border z-20 mb-14">
            <div className="font-semibold-mon leading-4 "></div>
            <div
              dangerouslySetInnerHTML={{
                __html: prizeTerm,
              }}
              className="font-regular-mon leading-4 text-[13px] mt-3"
            ></div>
          </div>
          <Footer />
        </div>

        <IconPhoneAndZalo />
      </div>
    </div>
  );
}
