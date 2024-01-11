import HeaderBackground from "../../component/HeaderBackground/HeaderBackground";
import "../../assets/css/participateHistory.css";
import IconPhoneAndZalo from "../../component/IconPhoneAndZalo/IconPhoneAndZalo";
import ParticipateHisItem from "./ParticipateHisItem";
import { useEffect, useState } from "react";
import { historyService } from "../../services/apiService/historyServices";
import { useLocation } from "react-router-dom";
import Footer from "../../component/Footer/Footer";
import { setAuthorization } from "../../services/apiService/configURL";
import Loading from "../../component/Loading/Loading";
import WARNING from "../../assets/fontawesome/image/warning.png";

const TITLE = "Lịch sử tham gia";

export default function ParticipateHistory() {
  const appCode = localStorage.getItem("CAMPAIGN_CODE");
  const location = useLocation();
  const { token } = JSON.parse(localStorage.getItem("USER_DATA_LOCAL") || "{}");
  const back = location.pathname.split("/")[2];
  const [current, setCurrent] = useState("1");
  const [isLoading, setIsLoading] = useState(false);

  setAuthorization(token);
  const [listHistory, setListHistory] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    getHistory("quotation");
  }, []);
  const getHistory = (status) => {
    historyService
      .getListHistory(status)
      .then((res) => {
        setListHistory(res.history);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const hanldeClick = (e, status_gifts) => {
    setCurrent(e.target.id);
    getHistory(status_gifts);
  };

  return (
    <div>
      <HeaderBackground
        TITLE={TITLE}
        buttonBack={`${back === "tick" ? `/infor-customer` : `/${appCode}`}`}
      />
      <div className="containerNotify__background bg-[#fff] absolute rounded-[30px_30px_0_0] top-20 h-[88%] w-full z-10">
        <div className=" pt-3 pb-2 mx-4 rounded-2xl">
          <div className="tab2 bg-[#F0F0F0] flex justify-between items-center align-middle">
            <div className="flex justify-center flex-auto">
              <button
                key="1"
                id={1}
                disabled={current === `${1}`}
                onClick={(e) => hanldeClick(e, "quotation")}
                className="font-semibold-mon leading-4 mt-[8px] text-[12px]"
              >
                Hóa đơn
                <br /> đang chờ xử lí
              </button>
            </div>
            <div className="flex justify-center flex-auto">
              <button
                key="2"
                id={2}
                disabled={current === `${2}`}
                onClick={(e) => hanldeClick(e, "done")}
                className="font-semibold-mon leading-4 mt-[8px] text-[12px]"
              >
                Hóa đơn hợp lệ
              </button>
            </div>
            <div className="flex justify-center flex-auto">
              <button
                key="3"
                id={3}
                disabled={current === `${3}`}
                onClick={(e) => hanldeClick(e, "cancel")}
                className="font-semibold-mon leading-4 mt-[8px] text-[12px]"
              >
                Hóa đơn
                <br />
                không hợp lệ
              </button>
            </div>
          </div>
        </div>
        {listHistory?.length === 0 ? (
          <div className="relative w-full">
            {isLoading ? (
              <Loading />
            ) : (
              <div className="absolute top-40 left-1/2 -translate-x-1/2 w-ful">
                <img src={WARNING} className="w-full" />
                <div className="text-center font-semibold-mon text-black mt-5 w-full">
                  Không có dữ liệu.
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <ul className="containerNotify__background-list pt-2 box-border z-20 px-4">
              {listHistory?.map((lstProduct, index) =>
                index % 2 === 0 ? (
                  <li
                    className="grid grid-cols-12 bg-[#f0f0f0] rounded-xl p-2 mb-2"
                    key={index}
                  >
                    <ParticipateHisItem
                      lstProduct={lstProduct}
                      current={current}
                    />
                  </li>
                ) : (
                  <li
                    className="grid grid-cols-12 bg-[#ffffff] rounded-xl p-2 mb-2"
                    key={index}
                  >
                    <ParticipateHisItem
                      lstProduct={lstProduct}
                      current={current}
                    />
                  </li>
                )
              )}

              <div className="h-24"></div>
            </ul>
          </>
        )}
        <Footer />
      </div>

      <IconPhoneAndZalo />
    </div>
  );
}
