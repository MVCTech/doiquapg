import { useLocation, useParams } from "react-router-dom";
import HeaderBackground from "../../component/HeaderBackground/HeaderBackground";
import TabGift from "./TabGift";
import TabReward from "./TabReward";
import { Pagination } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { userServices } from "../../services/apiService/userServices";

export default function ListGiftForCustomer() {
  const location = useLocation();
  const { id } = useParams();
  const typeTab = location.pathname.split("/")[3];
  const [current, setCurrent] = useState("1");
  const [dataListGift, setDataListGift] = useState();
  const [dataListWin, setDataListWin] = useState();
  const [totalPrize, setTotalPrize] = useState();

  const hanldeClick = (e, status_gifts) => {
    setCurrent(e.target.id);
    getMyListGift(status_gifts);
  };
  const getMyListGift = (val) => {};
  const handleD = (data) => {
    console.log(data);
    getWinCampaign(data, id);
  };
  const getPrizeCampaign = (id) => {
    userServices
      .getGiftByCampaign(id)
      .then((res) => {
        console.log(res);
        setDataListGift(res.list_gift);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getWinCampaign = (page, id) => {
    userServices
      .getWinByCampaign(page, id)
      .then((res) => {
        console.log(res);
        setTotalPrize(res);
        setDataListWin(res.list_prizes);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (typeTab === "gift") {
      setCurrent("1");
    } else {
      setCurrent("2");
    }
    getPrizeCampaign(id);
    getWinCampaign(1, id);
  }, []);
  return (
    <div>
      <div className="mt-2.5">
        <HeaderBackground
          TITLE={
            current === "1" ? "Danh sách quà tặng" : "Danh sách trúng thưởng"
          }
          buttonBack={`/deal-details/${id}`}
        />
      </div>
      <div className="containerNotify__background bg-[#fff] absolute rounded-[30px_30px_0_0] top-20 h-[88%] w-full z-10">
        <ul className="containerNotify__background-list pt-3 box-border px-5 z-30">
          <div className="">
            <div className="tab1 flex justify-between items-center align-middle mt-5">
              <div className="flex justify-center flex-auto">
                <button
                  key="1"
                  id={1}
                  disabled={current === `${1}`}
                  onClick={(e) => hanldeClick(e, true)}
                  className="font-semibold-mon mt-[6px]"
                >
                  Danh sách quà tặng
                </button>
              </div>
              <div className="flex justify-center flex-auto">
                <button
                  key="2"
                  id={2}
                  disabled={current === `${2}`}
                  onClick={(e) => hanldeClick(e, false)}
                  className="font-semibold-mon mt-[6px]"
                >
                  Danh sách trúng thưởng
                </button>
              </div>
            </div>
            <div className=" box-border mt-5 ">
              {current === "1" ? (
                <table className="table-auto w-full text-[12px] leading-4 rounded-t-md">
                  <thead className=" h-8 rounded-t-md">
                    <tr className="bg-[#003DA5] text-white font-light-mon rounded-t-2xl">
                      <th className="border-head rounded-tl-xl pl-5 text-left">
                        Tên quà
                      </th>
                      <th className="border-head">Tổng quà</th>
                      <th className="border-head">Đã ra</th>
                      <th className="border-head rounded-tr-xl">Còn lại</th>
                    </tr>
                  </thead>
                  <tbody className="font-bold-mon">
                    {dataListGift?.map((item, index) => (
                      <TabGift item={item} key={index} index={index} />
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="table-auto w-full text-[12px] leading-4 rounded-t-md">
                  <thead className=" h-8 rounded-t-md">
                    <tr className="bg-[#003DA5] text-white font-light-mon rounded-t-2xl">
                      <th className="border-head rounded-tl-xl pl-5 text-left">
                        SĐT
                      </th>
                      <th className="border-head text-left pl-1">
                        Giải thưởng
                      </th>
                      <th className="border-head rounded-tr-xl">Thời gian</th>
                    </tr>
                  </thead>

                  <tbody className="font-bold-mon ">
                    {dataListWin?.map((item, index) => (
                      <TabReward
                        item={item}
                        dataListWin={dataListWin}
                        key={index}
                        index={index}
                      />
                    ))}
                    <div className="h-20"></div>
                  </tbody>
                </table>
              )}
            </div>
            {current === "2" ? (
              <div className="flex justify-center mt-2">
                <Pagination
                  defaultCurrent={1}
                  total={totalPrize?.total_gift}
                  onChange={handleD}
                />
                <div className="h-40"></div>
              </div>
            ) : (
              ""
            )}
          </div>
        </ul>
      </div>
    </div>
  );
}
