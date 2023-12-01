import ICON_DOTS from "../../assets/fontawesome/image/icon-dots.svg";
import ICON_DOTS_PRIMARY from "../../assets/fontawesome/image/icon-dots-primary.svg";
import { Carousel } from "react-responsive-carousel";
import { getOS } from "../../services/deviceModel";
import BTN_NEXT_GUIDE from "../../assets/fontawesome/image/btn-cancel-guide.svg";
import IP1 from "../../assets/fontawesome/image/ip1.png";
import IP2 from "../../assets/fontawesome/image/ip2.png";
import IP3 from "../../assets/fontawesome/image/ip3.png";
import IP4 from "../../assets/fontawesome/image/ip4.png";
import C1 from "../../assets/fontawesome/image/1.png";
import C2 from "../../assets/fontawesome/image/c2.png";
import C3 from "../../assets/fontawesome/image/c3.png";
import C4 from "../../assets/fontawesome/image/c4.png";
import C5 from "../../assets/fontawesome/image/c5.png";
import C6 from "../../assets/fontawesome/image/c6.png";
import CarouselTakeAPhoto from "../../pages/GuideTakeAPhoto/CarouselTakeAPhoto";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import HEADER_POPUP_PHONE from "../../assets/fontawesome/image/header_popup_phone.png";

const images_iphone = [
  {
    id: 1,
    url: IP1,
    title: "Bước 1: Chọn mục “Cài Đặt” ngoài màn hình chính",
  },
  {
    id: 2,
    url: IP2,
    title: `Bước 2: Chọn Mục “Trình duyệt đang sử dụng” trong “Cài đặt”`,
  },
  {
    id: 3,
    url: IP3,
    title: "Bước 3: Nhấn Toggle để cấp quyền camera",
  },
  {
    id: 4,
    url: IP4,
    title: "Bước 4: Đã cấp quyền Camera",
  },
];
const images_android = [
  {
    id: 1,
    url: C1,
    title: "Bước 1: Chọn mục “Cài Đặt” ngoài màn hình chính",
  },
  {
    id: 2,
    url: C2,
    title: "Bước 2: Vào Mục “Ứng dụng” trong “Cài đặt”",
  },
  {
    id: 3,
    url: C3,
    title: "Bước 3: Chọn trình duyệt mà quý khách đang sử dụng",
  },
  {
    id: 4,
    url: C4,
    title: "Bước 4: Chọn phần “Quyền”",
  },
  {
    id: 5,
    url: C5,
    title: "Bước 5: Chọn mục “Máy ảnh”",
  },
  {
    id: 6,
    url: C6,
    title: "Bước 6: Chọn “Chỉ cho phép khi dùng ứng dụng”",
  },
];

CheckPermission.propTypes = {
  setPopupGuide: PropTypes.object,
  setCheckCam: PropTypes.object,
  isCheckCam: PropTypes.bool,
  typePopup: PropTypes.string,
};
export default function CheckPermission({
  setCheckCam,
  setPopupGuide,
  isCheckCam,
  typePopup,
  dataAndroid,
  dataIOS,
}) {
  const os = getOS();

  const checkPopup = async () => {
    if (isCheckCam === false) {
      toast.warn("Vào cài đặt cấp quyền cho camera và reload lại trang web", {
        autoClose: 5000,
      });
    } else if (isCheckCam === undefined) {
      setPopupGuide(false);
    } else {
      setCheckCam(true);
      setPopupGuide(false);
    }
  };
  return (
    <div
      className="fixed z-50 overflow-y-auto top-0 w-full left-0 show"
      id="modal"
    >
      <div className="flex items-center justify-center min-height-100vh px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-900 opacity-70" />
          <div className="content-popup-condition w-full">
            <div className="popup-otp z-50 px-5">
              <div className="relative top-24">
                <img
                  src={HEADER_POPUP_PHONE}
                  className="border-imgbg absolute -top-5 left-1/2 -translate-x-1/2"
                />
                <div className="bg_popup-cam-guide z-50">
                  <div className="fontTextCheckCam font-bold-mon">
                    <div className="py-2 -mb-5 px-2 text-[19px]">
                      {typePopup === "permissionCam"
                        ? "Cách cấp quyền truy cập camera để chụp hình hóa đơn"
                        : "Hướng dẫn ghim website vào màn hình"}
                    </div>
                    <Carousel
                      className="style-carousel"
                      autoPlay
                      centerMode={false}
                      showArrows={false}
                      infiniteLoop={true}
                      showThumbs={false}
                      showStatus={false}
                      preventMovementUntilSwipeScrollTolerance={false}
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
                          <img src={ICON_DOTS_PRIMARY} className="w-3 h-3" />
                        );
                        const style = isSelected
                          ? { ...defStylePrimary }
                          : { ...defStyle };
                        return (
                          <span
                            className=""
                            style={
                              typePopup === "ghimWebsite"
                                ? {
                                    display: "inline-block",
                                    padding: "65px 4px",
                                  }
                                : typePopup === "permissionCam"
                                ? {
                                    display: "inline-block",
                                    padding: "45px 4px",
                                  }
                                : {
                                    display: "inline-block",
                                    padding: "25px 4px",
                                  }
                            }
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
                      {typePopup === "permissionCam"
                        ? os === "iOS"
                          ? images_iphone?.map((item, index) => (
                              <div
                                key={index}
                                style={{
                                  position: "relative",
                                  padding: "0 10px",
                                }}
                              >
                                <CarouselTakeAPhoto
                                  item={item}
                                  popup={"guide"}
                                />
                              </div>
                            ))
                          : images_android?.map((item, index) => (
                              <div
                                key={index}
                                style={{
                                  position: "relative",
                                  padding: "0 10px",
                                }}
                              >
                                <CarouselTakeAPhoto
                                  item={item}
                                  popup={"guide"}
                                />
                              </div>
                            ))
                        : typePopup === "ghimWebsite"
                        ? os === "iOS"
                          ? dataIOS?.map((item, index) => (
                              <div
                                key={index}
                                style={{
                                  position: "relative",
                                  padding: "0px 10px",
                                }}
                              >
                                <CarouselTakeAPhoto
                                  item={item}
                                  popup={"ghimWebsite"}
                                />
                              </div>
                            ))
                          : dataAndroid?.map((item, index) => (
                              <div
                                key={index}
                                style={{
                                  position: "relative",
                                  padding: "0px 10px",
                                }}
                              >
                                <CarouselTakeAPhoto
                                  item={item}
                                  popup={"ghimWebsite"}
                                />
                              </div>
                            ))
                        : null}
                    </Carousel>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      position: "relative",
                      zIndex: "99999",
                      top: "35px",
                    }}
                  >
                    <button
                      className="font-bold-mon"
                      style={{
                        padding: "8px 15px",
                        marginTop: "25px",
                        marginBottom: "20px",
                        borderRadius: "15px",
                        backgroundColor: "#003DA5",
                        color: "white",
                        display: "flex",
                        fontSize: "12px",
                        justifyItems: "center",
                      }}
                      onClick={checkPopup}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyItems: "center",
                          marginTop: "6px",
                          marginRight: "10px",
                        }}
                      >
                        <img src={BTN_NEXT_GUIDE} />
                      </div>
                      Bỏ qua <br />
                      hướng dẫn
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
