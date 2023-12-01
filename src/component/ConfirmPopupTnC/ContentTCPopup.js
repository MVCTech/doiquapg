import { useState } from "react";
import { useEffect } from "react";

export default function ContentTCPopup() {
  const [checkAgree1, setCheckAgree1] = useState(false);
  const [checkAgree2, setCheckAgree2] = useState(false);

  useEffect(() => {
    const statusAgree = localStorage.getItem("CHECK_AGREE");
    if (statusAgree) {
      setCheckAgree1(true);
      setCheckAgree2(true);
    }
  }, []);
  return (
    <p
      className="containerNotify__background-list dont-break-out font-regular-mon
                   text-left text-[#333] text-[13px] px-1 py-3"
    >
      <div className="checkbox-tc w-full">
        <div className="flex font-light-mon">
          <div>
            <input
              id="default-checkbox"
              type="checkbox"
              defaultChecked={checkAgree1}
              value={checkAgree1}
              className="checkbox-confirm-register w-3 text-blue-600 "
            />
          </div>
          <label htmlFor="check" className="text-[#333333] text-[13px]">
            {" "}
          </label>
          <label
            htmlFor="check"
            className={`corlor-text-black w-full text-left ml-2
                         text-[13px] leading-[20px] font-semibold-mon`}
          >
            Tôi đồng ý
          </label>
        </div>
      </div>
      P&G Việt Nam và đơn vị cung cấp dịch vụ của P&G có thể xử lý dữ liệu cá
      nhân của bạn nhằm mục đích đánh giá điều kiện bạn tham chương trình khuyến
      mại, liên hệ trao giải thưởng, quản lý và báo cáo kết quả của chương trình
      theo quy định của luật pháp. Nếu bạn từ chối đồng ý, bạn sẽ không thể tham
      gia chương trình này. {" "}
      <div className="checkbox-tc w-full pt-3">
        <div className="flex font-light-mon">
          <div>
            <input
              id="default-checkbox"
              type="checkbox"
              defaultChecked={checkAgree2}
              className="checkbox-confirm-register w-3 text-blue-600 "
            />
          </div>
          <label htmlFor="check" className="text-[#333333] text-[13px]">
            {" "}
          </label>
          <label
            htmlFor="check"
            className={`corlor-text-black w-full text-left ml-2
                         text-[13px] leading-[20px] font-semibold-mon`}
          >
            Tôi đồng ý
          </label>
        </div>
      </div>
      P&G Việt Nam và đơn vị cung cấp dịch vụ của P&G có thể xử lý dữ liệu cá
      nhân của bạn nhằm mục đích gửi cho bạn thông tin quảng bá, tiếp thị về các
      sản phẩm, thông tin chương trình khuyến mại và sự kiện của P&G. Các thông
      tin này sẽ được gửi qua tin nhắn với tần suất tối đa 4 lần/tháng. Sự đồng
      ý của bạn sẽ thay thế các lựa chọn từ chối quảng cáo trước đó (bao gồm cả
      việc bạn đã đăng ký danh sách không nhận cuộc gọi quảng cáo "Do not call
      list”), và bạn sẽ thông báo cho P&G biết nếu muốn từ chối nhận quảng cáo. {" "}
    </p>
  );
}
