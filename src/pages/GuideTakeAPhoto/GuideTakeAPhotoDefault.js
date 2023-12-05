import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "react-toastify";
import uuid from "react-uuid";
import GiftIconImg from "../../assets/fontawesome/image/gift.png";
import { campaignServices } from "../../services/apiService/campaignServices";
import { homeServices } from "../../services/apiService/homeServices";
import { ocrServices } from "../../services/apiService/ocrServices";
import { receiptServices } from "../../services/apiService/receiptServices";
import { userDataLocal } from "../../services/localService/localService";
import ConfirmPopupLogin from "../../component/ConfirmPopupLogin/ConfirmPopupLogin";
import ModalGift from "./ModalGift";
import "./GuideTakePhoto.css";
import { setAuthorization } from "../../services/apiService/configURL";
import NavbarHome from "../../component/NavbarHome/NavbarHome";
import ConfirmPopupGuideTakePhotoDefault from "../../component/ConfirmPopupGuideTakePhoto/ConfirmPopupGuideTakePhotoDefault";
import LOGO_PG from "../../assets/fontawesome/image/logo_png.png";
import Advantace from "../../assets/fontawesome/image/advantace.png";
import IconNotify from "../../assets/fontawesome/image/icon_notify.svg";
import TAKE_PHOTO from "../../assets/fontawesome/image/takephoto.svg";
import INFO from "../../assets/fontawesome/image/i.svg";
import VONG__QUAY from "../../assets/fontawesome/image/vong_quay.svg";
import GIFT from "../../assets/fontawesome/image/gift.svg";
import { Carousel } from "react-responsive-carousel";
import ICON_DOTS from "../../assets/fontawesome/image/icon-dots.svg";
import ICON_DOTS_PRIMARY from "../../assets/fontawesome/image/icon-dots-primary.svg";
import BTN_NEXT_GUIDE from "../../assets/fontawesome/image/btn-cancel-guide.svg";
import B1_TAKEAPHOTO from "../../assets/fontawesome/image/hd1.png";
import B2_TAKEAPHOTO from "../../assets/fontawesome/image/hd2.png";
import B3_TAKEAPHOTO from "../../assets/fontawesome/image/hd3.png";
import ICON_EXPLAIN from "../../assets/fontawesome/image/icon-explain.svg";
import ICON_RETURN from "../../assets/fontawesome/image/icon-return.png";
import CarouselTakeAPhoto from "../../pages/GuideTakeAPhoto/CarouselTakeAPhoto";
import HEADER_POPUP_PHONE from "../../assets/fontawesome/image/header_popup_phone.png";
import { SET_CHECK_CAM } from "../../services/localService/localService";
import RIGHT_NEXT from "../../assets/fontawesome/image/right-next.jpg";
import LEFT_BACK from "../../assets/fontawesome/image/left-back.jpg";
import PHONE_CONTACT from "../../assets/fontawesome/image/phone-contact.png";
import Compressor from "compressorjs";

