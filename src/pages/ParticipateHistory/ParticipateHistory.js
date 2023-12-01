import HeaderBackground from "../../component/HeaderBackground/HeaderBackground";
import "../../assets/css/participateHistory.css";
import IconPhoneAndZalo from "../../component/IconPhoneAndZalo/IconPhoneAndZalo";
import ParticipateHisItem from "./ParticipateHisItem";
import { useEffect, useState } from "react";
import { historyService } from "../../services/apiService/historyServices";
import { useLocation } from "react-router-dom";
import Footer from "../../component/Footer/Footer";
import { setAuthorization } from "../../services/apiService/configURL";

const TITLE = "Lịch sử tham gia";

export default function ParticipateHistory() {
  const appCode = localStorage.getItem("CAMPAIGN_CODE");
  const location = useLocation();
  const { token } = JSON.parse(localStorage.getItem("USER_DATA_LOCAL") || "{}");
  const back = location.pathname.split("/")[2];
  setAuthorization(token);
  const [listHistory, setListHistory] = useState([]);
  useEffect(() => {
    historyService
      .getListHistory()
      .then((res) => {
        setListHistory(res.history);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <HeaderBackground
        TITLE={TITLE}
        buttonBack={`${back === "tick" ? `/infor-customer` : `/${appCode}`}`}
      />
      <div className="containerNotify__background bg-[#fff] absolute rounded-[30px_30px_0_0] top-20 h-[88%] w-full z-10">
        <ul className="containerNotify__background-list pt-8 box-border z-20 px-3">
          {listHistory?.map((lstProduct, index) =>
            index % 2 === 0 ? (
              <li
                className="grid grid-cols-12 bg-[#f0f0f0] rounded-xl p-2 mb-2"
                key={index}
              >
                <ParticipateHisItem lstProduct={lstProduct} />
              </li>
            ) : (
              <li
                className="grid grid-cols-12 bg-[#ffffff] rounded-xl p-2 mb-2"
                key={index}
              >
                <ParticipateHisItem lstProduct={lstProduct} />
              </li>
            )
          )}
          <div className="h-24"></div>
        </ul>
        <Footer />
      </div>

      <IconPhoneAndZalo />
    </div>
  );
}
