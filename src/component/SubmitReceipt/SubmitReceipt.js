import React, { useEffect, useState } from "react";
import ModalGift from "../../pages/GuideTakeAPhoto/ModalGift";
import GiftIconImg from "../../assets/fontawesome/image/gift.png";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import { format } from "date-fns";
import { receiptServices } from "../../services/apiService/receiptServices";
import PropTypes from "prop-types";
import ConfirmPopupLogin from "../ConfirmPopupLogin/ConfirmPopupLogin";
import { setAuthorization } from "../../services/apiService/configURL";
import { userDataLocal } from "../../services/localService/localService";

SubmitReceipt.propTypes = {
  trigger: PropTypes.string,
};
export default function SubmitReceipt({ trigger }) {
  let gcsResult = JSON.parse(localStorage.getItem("GCS_RESULT"));
  const appCode = localStorage.getItem("CAMPAIGN_CODE");
  let { token } = userDataLocal.get();
  const [listPrize, setListPrize] = useState([]);
  const [so_ids, setSo_ids] = useState([]);
  const [isShowModalErr, setIsShowModalErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [statusLuckyDraw, setStatusLuckyDraw] = useState();
  const navigation = useNavigate();
  useEffect(() => {
    if (trigger) {
      submitReceipt(gcsResult);
    }
  }, [trigger]);
  useEffect(() => {
    setAuthorization(token);
  }, []);
  const submitReceipt = (gcsResult) => {
    setIsUpload(true);
    let formData = new FormData();
    formData.append("gsutil_url", gcsResult.gsutil_url);
    formData.append("public_url", gcsResult.public_url);
    formData.append("ocr_result", gcsResult.data);
    // formData.append(
    //   "gsutil_url",
    //   "gs://mvcpro_vn/0c402b2e-59e0-0e41-a9e6-fee187c7a05b_27-02-2024-13-25-15_5fd7415c-6e45-f12f-625a-f01a3490bb9e002de665-93c4-a753-d72b-717e146845a2.jpg"
    // );
    // formData.append(
    //   "public_url",
    //   "https://storage.googleapis.com/mvcpro_vn/0c402b2e-59e0-0e41-a9e6-fee187c7a05b_27-02-2024-13-25-15_5fd7415c-6e45-f12f-625a-f01a3490bb9e002de665-93c4-a753-d72b-717e146845a2.jpg"
    // );
    // formData.append(
    //   "ocr_result",
    //   `{
    //     "customer_name": "10010",
    //     "ticket_number": "",
    //     "counter": "",
    //     "cashier": "000019",
    //     "date_time": "27/02/2024 10:54:00",
    //     "order_number": "ISR10000025245",
    //     "number_items": "1",
    //     "runtime": "1.96",
    //     "product_list": [
    //         {
    //             "barcode": "376892",
    //             "description": "LUOI DAO GILLETTE MACH3+ 3C",
    //             "quantity": 1,
    //             "unitPrice": "199000",
    //             "lineTotalNet": "199000"
    //         }
    //     ],
    //     "total_discount": "",
    //     "total_gross": "199000",
    //     "promotion": true,
    //     "received_creceipt_datetime": "2024-02-27 13:25:16",
    //     "response_result_datetime": "2024-02-27 13:25:18",
    //     "chain": "mega"
    // }
    // `
    // );
    formData.append("phone", localStorage.getItem("phoneData"));
    formData.append("customer_name", localStorage.getItem("nameData"));
    if (gcsResult.campaign_id) {
      formData.append("campaign_id", gcsResult.campaign_id);
    }
    formData.append(
      "request_id",
      uuid() + "-" + format(new Date(), "ddMMyyyyHHmmss")
    );
    formData.append(
      "receipt_datetime",
      format(new Date(), "yyyy-MM-dd HH:mm:ss")
    );
    receiptServices
      .submitReceiptApi(formData)
      .then((res) => {
        console.log(res);
        setStatusLuckyDraw(res.lucky_draw);
        setListPrize(res.prize_list);
        setSo_ids(res.so_ids);
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
  const handlePopupErrorOk = () => {
    navigation(`/${appCode}`);
  };
  return (
    <>
      {isUpload ? (
        <div className="z-[200] w-full  flex justify-center items-center absolute full-height backdrop-blur-sm flex-col">
          <div className="">
            <button className="w-[100px] h-[100px] load"></button>
          </div>
          <div className="flex justify-center text-center px-[30px] ">
            <p className="bg-slate-100 rounded-xl font-light-mon p-[10px] text-black">
              Hóa đơn của quý khách đang được hệ thống ghi nhận. Vui lòng không
              rời khỏi màn hình hoặc tắt trình duyệt
            </p>
          </div>
        </div>
      ) : null}
      <ModalGift
        isOpen={isOpen}
        statusLuckyDraw={statusLuckyDraw}
        soIds={so_ids}
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
            navigation(`/login-no-register`);
          }}
          handleOk={handlePopupErrorOk}
        />
      ) : null}
    </>
  );
}
