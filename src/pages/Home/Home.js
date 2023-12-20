import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NavbarHome from "../../component/NavbarHome/NavbarHome";
import { homeServices } from "../../services/apiService/homeServices";
import CarouselMiddleItem from "./CarouselMiddleItem";
import "../../assets/css/font-text.css";
import "../../assets/css/Home.css";
import "../../assets/css/background__Footer.css";
import TAKE_PHOTO from "../../assets/fontawesome/image/takephoto.svg";
import INFO from "../../assets/fontawesome/image/i.svg";
import VONG__QUAY from "../../assets/fontawesome/image/vong_quay.svg";
import GIFT from "../../assets/fontawesome/image/gift.svg";
import LOGO_PG from "../../assets/fontawesome/image/logo_png.png";
import LIKE from "../../assets/fontawesome/image/like.png";
import LIKED from "../../assets/fontawesome/image/liked.png";
import Advantace from "../../assets/fontawesome/image/advantace.png";
import IconNotify from "../../assets/fontawesome/image/icon_notify.svg";
import IconGuideHd from "../../assets/fontawesome/image/iconguide-hd.png";
import JOIN from "../../assets/fontawesome/image/join.png";
import NEXT from "../../assets/fontawesome/image/next.png";
import RIGHT_NEXT from "../../assets/fontawesome/image/right-next.jpg";
import LEFT_BACK from "../../assets/fontawesome/image/left-back.jpg";
import CheckPermission from "../../component/PopupPermissionCamera/CheckPermission";
import ICON_DOTS from "../../assets/fontawesome/image/icon-dots.svg";
import { useQuery } from "react-query";
import ICON_DOTS_PRIMARY from "../../assets/fontawesome/image/icon-dots-primary.svg";
import {
  dataGuideJoin,
  image_android,
  image_ios,
  permissions_android,
  permissions_iphone,
} from "../../utils/dataFormat";
import { LOGIN_TYPE } from "../../services/localService/localService";
import IconPhoneAndZalo from "../../component/IconPhoneAndZalo/IconPhoneAndZalo";
import { format } from "date-fns";
import NewConfirmPopup from "../../component/ConfirmPopupGuideTakePhoto/NewConfirmPopup";
import PopupGeneral from "../../component/PopupPermissionCamera/PopupGeneral";

