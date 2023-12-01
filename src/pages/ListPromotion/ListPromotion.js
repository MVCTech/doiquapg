import { Chrono } from "react-chrono";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../assets/css/listPromotion.css";
import HeaderBackground from "../../component/HeaderBackground/HeaderBackground";
import NavbarHome from "../../component/NavbarHome/NavbarHome";
import IconPhoneAndZalo from "../../component/IconPhoneAndZalo/IconPhoneAndZalo";
import { campaignServices } from "../../services/apiService/campaignServices";

const TITLE = "Danh sách khuyến mãi";

export default function ListPromotion() {
  const navigation = useNavigate();
  const appCode = localStorage.getItem("CAMPAIGN_CODE");
  const [campaignPro, setCampaignPro] = useState([]);
  useEffect(() => {
    campaignServices.getCampaign().then((res) => {
      const list = res.campaign_list.map(
        ({ id, start_date, campaign_avatar }) => ({
          id_list: id,
          title: start_date
            .toString()
            .split("-")
            .reverse()
            .join("/")
            .substring(
              start_date
                .toString()
                .split("-")
                .reverse()
                .join("/")
                .indexOf("/") + 1
            ),
          url: campaign_avatar,
          media: {
            type: "IMAGE",
            name: "hello",
            source: {
              url: campaign_avatar,
            },
          },
        })
      );
      setCampaignPro(list);
    });
  }, []);

  const hanleDetail = (lst) => {
    navigation(`/deal-details/${lst.id_list}`);
  };

  return (
    <>
      <HeaderBackground TITLE={TITLE} buttonBack={`/${appCode}`} />
      <div className="containerNotify__background bg-[#fff] absolute rounded-[30px_30px_0_0] bottom-0 h-[86%] w-full z-10">
        {campaignPro.length !== 0 && (
          <Chrono
            onItemSelected={hanleDetail}
            activeItemIndex={-1}
            items={campaignPro}
            mode="VERTICAL"
            scrollable={{ scrollbar: true }}
            slideShow={true}
            hideControls={true}
            lineWidth={5}
            showAllCardsHorizontal={false}
            borderLessCards
            cardWidth={2000}
            cardHeight={100}
            theme={{
              primary: "#98EBFF",
              secondary: "#fff",
              titleColor: "#fff",
              titleColorActive: "#fff",
            }}
            classNames={{
              card: "my-card",
              cardMedia: "my-card-media",
              cardSubTitle: "my-card-subtitle",
              cardText: "my-card-text",
              cardTitle: "my-card-title",
              controls: "my-controls",
              title: "my-title",
            }}
            fontSizes={{}}
          >
            <div className="chrono-icons">
              {campaignPro.map((res) => res.title)}
            </div>
          </Chrono>
        )}
      </div>
      <IconPhoneAndZalo />
      <NavbarHome />
    </>
  );
}
