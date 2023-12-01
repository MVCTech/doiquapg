import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { campaignServices } from "../../services/apiService/campaignServices";
import IconPhoneAndZalo from "../../component/IconPhoneAndZalo/IconPhoneAndZalo";
import CALENDER from "../../assets/fontawesome/image/calender.png";
import "../../assets/css/backgroundPhone.css";
import "../../assets/css/backgroundListNotify.css";
import "../../assets/css/font-text.css";
import "../../assets/css/backgroundButton.css";
import Footer from "../../component/Footer/Footer";
import { formatDate } from "../../utils/format";

export default function HotdealDetails() {
  const appCode = localStorage.getItem("CAMPAIGN_CODE");
  const [campaignDetail, setCampaignDetail] = useState(null);
  const { id } = useParams();
  const navigation = useNavigate();

  const handleBack = () => {
    navigation(`/${appCode}`);
  };
  const getCampaignDetail = (id) => {
    campaignServices
      .getCampaignDetailApi(+id)
      .then((res) => {
        console.log(res);
        setCampaignDetail(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCampaignDetail(id);
    let date1 = new Date().getTime();
    console.log(date1);
  }, []);

  return (
    <div className="contain">
      <div
        className="z-20 fixed top-8 left-5 h-[58px] w-[58px] cursor-pointer"
        onClick={handleBack}
      >
        <div className="containerNotify__header-btnBack h-[40px] w-[60px] cursor-pointer"></div>
      </div>
      <div className="relative z-0 bg-no-repeat h-full">
        <img
          className="relative w-full h-full rounded-3xl"
          src={campaignDetail?.campaign_banner}
          alt=""
        />
        <div
          className="bg-[#ffffff] relative bottom-[55%] top-5 -translate-y-1/2
         left-1/2 -translate-x-1/2 w-11/12 shadow-border rounded-2xl px-5 py-3"
        >
          <div className="text-[#1D86FA] flex text-[13px] leading-4 font-italic-mon">
            <div className="mr-2">
              <img src={CALENDER} className="w-4" />
            </div>
            <span>{formatDate(campaignDetail?.start_date)}</span> -{" "}
            <span>{formatDate(campaignDetail?.end_date)}</span>
          </div>
          <div className="flex justify-between">
            <div className="text-black font-bold-mon text-[18px] leading-6 mt-1">
              {campaignDetail?.name}
            </div>
          </div>
        </div>
      </div>
      <div className="max-h-full px-[25px]">
        <div className="-mt-7 text-[13px] font-light-mon leading-[21px]">
          <div
            dangerouslySetInnerHTML={{
              __html: campaignDetail?.campaign_banner_detail,
            }}
            className="mt-5"
          ></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-12 mt-3 px-6">
        <Link
          className="bg-[#00AF43] col-span-1 leading-5 text-center py-2 text-[16px] font-semibold-mon text-white w-full rounded-2xl cursor-pointer"
          to={`/list-for-customer/${id}/gift`}
        >
          Danh sách <br /> quà tặng
        </Link>
        <Link
          className="bg-[#00A1DF] col-span-1 leading-5 text-center py-2 text-[16px] font-semibold-mon text-white w-full rounded-2xl cursor-pointer"
          to={`/list-for-customer/${id}/prize`}
        >
          Danh sách
          <br />
          trúng thưởng
        </Link>
      </div>
      <div className="flex justify-center mb-[80px] ">
        <Link
          className="color-button-primary font-semibold-mon my-[15px] text-white py-4 px-8 rounded-2xl cursor-pointer"
          to={`/guide-takeaphoto/${campaignDetail?.id}`}
        >
          Tham gia ngay
        </Link>
      </div>
      <Footer />
      <IconPhoneAndZalo className="fixed" />
    </div>
  );
}
