import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "react-toastify";
import uuid from "react-uuid";
import Compressor from "compressorjs";
import GiftIconImg from "../../assets/fontawesome/image/gift.png";
import HOI from "../../assets/fontawesome/image/hoi.png";
import { campaignServices } from "../../services/apiService/campaignServices";
import { homeServices } from "../../services/apiService/homeServices";
import { ocrServices } from "../../services/apiService/ocrServices";
import { receiptServices } from "../../services/apiService/receiptServices";
import { Camera } from "../../component/Camera";
import {
  SET_CHECK_CAM,
  userDataLocal,
} from "../../services/localService/localService";
import ConfirmPopupLogin from "../../component/ConfirmPopupLogin/ConfirmPopupLogin";
import ModalGift from "./ModalGift";
import CheckPermission from "../../component/PopupPermissionCamera/CheckPermission";
import "./GuideTakePhoto.css";
import CAM from "../../assets/fontawesome/image/cam.png";
import {
  permissions_android,
  permissions_iphone,
} from "../../utils/dataFormat";
import ConfirmPopupGuideTakePhoto from "../../component/ConfirmPopupGuideTakePhoto/ConfirmPopupGuideTakePhoto";
import { setAuthorization } from "../../services/apiService/configURL";

export default function GuideTakeAPhoto() {
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
  const [isOpenPopupGuide, setIsOpenPopupGuide] = useState(false);
  const [isGuidePopup, setIsGuidePopup] = useState(false);

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
    window.scrollTo(0, 0);
    setAuthorization(token);
  }, []);
  const handleChangeImage = (event) => {
    let fileUploaded = event;
    const fileUploadedSize = fileUploaded.size / 1024 / 1024;
    if (fileUploadedSize > 20) {
      new Compressor(fileUploaded, {
        quality: 0.4, // 0.6 can also be used, but its not recommended to go below.
        success: (res) => {
          setImageFile(res);
        },
      });
    } else if (fileUploadedSize > 10 && fileUploadedSize <= 20) {
      new Compressor(fileUploaded, {
        quality: 0.5, // 0.6 can also be used, but its not recommended to go below.
        success: (res) => {
          setImageFile(res);
        },
      });
    } else if (fileUploadedSize > 6 && fileUploadedSize <= 10) {
      new Compressor(fileUploaded, {
        quality: 0.7, // 0.6 can also be used, but its not recommended to go below.
        success: (res) => {
          setImageFile(res);
        },
      });
    } else if (fileUploadedSize > 3 && fileUploadedSize <= 6) {
      new Compressor(fileUploaded, {
        quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
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
  const onClickDeleteImg = (e) => {
    setImageFile(undefined);
    setImage(undefined);
    setOpenCam(true);
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

  const [image, setImage] = useState(undefined);
  const [activeDeviceId, setActiveDeviceId] = useState(undefined);
  const [openCam, setOpenCam] = useState(true);
  const check_cam = JSON.parse(localStorage.getItem(SET_CHECK_CAM));

  function urltoFile(url, filename, mimeType) {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  }
  useEffect(() => {
    if (image !== undefined) {
      urltoFile(image, uuid() + uuid() + ".jpg", "image/jpeg").then(function (
        file
      ) {
        handleChangeImage(file);
      });
    }
  }, [image]);
  const camera = useRef(null);

  const handleCancelCam = () => {
    localStorage.removeItem(SET_CHECK_CAM);
    setImageFile(undefined);
    setImage(undefined);
    setOpenCam(false);
    setIsAskLogin(false);
    navigate(`/${appCode}`);
  };

  const [isCheck, setIsCheck] = useState(false);
  const [popupGuide, setPopupGuide] = useState(true);
  useEffect(() => {}, [isCheck === true]);
  const handlePopupQuestion = () => {
    setIsOpenPopupGuide(true);
  };
  return (
    <>
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
      {openCam ? (
        <div className="popup-box-cam" style={{ backgroundColor: "#333333" }}>
          {image === undefined ? (
            <>
              <Camera
                ref={camera}
                aspectRatio={9 / 13.6}
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
                  setIsCheck(true);
                  localStorage.setItem(SET_CHECK_CAM, true);
                }}
              />

              <div
                style={{
                  backgroundColor: "#333333",
                  width: "100%",
                  height: "200px",
                  position: "relative",
                  zIndex: "20",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#333333",
                    opacity: 0.9,
                    borderTopLeftRadius: "40px",
                    borderTopRightRadius: "40px",
                    height: "80%",
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    position: "relative",
                    zIndex: "0",
                    top: "-150px",
                  }}
                >
                  <button
                    style={{
                      position: "absolute",
                      opacity: 1,
                      top: "20px",
                      left: "25px",
                    }}
                    className="btn-cancel cam-hd1"
                    onClick={handlePopupQuestion}
                  >
                    <img
                      src={HOI}
                      style={{
                        width: "30px",
                        position: "relative",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    />
                  </button>
                  <div
                    className=""
                    style={{
                      position: "absolute",
                      top: "15px",
                      width: "90px",
                      height: "90px",
                      border: " 3px solid #4d4a4a",
                      borderRadius: "32px",
                    }}
                  >
                    <button
                      style={{
                        position: "relative",
                        top: "-6px",
                        zIndex: "50",
                        backgroundColor: "#1a5999",
                        opacity: 1,
                      }}
                      className="btn-webcam "
                      onClick={() => {
                        if (camera.current) {
                          setOpenCam(false);
                          const photo = camera.current.takePhoto();
                          setImage(photo);
                        }
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          marginTop: "8px",
                          justifyContent: "center",
                          alignItems: "center",
                          justifyItems: "center",
                        }}
                      >
                        <img
                          src={CAM}
                          className="w-9 mb-3 relative z-50 opacity-100"
                          style={{ textAlign: "center" }}
                        />
                      </div>
                    </button>
                  </div>
                  <button
                    style={{
                      position: "absolute",
                      opacity: 1,
                      top: "30px",
                      right: "30px",
                      width: "75px",
                      height: "65px",
                      padding: "10px 10px",
                      borderRadius: "18px",
                      fontSize: "20px",
                      color: "white",
                      backgroundColor: "#1a9ad1",
                      fontWeight: "700",
                    }}
                    onClick={handleCancelCam}
                  >
                    Đóng
                  </button>
                </div>
              </div>
              {check_cam === false ? (
                <CheckPermission
                  dataAndroid={permissions_android}
                  dataIOS={permissions_iphone}
                  typePopup={"permissionCam"}
                  setCheckCam={setIsCheck}
                  setPopupGuide={setPopupGuide}
                  isCheckCam={check_cam}
                />
              ) : null}
            </>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <>
          {image !== undefined ? (
            <div>
              <img
                src={image}
                className="w-full relative top-0"
                alt="upload view"
              />
              <div className="grid grid-cols-2 gap-[12px] p-4 relative -top-32">
                <button
                  onClick={(e) => onClickDeleteImg(e)}
                  className="color-button-enable col-span-1 border-0 text-[#130682] font-semibold-mon py-[15px] text-center inline-block rounded-[13px] text-[16px]"
                >
                  Chụp lại
                </button>
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
      )}
      {isOpenPopupGuide ? (
        <ConfirmPopupGuideTakePhoto
          isGuidePopup={isGuidePopup}
          setIsOpenPopupGuide={setIsOpenPopupGuide}
        />
      ) : null}
    </>
  );
}
