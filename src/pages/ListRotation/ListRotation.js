import IconPhoneAndZalo from "../../component/IconPhoneAndZalo/IconPhoneAndZalo";
import { useEffect, useState } from "react";
import { luckyDrawService } from "../../services/apiService/LuckyDraw";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../component/Footer/Footer";
import "../../assets/css/listRotation.css";
import "../../assets/css/font-text.css";
import "../../assets/css/backgroundListNotify.css";
import "../../assets/css/backgroundPhone.css";
import HeaderBackground from "../UpdateCustomerInfo/HeaderBackground";
import { WHEEL_LUOTQUAY, WHEEL_PHANTHUONG } from "../../utils/KeyConstant";

const TITLE = "Danh sách vòng quay";

export default function ListRotation() {
  const [luckyDrawList, setLuckyDrawList] = useState([]);
  const appCode = localStorage.getItem("CAMPAIGN_CODE");
  const navigation = useNavigate();
  useEffect(() => {
    localStorage.removeItem(WHEEL_LUOTQUAY);
    localStorage.removeItem(WHEEL_PHANTHUONG);
    luckyDrawService
      .getLuckyDrawList()
      .then((res) => {
        console.log(res)
        setLuckyDrawList(res.lucky_draw_list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleToarstErr = () => {
    toast.error("Không có vòng quay");
  };
  const redirectWheel = (id) => {
    navigation(`/wheel/${id}`);
  };
  return (
    <div className="contain">
      <HeaderBackground TITLE={TITLE} buttonBack={`/${appCode}`} />
      <div className="containerNotify__background bg-[#fff] max-h-full absolute rounded-[30px_30px_0_0] top-20 h-[88%] w-full z-10">
        <ul className="containerNotify__background-list pt-8 box-border z-20">
          {luckyDrawList?.map((item) => (
            <li
              key={item.so_id}
              className={`mx-[25px] rounded-2xl flex items-center h-[126px] bg-[#F0F0F0] mb-4 overflow-hidden ${
                item.remaining_draw > 0 ? "" : "filter grayscale"
              }`}
            >
              <div
                className="w-full flex"
                onClick={
                  item?.remaining_draw > 0
                    ? () => redirectWheel(item.pg_so_code)
                    : () => handleToarstErr()
                }
              >
                <div className="flex">
                  <div className="pl-[13px] flex justify-center items-center">
                    <img
                      src={item?.campaign_avatar}
                      className="object-cover image-product w-[100px] h-[100px] text-center rounded-2xl"
                      alt=""
                    />
                    <div className="col-span-6 gird grid-cols-1 relative -ml-[5px] pl-3">
                      <div className="col-span-1 text-reponsive w-full text-[13px] leading-[18px] font-semibold-mon">
                        {item.title}
                        <br />
                      </div>
                      <div className="col-span-1">
                        <div className=" text-reponsive text-[14px] font-regular-mon leading-[20px]  text-[#828282] ">
                          Bạn có{" "}
                          <span className="text-red-600">
                            {item.remaining_draw}
                          </span>{" "}
                          vòng quay{" "}
                          {item.remaining_draw === 0 ? (
                            ""
                          ) : (
                            <span className="text-[13px] text-[#003DA5] font-semibold-mon">
                              (Nhấn quay ngay)
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-reponsive-date font-italic-mon text-[#828282]">
                        Ngày tham gia{" "}
                        <span className="text-[#1D86FA] dont-break-out">
                          {item.join_date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flex flex-col justify-end items-end align-bottom bottom-0 h-full "
                onClick={
                  item?.remaining_draw > 0
                    ? () => redirectWheel(item.pg_so_code)
                    : () => handleToarstErr()
                }
              >
                <div className="bgr-icon-back flex background-bottom-icon w-14 h-14 z-30">
                  <div className="icon-bottom w-6 h-6 z-40 mt-5 ml-5"></div>
                </div>
              </div>
            </li>
          ))}
          <div className="h-14"></div>
        </ul>
        <Footer />
      </div>
      <IconPhoneAndZalo />
    </div>
  );
}