export default function Home() {
  const login_type = localStorage.getItem("LOGIN_TYPE");
  document.body.style.backgroundColor = "white";
  const { token } = JSON.parse(localStorage.getItem("USER_DATA_LOCAL") || "{}");
  let appCode = window.location.pathname.split("/")[1];
  localStorage.setItem("CAMPAIGN_CODE", appCode);
  const phoneData = JSON.parse(localStorage.getItem("PHONE_NUMBER" || "{}"));
  const navigation = useNavigate();
  const [listCampaign, setListCampaign] = useState();
  const [isOpenPermission, setPopupGuide] = useState(false);
  const [isOpenGhim, setPopupGhim] = useState(false);
  const [campaignClip, setCampaignClip] = useState("");
  const [campaignTop, setCampaignTop] = useState([]);
  const [campaignDown, setCampaignDown] = useState([]);
  const [isGuidePopup, setIsGuidePopup] = useState(false);
  const [isJoinPopup, setIsJoinPopup] = useState(false);
  const [isOpenPopupGuide, setIsOpenPopupGuide] = useState(false);
  const [permission, setCameraPermission] = useState(false);

  const getRunningCampaign = () => {
    homeServices
      .getRunningCampaign(appCode)
      .then((res) => {
        setListCampaign(res.campaign_list);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCampaignClip = () => {
    homeServices
      .getCampaignClip()
      .then((res) => {
        const clip =
          res.homepage_clip_link.replace("watch?v=", "embed/") + "?autoplay=1";
        setCampaignClip(clip);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const campaignBanner = useQuery({
    queryKey: ["getCampaign"],
    queryFn: () => homeServices.getRunningCampaignTopAndDown(appCode),
  });
  const getCampaignTopAndDown = () => {
    homeServices
      .getRunningCampaignTopAndDown(appCode)
      .then((res) => {
        localStorage.setItem(LOGIN_TYPE, res?.login_type);
        localStorage.setItem("CONTACT", res?.banner_middle[0]?.hotline);
        setCampaignTop(res.banner_top);
        setCampaignDown(res.banner_middle);
        localStorage.setItem("BANNER", JSON.stringify(res.banner_middle));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getHomerBanner = () => {
    homeServices
      .getHomepageBannerApi(appCode)
      .then((res) => {
        console.log(res);
        localStorage.setItem("CONTACT", res?.hotline);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getRunningCampaign();
    getCampaignClip();
    getCampaignTopAndDown();
    getHomerBanner();
    const a = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    console.log(a);
  }, []);
  const handleJoin = (status) => {
    // setIsGuidePopup(status);
    setIsJoinPopup(true);
  };
  const handleTakePhoto = (status) => {
    setIsOpenPopupGuide(true);
    setIsGuidePopup(status);
    // navigation(`/guide-takeaphoto`);
  };
  const handleGift = () => {
    if (token) {
      navigation(`/list-gift`);
    } else {
      navigation(`${login_type === "password" ? "/login" : "/login"}`);
    }
  };

  const handleRotation = () => {
    if (token) {
      navigation(`/list-rotation`);
    } else {
      navigation(`${login_type === "password" ? "/login" : "/login"}`);
    }
  };
  const handlePrizeRule = () => {
    navigation(`/prize-rules`);
  };
  const handleGhim = () => {
    setPopupGhim(true);
  };
  const handleHistory = () => {
    navigation(`/list-notify`);
  };
  const handleOpenPopupPermission = () => {
    setPopupGuide(true);
  };
  return (
    <div>
      <div className="mt-2.5">
        <div className="home__container w-screen bg-[100%] max-h-screen rounded-b-[80px] absolute top-0 bg-no-repeat h-[183px]"></div>
      </div>
      <div className="containerNotify__background bg-[#fff] absolute rounded-[30px_30px_0_0] top-4 h-[93%] w-full z-10">
        <ul className="containerNotify__background-list pt-3 box-border  z-30">
          <div className="w-full px-5 max-w-[430px]">
            <div className="flex justify-between w-full max-w-[430px] relative">
              <div className="flex w-full">
                <img src={LOGO_PG} className="w-12 h-12" />
                <div className="ml-2">
                  <div className="font-semibold-mon">Hi</div>
                  <div>{phoneData?.phone ? phoneData?.phone : null}</div>
                </div>
              </div>
              <div className="flex justify-end w-full">
                <img
                  src={IconNotify}
                  className="w-12"
                  onClick={handleHistory}
                />
              </div>
            </div>
            <div className="w-full flex justify-center my-4">
              <img src={Advantace} className="w-9/12" />
            </div>
          </div>
          <div className="mt-5 hscroll flex justify-around px-3">
            <button
              className="w-20 background-menu"
              onClick={() => handleTakePhoto(false)}
            >
              <div className="h-[75px] w-[75px] rounded-[100%] p-3 bg-[#F5F9FF] relative left-1/2 -translate-x-1/2">
                <img
                  src={TAKE_PHOTO}
                  className="relative w-[75px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                />
              </div>
              <div className="menu-bar font-bold-mon">
                Chụp hình
                <br /> hóa đơn
              </div>
            </button>
            <button
              className="h-[75px] w-[75px] background-menu"
              onClick={handleRotation}
            >
              <div className="h-[75px] w-[75px] rounded-[100%] p-3 bg-[#F5F9FF] relative left-1/2 -translate-x-1/2">
                <img
                  src={VONG__QUAY}
                  className="relative top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                />
              </div>
              <div className="menu-bar font-bold-mon">Vòng quay</div>
            </button>
            <button
              className="h-[75px] w-[75px] background-menu"
              onClick={handleGift}
            >
              <div className="h-[75px] w-[75px] rounded-[100%] p-3 bg-[#F5F9FF] relative left-1/2 -translate-x-1/2">
                <img
                  src={GIFT}
                  className="relative top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                />
              </div>
              <div className="menu-bar font-bold-mon">Quà của tôi</div>
            </button>
            <button
              className="h-[75px] w-[75px] background-menu"
              onClick={handlePrizeRule}
            >
              <div className="h-[75px] w-[75px] rounded-[100%] p-3 bg-[#F5F9FF] relative left-1/2 -translate-x-1/2">
                <img
                  src={INFO}
                  className="relative top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                />
              </div>
              <div className="menu-bar font-bold-mon">
                Thể lệ
                <br /> chương trình
              </div>
            </button>
          </div>
          <div className="mt-[25px] w-full px-4">
            <Carousel
              className="max-w-[100vw] w-full m-auto"
              autoPlay
              swipeable={true}
              emulateTouch={false}
              centerMode={false}
              showArrows={true}
              stopOnHover={true}
              infiniteLoop={true}
              showThumbs={false}
              showStatus={false}
              showIndicators={false}
              preventMovementUntilSwipeScrollTolerance={true}
              renderArrowPrev={(clickHandler, hasPrev) => {
                return (
                  <div
                    className={`${"absolute"} top-0 bottom-0 left-0 flex justify-center opacity-80 hover:opacity-100 items-center p-3 cursor-pointer z-50`}
                    onClick={clickHandler}
                  >
                    <div className="w-6 h-6 text-white border-buton">
                      <img
                        src={LEFT_BACK}
                        className="relative rounded-lg -left-3 bg-white"
                      />
                    </div>
                  </div>
                );
              }}
              renderArrowNext={(clickHandler, hasNext) => {
                return (
                  <div
                    className={`${"absolute"} top-0 bottom-0 right-0  flex justify-center opacity-80 items-center p-3 hover:opacity-100 cursor-pointer z-20`}
                    onClick={clickHandler}
                  >
                    <div className="w-6 h-6 text-white border-buton">
                      <img
                        src={RIGHT_NEXT}
                        className="relative rounded-lg -right-3 bg-white"
                      />
                    </div>
                  </div>
                );
              }}
              renderIndicator={(onClickHandler, isSelected, index, label) => {
                const defStyle = <img src={ICON_DOTS} className="w-3 h-3" />;
                const defStylePrimary = (
                  <img src={ICON_DOTS_PRIMARY} className="w-3 h-3" />
                );
                const style = isSelected
                  ? { ...defStylePrimary }
                  : { ...defStyle };
                return (
                  <span
                    className=""
                    style={{
                      display: "inline-block",
                      padding: "25px 4px",
                    }}
                    onClick={onClickHandler}
                    onKeyDown={onClickHandler}
                    key={index}
                    role="button"
                    tabIndex={0}
                    aria-label={`${label} ${index + 1}`}
                  >
                    {style}
                  </span>
                );
              }}
            >
              {campaignBanner?.data?.banner_middle?.map((item) => {
                console.log(item);
                return <CarouselMiddleItem item={item} key={item} />;
              })}
            </Carousel>
          </div>
          <div className="mt-3 px-5">
            <h2 className="font-bold-mon text-[20px]">Hướng Dẫn</h2>
            <div className="mt-3 border-hd px-3 py-4 rounded-xl">
              <div
                className="border-grid shadow-border h-32 bg-white"
                onClick={() => handleJoin(true)}
              >
                <div className="grid grid-cols-12 h-[90px] gap-1 bg-white">
                  <div className="col-span-2 flex items-center">
                    <img src={JOIN} className="w-16" />
                  </div>
                  <div className="col-span-8 text-[15px] font-bold-mon py-4">
                    <div>Hướng dẫn tham gia chương trình</div>
                    <div className="text-[11px] h-0 font-regular-mon mt-2">
                      Hướng dẫn chi tiết tham gia chương trình
                    </div>
                  </div>
                  <div className="col-span-2 py-3 pl-4">
                    <div className="border-iconnext py-4 pl-2">
                      <img src={NEXT} className="w-6" />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="mt-4 border-grid shadow-border h-32 bg-white"
                onClick={() => handleTakePhoto(true)}
              >
                <div className="grid grid-cols-12 h-[90px] gap-1 bg-white">
                  <div className="col-span-2 flex items-center">
                    <img src={IconGuideHd} className="w-16" />
                  </div>
                  <div className="col-span-8 text-[15px] font-bold-mon py-4">
                    <div>Hướng dẫn chụp hóa đơn</div>
                    <div className="text-[11px] h-0 font-regular-mon mt-2">
                      Hướng dẫn chi tiết việc chụp hóa đơn.
                    </div>
                  </div>
                  <div className="col-span-2 py-3 pl-4">
                    <div className="border-iconnext py-4 pl-2">
                      <img src={NEXT} className="w-6" />
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="mt-4 border-grid shadow-border">
                <div
                  className="grid grid-cols-12 gap-1 bg-white"
                  onClick={handleOpenPopupPermission}
                >
                  <div className="col-span-2 flex items-center">
                    <img src={PERMISSIONCAM} className="w-16" />
                  </div>
                  <div className="col-span-8 text-[15px] font-bold-mon py-4">
                    <div>Cách cấp quyền máy ảnh</div>
                    <div className="text-[11px] h-0 font-regular-mon mt-2">
                      Khi không chụp được hóa đơn
                    </div>
                  </div>
                  <div className="col-span-2 py-3 pl-4">
                    <div className="border-iconnext py-4 pl-2">
                      <img src={NEXT} className="w-6" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 border-grid shadow-border">
                <div
                  className="grid grid-cols-12 gap-1 bg-white"
                  onClick={handleGhim}
                >
                  <div className="col-span-2 flex flex-col justify-center">
                    <img src={ICONGHIM} className="w-16" />
                  </div>
                  <div className="col-span-8 text-[15px] font-bold-mon py-4">
                    <div>Phím tắt vào webstie</div>
                    <div className="text-[11px] h-0 font-regular-mon mt-2">
                      Hướng dẫn việc ghim website vào màn hình
                    </div>
                  </div>
                  <div className="col-span-2 py-3 pl-4">
                    <div className="border-iconnext py-4 pl-2">
                      <img src={NEXT} className="w-6" />
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <div>{permission}</div>
            <div className="h-20"></div>
          </div>
        </ul>
      </div>
      {isOpenPopupGuide ? (
        <NewConfirmPopup
          isGuidePopup={isGuidePopup}
          setIsOpenPopupGuide={setIsOpenPopupGuide}
        />
      ) : null}
      {isJoinPopup ? (
        <PopupGeneral
          backgroundButton={true}
          data={dataGuideJoin}
          title={"HƯỚNG DẪN THAM GIA CHƯƠNG TRÌNH"}
          setPopupGuide={setIsJoinPopup}
        />
      ) : null}
      {isOpenPermission ? (
        <CheckPermission
          dataAndroid={permissions_android}
          dataIOS={permissions_iphone}
          typePopup={"permissionCam"}
          setPopupGuide={setPopupGuide}
        />
      ) : null}
      {isOpenGhim ? (
        <CheckPermission
          dataAndroid={image_android}
          dataIOS={image_ios}
          typePopup={"ghimWebsite"}
          setPopupGuide={setPopupGhim}
        />
      ) : null}
      <NavbarHome />
      <IconPhoneAndZalo />
    </div>
  );
}
