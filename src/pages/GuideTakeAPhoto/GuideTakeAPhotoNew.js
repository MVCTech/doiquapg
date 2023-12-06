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
import { getOS } from "../../services/deviceModel";

export default function GuideTakeAPhotoNew() {
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
    refInputUpload.current?.click();
    window.scrollTo(0, 0);
    setAuthorization(token);
  }, []);
  const handleChangeImage = (event) => {
    console.log(event)
    let fileUploaded = event.target.files[0];
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
    console.log(imageFile)
    console.log(fileName)
    console.log(ocrEndpoint)

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
        console.log(res)
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
  const [devices, setDevices] = useState([]);
  const [image, setImage] = useState(undefined);
  const [activeDeviceId, setActiveDeviceId] = useState(undefined);
  const [openCam, setOpenCam] = useState(true);
  const check_cam = JSON.parse(localStorage.getItem(SET_CHECK_CAM));
  const [current, setCurrent] = useState("0");

  const camera = useRef(null);
  const os = getOS();
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
  const handleIndex = (id, index) => {
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
      <input
        onChange={(e) => handleChangeImage(e)}
        className="uploadFile"
        style={{ display: "none" }}
        id="upload"
        type="file"
        capture
        accept="image/*"
        ref={refInputUpload}
      />
      <>
        {imageFile ? (
          <div>
            <img
              src={URL.createObjectURL(imageFile)}
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
      {isOpenPopupGuide ? (
        <ConfirmPopupGuideTakePhoto
          isGuidePopup={isGuidePopup}
          setIsOpenPopupGuide={setIsOpenPopupGuide}
        />
      ) : null}
    </>
  );
}
