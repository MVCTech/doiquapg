import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "react-toastify";
import uuid from "react-uuid";
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
import { setAuthorization } from "../../services/apiService/configURL";
import { getOS } from "../../services/deviceModel";
import { handleChangeImage } from "../../utils/compressImage";
import NewConfirmPopup from "../../component/ConfirmPopupGuideTakePhoto/NewConfirmPopup";

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
  const camera = useRef(null);
  const os = getOS();
  const [devices, setDevices] = useState([]);
  const [image, setImage] = useState(undefined);
  const [activeDeviceId, setActiveDeviceId] = useState(undefined);
  const [openCam, setOpenCam] = useState(true);
  const check_cam = JSON.parse(localStorage.getItem(SET_CHECK_CAM));
  const [current, setCurrent] = useState("0");
  const [isCheck, setIsCheck] = useState(false);
  const navigate = useNavigate();
  let { token } = userDataLocal.get();

  let { campaignId } = useParams();
  const handlePopupErrorOk = () => {
    navigate(`/${appCode}`);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    setAuthorization(token);
  }, []);

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
      setIsUpload(true);
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
          navigate(`${login_type === "password" ? "/login" : "/login"}`);
        })
        .catch((err) => {
          console.log(err);
          setIsUpload(false);
        });
    } else {
      setIsUpload(true);
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
    }
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
    // formData.append(
    //   "gsutil_url",
    //   "gs://mvcpro_vn/fd79f1a2-dd01-b3be-8805-5b25affd6f97_30-12-2023-13-22-27_454672bb-2e26-89f4-fca2-d17c4fb645c1432389c0-37d1-46e2-61cb-73fa700755e9.jpg"
    // );
    // formData.append(
    //   "public_url",
    //   "https://storage.googleapis.com/mvcpro_vn/fd79f1a2-dd01-b3be-8805-5b25affd6f97_30-12-2023-13-22-27_454672bb-2e26-89f4-fca2-d17c4fb645c1432389c0-37d1-46e2-61cb-73fa700755e9.jpg"
    // );
    // formData.append(
    //   "ocr_result",
    //   `{
    //     "customer_name": "Coopmart Rach Mieu",
    //     "counter": "20",
    //     "cashier": "13017632-Thi",
    //     "date_time": "11/12/2023 17:00:03",
    //     "order_number": "32729",
    //     "barcode": "0013002023121132729",
    //     "tax_number": "0308123011",
    //     "runtime": "1.67",
    //     "product_list": [
    //         {
    //             "barcode": "4987176200747",
    //             "description": "NGAriel Ctren downy NH T2.5k",
    //             "quantity": 1,
    //             "unitPrice": "169900",
    //             "lineTotalNet": "169900"
    //         },
    //         {
    //             "barcode": "4987176126665",
    //             "description": "NX DOWNY yeuthuong",
    //             "quantity": 1,
    //             "unitPrice": "187000",
    //             "lineTotalNet": "187000"
    //         },
    //         {
    //             "barcode": "4902430284264",
    //             "description": "XB SAFEGUARD th,moc 125g/130",
    //             "quantity": 1,
    //             "unitPrice": "19500",
    //             "lineTotalNet": "19500"
    //         },
    //         {
    //             "barcode": "4902430411776",
    //             "description": "DG H&S SachGau BacHa 350/330",
    //             "quantity": 1,
    //             "unitPrice": "123000",
    //             "lineTotalNet": "123000"
    //         }
    //     ],
    //     "promotion": true,
    //     "received_creceipt_datetime": "2023-12-30 13:22:28",
    //     "response_result_datetime": "2023-12-30 13:22:29",
    //     "chain": "coopmart"
    // }`
    // );
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
        console.log(res);
        setStatusLuckyDraw(res.lucky_draw);
        setListPrize(res.prize_list);
        setSo_ids(res.so_ids);
        toast.success(res);
        setIsOpen(true);
        localStorage.removeItem("GCS_RESULT");
      })
      .catch((err) => {
        localStorage.removeItem("GCS_RESULT");

        setErrMsg(err);
        setIsShowModalErr(true);
      })
      .finally(() => {
        setIsUpload(false);
      });
  };

  const getDeviceId = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter((i) => i.kind == "videoinput");
    console.log(videoDevices);
    const font = ["Webcam", "back", "Camera mặt sau", "Back", "cực rộng"];
    const matching = videoDevices.filter((l) => {
      return font.some((term) => l.label.includes(term));
    });
    const a = [];
    console.log(matching);
    console.log(matching?.reverse());
    // if (os !== "iOS") {

    // }
    setDevices(matching?.reverse());
  };
  useEffect(() => {
    getDeviceId();
    // setTimeout(getDeviceId(), 1000);
  }, []);
  useEffect(() => {
    if (os !== "iOS") {
      setTimeout(() => {
        console.log(devices);
        console.log(devices.length);
        setActiveDeviceId(devices[devices.length - 1]?.deviceId);
      }, 650);
    }
  }, [devices]);
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
        const a = handleChangeImage(file);
        console.log(a);
        setImageFile(a);
      });
    }
  }, [image]);

  const handleCancelCam = () => {
    localStorage.removeItem(SET_CHECK_CAM);
    setImageFile(undefined);
    setImage(undefined);
    setOpenCam(false);
    setIsAskLogin(false);
    navigate(`/${appCode}`);
  };

  useEffect(() => {}, [isCheck === true]);
  const handlePopupQuestion = () => {
    setIsOpenPopupGuide(true);
  };
  const handleIndex = (id, index) => {
    console.log(id);
    setActiveDeviceId(id);
    setCurrent(index);
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
                aspectRatio={
                  activeDeviceId ? 9 / 16 : os === "iOS" ? 9 / 16 : 7 / 15
                }
                videoSourceDeviceId={activeDeviceId}
                facingMode="environment"
                errorMessages={{
                  noCameraAccessible: "",
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
              {os === "iOS" ? null : (
                <div className="relative flex justify-between items-center w-28 bottom-44 bg-black px-4 rounded-3xl opacity-50">
                  {devices.map((d, index) => (
                    <div
                      key={index}
                      className={`${
                        parseInt(current) === index ? "bg-white" : ""
                      } text-[12px] w-8 rounded-2xl h-8 flex justify-between 
                      items-center opacity-100`}
                    >
                      <div className="flex justify-center flex-auto ">
                        <button
                          onClick={() => handleIndex(d.deviceId, index)}
                          className={`${
                            parseInt(current) === index
                              ? "text-black"
                              : "text-white"
                          } font-bold-mon opacity-100`}
                        >
                          {d.label.includes("camera2 2")
                            ? "0.5x"
                            : d.label.includes("camera2 0")
                            ? "1x"
                            : "2x"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                      `${login_type === "password" ? "/login" : "/login"}`
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
        <NewConfirmPopup
          isGuidePopup={isGuidePopup}
          setIsOpenPopupGuide={setIsOpenPopupGuide}
        />
      ) : null}
    </>
  );
}