const images = [
  {
    id: 1,
    url: B1_TAKEAPHOTO,
    title: `<ul>
      <li>Chụp hóa đơn GỐC và chụp TOÀN BỘ hóa đơn</li>
      <li>Thấy rõ Tên siêu thị, số hóa đơn, sản phẩm, ngày mua.</li></ul>​`,
  },
  {
    id: 2,
    url: B2_TAKEAPHOTO,
    title: `
      <ul>
      <li>Chụp hóa đơn RÕ RÀNG trong điều kiện ánh sáng tốt</li>
      <li>Nền phía sau trơn - đơn giản</li>
      <li>Chú ý không dùng tay che hóa đơn</li>
      </ul>`,
  },
  {
    id: 3,
    url: B3_TAKEAPHOTO,
    title: `
      <ul>
      <li>Gấp hóa đơn lại để hiển thị rõ phần tên sản phẩm và số lượng</li>
     
      </ul>`,
  },
];
export default function GuideTakeAPhotoDefault() {
  const appCode = localStorage.getItem("CAMPAIGN_CODE");
  const phoneData = localStorage.getItem("phoneData");
  const login_type = localStorage.getItem("LOGIN_TYPE");
  const [imageFile, setImageFile] = useState(undefined);
  const [isShowModalErr, setIsShowModalErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isUpload, setIsUpload] = useState(false);
  let [ocrEndpoint, setOcrEndpoint] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [listPrize, setListPrize] = useState([]);
  const [statusLuckyDraw, setStatusLuckyDraw] = useState();

  const [so_ids, setSo_ids] = useState([]);
  const [isAskLogin, setIsAskLogin] = useState(false);
  const navigate = useNavigate();
  let { token } = userDataLocal.get();
  let { campaignId } = useParams();
  let refInputUpload = useRef(null);
  const onClickUpload = (event) => {
    refInputUpload.current?.click();
  };
  const handlePopupErrorOk = () => {
    navigate(`/${appCode}`);
  };
  useEffect(() => {
    console.log(1);
    window.scrollTo(0, 0);
    setAuthorization(token);
    console.log(2);
  }, []);
  const handleChangeImage = (event) => {
    let fileUploaded = event.target.files[0];
    console.log(fileUploaded);
    const fileUploadedSize = fileUploaded.size / 1024 / 1024;
    if (fileUploadedSize > 20) {
      new Compressor(fileUploaded, {
        quality: 0.4,
        success: (res) => {
          setImageFile(res);
        },
      });
    } else if (fileUploadedSize > 10 && fileUploadedSize <= 20) {
      new Compressor(fileUploaded, {
        quality: 0.5,
        success: (res) => {
          setImageFile(res);
        },
      });
    } else if (fileUploadedSize > 6 && fileUploadedSize <= 10) {
      new Compressor(fileUploaded, {
        quality: 0.7,
        success: (res) => {
          setImageFile(res);
        },
      });
    } else if (fileUploadedSize > 3 && fileUploadedSize <= 6) {
      new Compressor(fileUploaded, {
        quality: 0.8,
        success: (res) => {
          setImageFile(res);
        },
      });
    } else {
      setImageFile(fileUploaded);
    }
  };

  const getCampaignDetail = (campaignId) => {
    campaignServices
      .getCampaignDetailApi(campaignId)
      .then((res) => {
        console.log(res);
        setOcrEndpoint(res.ocr_endpoint);
      })
      .catch((err) => {});
  };
  const getHomepageBanner = () => {
    homeServices
      .getRunningCampaignTopAndDown(appCode)
      .then((res) => {
        setOcrEndpoint(res.ocr_endpoint);
      })
      .catch((err) => {});
  };

  const getOcrEndPoint = (campaignId) => {
    if (campaignId) {
      getCampaignDetail(campaignId);
    } else {
      getHomepageBanner();
    }
  };

  useEffect(() => {
    getOcrEndPoint(campaignId);
  }, [campaignId]);
  const pushImageToGCS = () => {
    console.log(imageFile);
    let formDataGCS = new FormData();
    formDataGCS.append("file", imageFile);
    const fileName =
      uuid() +
      "_" +
      format(new Date(), "dd-MM-yyyy-HH-mm-ss") +
      "_" +
      imageFile.name;
    formDataGCS.append("fileName", fileName);
    formDataGCS.append("ocrBase", ocrEndpoint);
    if (!token) {
      navigate(
        `${login_type === "password" ? "/login-password" : "/login-password"}`
      );
    } else {
      setIsUpload(true);
    }
    ocrServices
      .uploadImageToOCR(formDataGCS)
      .then((res) => {
        if (campaignId) {
          console.log(campaignId);
          res.data.campaign_id = campaignId;
        }
        const dataGcs = {
          phoneCheck: phoneData,
        };
        let mergeDataGcsAndPhone = Object.assign(dataGcs, res.data);
        localStorage.setItem(
          "GCS_RESULT",
          JSON.stringify(mergeDataGcsAndPhone)
        );
      })
      .then((res) => {
        if (token) {
          let gcsResult = JSON.parse(localStorage.getItem("GCS_RESULT"));
          submitReceipt(gcsResult);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsUpload(false);
      });
  };

  const submitReceipt = (gcsResult) => {
    let formData = new FormData();
    formData.append("gsutil_url", gcsResult.gsutil_url);
    formData.append("public_url", gcsResult.public_url);
    formData.append("ocr_result", gcsResult.data);
    formData.append(
      "request_id",
      uuid() + "-" + format(new Date(), "ddMMyyyyHHmmss")
    );
    formData.append(
      "receipt_datetime",
      format(new Date(), "yyyy-MM-dd HH:mm:ss")
    );
    if (gcsResult.campaign_id) {
      formData.append("campaign_id", gcsResult.campaign_id);
    }
    receiptServices
      .submitReceiptApi(formData)
      .then((res) => {
        setStatusLuckyDraw(res.lucky_draw);
        setListPrize(res.prize_list);
        setSo_ids(res.pg_so_code);
        toast.success(res);
        setIsOpen(true);
        localStorage.removeItem("GCS_RESULT");
      })
      .catch((err) => {
        setErrMsg(err);
        setIsShowModalErr(true);
      })
      .finally(() => {
        setIsUpload(false);
      });
  };
  const onClickDeleteImg = (e) => {
    setImageFile(undefined);
  };
  const [isGuidePopup, setIsGuidePopup] = useState(false);
  const [isOpenPopupGuide, setIsOpenPopupGuide] = useState(true);
  const handleClosePopup = () => {
    // setIsOpenPopupGuide(false);
    navigate(`/${appCode}`);
  };
  return (
    <>
      {imageFile ? null : (
        <div>
          <div className="mt-2.5">
            <div className="home__container w-screen bg-[100%] max-h-screen rounded-b-[80px] absolute top-0 bg-no-repeat h-[183px]"></div>
          </div>
          <div className="containerNotify__background bg-[#fff] absolute rounded-[30px_30px_0_0] top-4 h-[93%] w-full z-10">
            <ul className="containerNotify__background-list pt-3 box-border  z-30">
              <div className="w-full px-5 max-w-[430px]">
                <div className="flex justify-between max-w-[430px] relative">
                  <img src={LOGO_PG} className="w-12 h-12" />
                  <img src={Advantace} className="w-9/12" />
                  <img src={IconNotify} className="w-12" />
                </div>
              </div>
              <div className="mt-5 hscroll flex justify-around px-5">
                <div className="w-20 background-menu">
                  <div className="h-16 w-16 rounded-[100%] p-3 bg-[#F5F9FF] relative left-1/2 -translate-x-1/2">
                    <img
                      src={TAKE_PHOTO}
                      className="relative top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                    />
                  </div>
                  <div className="menu-bar font-semibold-mon">Chụp hình</div>
                </div>
                <div className="w-20 background-menu">
                  <div className="h-16 w-16 rounded-[100%] p-3 bg-[#F5F9FF] relative left-1/2 -translate-x-1/2">
                    <img
                      src={VONG__QUAY}
                      className="relative top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                    />
                  </div>
                  <div className="menu-bar font-semibold-mon">Vòng quay</div>
                </div>
                <div className="w-20 background-menu">
                  <div className="h-16 w-16 rounded-[100%] p-3 bg-[#F5F9FF] relative left-1/2 -translate-x-1/2">
                    <img
                      src={GIFT}
                      className="relative top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                    />
                  </div>
                  <div className="menu-bar font-semibold-mon">Quà của tôi</div>
                </div>
                <div className="w-20 background-menu">
                  <div className="h-16 w-16 rounded-[100%] p-3 bg-[#F5F9FF] relative left-1/2 -translate-x-1/2">
                    <img
                      src={INFO}
                      className="relative top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                    />
                  </div>
                  <div className="menu-bar font-semibold-mon">
                    Thể lệ
                    <br /> chương trình
                  </div>
                </div>
              </div>
              <div
                className="fixed z-50 overflow-y-auto top-0 w-full left-0 show"
                id="modal"
              >
                <div className="relative flex items-center justify-center min-height-100vh px-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-900 opacity-70" />
                    <div className="content-popup-condition w-full">
                      <div className="popup-otp z-40 px-5">
                        <div className="relative top-20">
                          <div className="containerNotify__background-takephoto h-[80%]">
                            <div className="containerNotify__background-takephotolist">
                              <img
                                src={HEADER_POPUP_PHONE}
                                className="border-imgbg absolute -top-5 left-1/2 -translate-x-1/2"
                              />
                              <div className="bg_popup-cam z-40">
                                <div className="w-full px-3 flex flex-col justify-center items-center">
                                  <div className="w-full">
                                    <Carousel
                                      className="style-carousel"
                                      autoPlay
                                      centerMode={false}
                                      showArrows={false}
                                      infiniteLoop={true}
                                      showThumbs={false}
                                      showStatus={false}
                                      preventMovementUntilSwipeScrollTolerance={
                                        false
                                      }
                                      renderArrowPrev={(
                                        clickHandler,
                                        hasPrev
                                      ) => {
                                        return (
                                          <div
                                            className={`${"absolute"} -top-5 bottom-0 left-0 flex justify-center opacity-80 hover:opacity-100 items-center p-3 cursor-pointer z-50`}
                                            onClick={clickHandler}
                                          >
                                            <div className="w-6 h-6 text-white border-buton">
                                              <img
                                                src={LEFT_BACK}
                                                className="relative rounded-lg left-4 bg-white"
                                              />
                                            </div>
                                          </div>
                                        );
                                      }}
                                      renderArrowNext={(
                                        clickHandler,
                                        hasNext
                                      ) => {
                                        return (
                                          <div
                                            className={`${"absolute"} -top-5 bottom-0 right-0  flex justify-center opacity-80 items-center p-3 hover:opacity-100 cursor-pointer z-20`}
                                            onClick={clickHandler}
                                          >
                                            <div className="w-6 h-6 text-white border-buton">
                                              <img
                                                src={RIGHT_NEXT}
                                                className="relative rounded-lg right-4 bg-white"
                                              />
                                            </div>
                                          </div>
                                        );
                                      }}
                                      renderIndicator={(
                                        onClickHandler,
                                        isSelected,
                                        index,
                                        label
                                      ) => {
                                        const defStyle = (
                                          <img
                                            src={ICON_DOTS}
                                            className="w-3 h-3"
                                          />
                                        );
                                        const defStylePrimary = (
                                          <img
                                            src={ICON_DOTS_PRIMARY}
                                            className="w-3 h-3"
                                          />
                                        );
                                        const style = isSelected
                                          ? { ...defStylePrimary }
                                          : { ...defStyle };
                                        return (
                                          <span
                                            style={{
                                              display: "inline-block",
                                              padding: "78px 4px",
                                            }}
                                            className="inline-block px-2"
                                            onClick={onClickHandler}
                                            onKeyDown={onClickHandler}
                                            value={index}
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
                                      {images.map((item, index) => (
                                        <div
                                          key={index}
                                          style={{ position: "relative" }}
                                        >
                                          <CarouselTakeAPhoto item={item} />
                                        </div>
                                      ))}
                                    </Carousel>
                                  </div>
                                  <div className=" mt-[40px] bg-[#FFFDEE] px-4 pt-3 pb-2 w-full mx-6 rounded-lg">
                                    <div className="grid grid-cols-8">
                                      <div className="col-span-1">
                                        <img src={ICON_EXPLAIN} />
                                      </div>
                                      <div className="w-full col-span-7">
                                        <div className="title-description-bill font-semibold-mon ">
                                          Lưu ý{" "}
                                        </div>
                                        <div className="content-description-bill text-left font-regular-mon mt-1">
                                          Không gấp hoặc che các thông tin ở
                                          phần đầu và cuối hóa đơn.
                                        </div>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-8">
                                      <div className="col-span-1">
                                        <img src={PHONE_CONTACT} />
                                      </div>
                                      <div className=" col-span-7">
                                        <div className="content-description-bill text-left font-regular-mon mt-1 mb-1">
                                          Liên hệ Hotline để được hướng dẫn chi
                                          tiết Số hotline{" "}
                                          <span>
                                            <a
                                              href={"tel:02836222399"}
                                              target="_blank"
                                            >
                                              02836222399
                                            </a>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex mt-[5px] justify-around">
                                      {isGuidePopup ? null : (
                                        <div className="color-button-disable btn-takephoto mr-2 ">
                                          <button
                                            onClick={handleClosePopup}
                                            className="text-btn-cancel font-semibold-mon btn-text justify-center flex items-center"
                                          >
                                            <img
                                              src={ICON_RETURN}
                                              className="mr-3"
                                            />{" "}
                                            Trở lại
                                          </button>
                                        </div>
                                      )}

                                      <div className="color-button-primary btn-takephoto ml-2 w-full">
                                        <div className="flex flex-col justify-center ml-3">
                                          <img
                                            src={BTN_NEXT_GUIDE}
                                            className=" h-6 w-6"
                                          />
                                        </div>
                                        <input
                                          type="file"
                                          hidden
                                          id="actual-btn"
                                          className="w-full"
                                          style={{ display: "none" }}
                                          onChange={(e) => handleChangeImage(e)}
                                          capture
                                          accept="image/*"
                                          ref={refInputUpload}
                                        />
                                        <label
                                          htmlFor="actual-btn"
                                          className="-ml-3 text-btn-cancel w-full font-semibold-mon btn-text corlor-text-white flex justify-center items-center"
                                        >
                                          Bỏ qua
                                          <br /> hướng dẫn
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <ConfirmPopupGuideTakePhotoDefault
                isGuidePopup={isGuidePopup}
                setIsOpenPopupGuide={setIsOpenPopupGuide}
                setImageFile={setImageFile}
              /> */}
            </ul>
            <NavbarHome />
          </div>
        </div>
      )}

      {isUpload ? (
        <div className="z-[200] w-full flex justify-center items-center absolute full-height backdrop-blur-sm flex-col">
          <div className="">
            <button className="w-[100px] h-[100px] load"></button>
          </div>
          <div className="flex justify-center text-center px-[30px] ">
            <p className="bg-slate-100 rounded-xl font-light-mon p-[10px] ">
              Hóa đơn của quý khách đang được hệ thống ghi nhận. Vui lòng không
              rời khỏi màn hình hoặc tắt trình duyệt
            </p>
          </div>
        </div>
      ) : (
        ""
      )}

      <input
        type="file"
        hidden
        id="actual-btn"
        className="w-full"
        style={{ display: "none" }}
        onChange={(e) => handleChangeImage(e)}
        capture
        accept="image/*"
        ref={refInputUpload}
      />
      <>
        {imageFile !== undefined ? (
          <div>
            <img
              src={URL.createObjectURL(imageFile)}
              className="w-full relative h-[90vh] top-0"
              alt="upload view"
            />
            <div className="grid grid-cols-2 gap-[12px] p-4 relative -top-32">
              <label
                htmlFor="actual-btn"
                // onClick={(e) => onClickDeleteImg(e)}
                className="color-button-enable col-span-1 border-0 text-[#130682] font-semibold-mon py-[15px] text-center inline-block rounded-[13px] text-[16px]"
              >
                Chụp lại
              </label>
              <button
                onClick={() => {
                  pushImageToGCS();
                }}
                className="bg-[#0367C1] col-span-1 border-0 text-[#FFFFFF] font-semibold-mon py-[15px] text-center inline-block rounded-[13px] text-[16px]"
              >
                Xác nhận
              </button>
            </div>
            {isAskLogin ? (
              <ConfirmPopupLogin
                image={GiftIconImg}
                labelCancel={"Để sau"}
                labelOK={"Đồng ý"}
                titlePopup="Đăng ký thông tin để nhận phần quà hấp dẫn từ chúng tôi"
                handleCancel={() => {
                  navigate(`/login-no-register`);
                }}
                handleOk={() => {
                  navigate(
                    `${
                      login_type === "password"
                        ? "/login-password"
                        : "/login-password"
                    }`
                  );
                }}
              />
            ) : null}
            <ModalGift
              isOpen={isOpen}
              soIds={so_ids}
              statusLuckyDraw={statusLuckyDraw}
              listPrize={listPrize}
            ></ModalGift>

            {isShowModalErr ? (
              <ConfirmPopupLogin
                image={GiftIconImg}
                labelCancel={"Liên hệ Hotline"}
                labelOK={"Đồng ý"}
                statusError={true}
                titlePopup={errMsg}
                handleCancel={() => {
                  navigate(`/login-no-register`);
                }}
                handleOk={handlePopupErrorOk}
              />
            ) : null}
          </div>
        ) : (
          <div></div>
        )}
      </>
    </>
  );
}
