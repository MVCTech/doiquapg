import { Carousel } from "react-responsive-carousel";
import ICON_DOTS from "../../assets/fontawesome/image/icon-dots.svg";
import ICON_DOTS_PRIMARY from "../../assets/fontawesome/image/icon-dots-primary.svg";
import BTN_NEXT_GUIDE from "../../assets/fontawesome/image/btn-cancel-guide.svg";
import B1_TAKEAPHOTO from "../../assets/fontawesome/image/hd1.png";
import GUIDE_IMAGE from "../../assets/fontawesome/image/guide-image.png";

import B2_TAKEAPHOTO from "../../assets/fontawesome/image/hd2.png";
import B3_TAKEAPHOTO from "../../assets/fontawesome/image/hd3.png";
import ICON_EXPLAIN from "../../assets/fontawesome/image/icon-explain.svg";
import ICON_RETURN from "../../assets/fontawesome/image/icon-return.png";
import CarouselTakeAPhoto from "../../pages/GuideTakeAPhoto/CarouselTakeAPhoto";
import { useNavigate } from "react-router-dom";
import HEADER_POPUP_PHONE from "../../assets/fontawesome/image/header_popup_phone.png";
import { Camera } from "../Camera";
import { useRef } from "react";
import { useState } from "react";
import { SET_CHECK_CAM } from "../../services/localService/localService";
import RIGHT_NEXT from "../../assets/fontawesome/image/right-next.jpg";
import LEFT_BACK from "../../assets/fontawesome/image/left-back.jpg";
import PHONE_CONTACT from "../../assets/fontawesome/image/phone-contact.png";

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

export default function NewConfirmPopup({ isGuidePopup, setIsOpenPopupGuide }) {
  const navigate = useNavigate();
  const [activeDeviceId, setActiveDeviceId] = useState(undefined);
  const camera = useRef(null);
  localStorage.setItem(SET_CHECK_CAM, false);
  const hotline = localStorage.getItem("CONTACT");
  const openCamera = () => {
    if (isGuidePopup === false) {
      navigate(`/guide-takeaphoto`);
    }
    setIsOpenPopupGuide(false);
  };
  const handleClosePopup = () => {
    setIsOpenPopupGuide(false);
  };

  return (
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
                      <div className="w-full absolute bottom-5 px-3 flex flex-col justify-center items-center">
                        <div className="relative">
                          <div className="pb-1 flex flex-col items-center">
                            <div className="font-bold-mon text-[17px] pb-1">
                              HƯỚNG DẪN CHỤP HÓA ĐƠN
                            </div>
                            <img src={GUIDE_IMAGE} className="w-10/12" />
                          </div>
                          <ul className="text-left text-[13px]">
                            <li className="flex justify-start items-start">
                              <div className="w-2 h-2 bg-[#96C61C] rounded-2xl mt-1"></div>
                              <div className="ml-1">
                                Chụp hóa đơn{" "}
                                <span className="font-bold-mon">gốc</span> và
                                chụp{" "}
                                <span className="font-bold-mon">toàn bộ</span>{" "}
                                hóa đơn: đủ sáng rõ nét
                              </div>
                            </li>
                            <li className="flex w-full">
                              <div className="w-2 h-2 bg-[#96C61C] rounded-2xl mt-1"></div>
                              <div className="ml-1 w-full">
                                Nếu hóa đơn dài, cần{" "}
                                <span className="font-bold-mon">gấp lại</span>{" "}
                                để hiển thị rõ:{" "}
                                <span className="font-bold-mon">
                                  tên sản phẩm
                                </span>{" "}
                                và{" "}
                                <span className="font-bold-mon">
                                  số lượng, tên siêu thị, số hóa đơn, ngày mua
                                </span>
                              </div>
                            </li>
                            <li className="flex justify-start items-start">
                              <div className="w-2 h-2 bg-[#96C61C] rounded-2xl mt-1"></div>
                              <div className="pl-1">
                                Nền phía sau hình{" "}
                                <span className="font-bold-mon">
                                  {" "}
                                  trơn - đơn giản
                                </span>
                              </div>
                            </li>
                          </ul>
                          {/* <Carousel
                            className="style-carousel"
                            autoPlay
                            centerMode={false}
                            showArrows={false}
                            stopOnHover={true}
                            infiniteLoop={true}
                            showThumbs={false}
                            showStatus={false}
                            preventMovementUntilSwipeScrollTolerance={false}
                            renderArrowPrev={(clickHandler, hasPrev) => {
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
                            renderArrowNext={(clickHandler, hasNext) => {
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
                                <img src={ICON_DOTS} className="w-3 h-3" />
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
                              <div key={index} style={{ position: "relative" }}>
                                <CarouselTakeAPhoto item={item} />
                              </div>
                            ))}
                          </Carousel> */}
                        </div>
                        <div className=" mt-[10px] bg-[#FFFDEE] px-4 pt-3 pb-2 w-full mx-6 rounded-lg">
                          <div className="grid grid-cols-8">
                            <div className="col-span-1">
                              <img src={ICON_EXPLAIN} />
                            </div>
                            <div className="w-full col-span-7">
                              <div className="title-description-bill font-semibold-mon ">
                                Lưu ý{" "}
                              </div>
                              <div className="content-description-bill text-left font-regular-mon mt-1">
                                Không gấp hoặc che các thông tin ở phần đầu và
                                cuối hóa đơn.
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-8">
                            <div className="col-span-1">
                              <img src={PHONE_CONTACT} />
                            </div>
                            <div className=" col-span-7">
                              <div className="content-description-bill text-left font-regular-mon mt-1 mb-1">
                                Liên hệ Hotline để được hướng dẫn chi tiết Số
                                hotline{" "}
                                <span>
                                  <a href={"tel:02836222399"} target="_blank">
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
                                  <img src={ICON_RETURN} className="mr-3" /> Trở
                                  lại
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

                              <button
                                onClick={() => openCamera()}
                                className="-ml-3 text-btn-cancel w-full font-semibold-mon btn-text corlor-text-white flex justify-center items-center"
                              >
                                Bỏ qua
                                <br /> hướng dẫn
                              </button>
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
      <div className="hidden">
        <Camera
          ref={camera}
          permission={true}
          permissionDenied={true}
          aspectRatio={0}
          videoSourceDeviceId={activeDeviceId}
          facingMode="environment"
          errorMessages={{
            noCameraAccessible:
              "No camera device accessible. Please connect your camera or try a different browser.",
            permissionDenied:
              "Permission denied. Please refresh and give camera permission.",
            switchCamera:
              "It is not possible to switch camera to different one because there is only one video device accessible.",
            canvas: "Canvas is not supported.",
          }}
          videoReadyCallback={() => {
            console.log("Video feed ready.");
            localStorage.setItem(SET_CHECK_CAM, true);
          }}
        />
      </div>
    </div>
  );
}
