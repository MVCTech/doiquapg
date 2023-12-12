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
import PHONE_CONTACT from "../../assets/fontawesome/image/phone-contact.png";

PopupGeneral.propTypes = {
  setPopupGuide: PropTypes.object,
  setCheckCam: PropTypes.object,
  isCheckCam: PropTypes.bool,
  typePopup: PropTypes.string,
};
export default function PopupGeneral({
  setCheckCam,
  backgroundButton,
  setPopupGuide,
  isCheckCam,
  title,
  typePopup,
  data,
}) {
  const os = getOS();

  const checkPopup = async () => {
    setPopupGuide(false);
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
                    <div className="py-2 -mb-5 px-5 text-[16px]">{title}</div>
                    <Carousel
                      className="style-carousel"
                      centerMode={false}
                      showArrows={false}
                      infiniteLoop={true}
                      stopOnHover={true}
                      width={"100%"}
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
                              backgroundButton
                                ? {
                                    display: "inline-block",
                                    padding: "55px 4px",
                                  }
                                : {
                                    display: "inline-block",
                                    padding: "60px 4px",
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
                      {data?.map((item, index) => (
                        <div
                          key={index}
                          style={{
                            position: "relative",
                            padding: "0px 5px",
                            width: "100%",
                          }}
                        >
                          <div>
                            <img
                              src={item.url}
                              style={
                                backgroundButton
                                  ? { height: "290px", width: "250px" }
                                  : { height: "305px", width: "380px" }
                              }
                              className="rounded-2xl bg-center bg-cover duration-500"
                            />
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                width: "90%",
                                marginTop: "5px",
                              }}
                            >
                              <div
                                className="title-gu font-semibold-mon w-full"
                                style={{ marginTop: "48px", fontSize: "12px" }}
                              >
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: item.title,
                                  }}
                                  className="style-li ml-1 w-[380px]"
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Carousel>
                  </div>
                  <div className="px-3">
                    <div
                      style={
                        backgroundButton
                          ? {
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                              padding: "10px",
                              position: "relative",
                              zIndex: "99999",
                              top: "75px",
                              borderRadius: "8px",
                              backgroundColor: "#FFFDEE",
                            }
                          : {}
                      }
                    >
                      {backgroundButton ? (
                        <div className="flex ">
                          <div>
                            <img src={PHONE_CONTACT} />
                          </div>
                          <div className="font-regular-mon ml-2 text-left text-[#4F4F4F] text-[12px]">
                            Liên hệ Hotline để được hướng dẫn chi tiết Số
                            hotline{" "}
                            <span>
                              <a
                                href="tel:02836222399"
                                className="font-bold-mon"
                              >
                                (028) 36222399
                              </a>
                            </span>
                          </div>
                        </div>
                      ) : null}

                      <button
                        className="font-bold-mon"
                        style={
                          backgroundButton
                            ? {
                                padding: "5px 10px",
                                marginTop: "5px",
                                marginBottom: "0px",
                                borderRadius: "10px",
                                backgroundColor: "#003DA5",
                                color: "white",
                                display: "flex",
                                fontSize: "12px",
                                justifyItems: "center",
                              }
                            : {
                                position: "absolute",
                                bottom: "10px",
                                padding: "5px 10px",
                                marginTop: "5px",
                                marginBottom: "0px",
                                borderRadius: "10px",
                                backgroundColor: "#003DA5",
                                color: "white",
                                left: "50%",
                                transform: "translateX(-50%)",
                                display: "flex",
                                fontSize: "12px",
                                justifyItems: "center",
                              }
                        }
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
    </div>
  );
}
