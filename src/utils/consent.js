export const Consent = ({
  checkAgree1,
  checkAgree2,
  setCheckAgree1,
  setCheckAgree2,
}) => {
  const handleAgree = (e) => {
    if (e === "ag1") {
      setCheckAgree1(!checkAgree1);
    } else if (e === "ag2") {
      setCheckAgree2(!checkAgree2);
    }
  };
  return (
    <div>
      <div className="mt-5 flex font-light-mon">
        <div>
          <input
            id="default-checkbox"
            type="checkbox"
            checked={checkAgree1}
            value={checkAgree1}
            onClick={(e) => handleAgree("ag1")}
            className="checkbox-confirm-register w-3 h-3 text-blue-600"
          />
        </div>
        <label htmlFor="check" className="text-[#333333] mr-[10px] text-[13px]">
          {" "}
        </label>
        <label
          htmlFor="check"
          className={"corlor-text-darkblack font-semibold-mon"}
        >
          Tôi đồng ý
        </label>
      </div>
      <div className="font-regular-mon text-[13px]">
        P&G Việt Nam và đơn vị cung cấp dịch vụ của P&G có thể xử lý dữ liệu cá
        nhân của bạn nhằm mục đích đánh giá điều kiện bạn tham chương trình
        khuyến mại, liên hệ trao giải thưởng, quản lý và báo cáo kết quả của
        chương trình theo quy định của luật pháp. Nếu bạn từ chối đồng ý, bạn sẽ
        không thể tham gia chương trình này. 
      </div>

      <div className="mt-5 flex font-light-mon">
        <div>
          <input
            id="default-checkbox"
            type="checkbox"
            checked={checkAgree2}
            value={checkAgree2}
            onClick={(e) => handleAgree("ag2")}
            className="checkbox-confirm-register w-3 h-3 text-blue-600"
          />
        </div>
        <label htmlFor="check" className="text-[#333333] mr-[10px] text-[13px]">
          {" "}
        </label>
        <label
          htmlFor="check"
          className={"corlor-text-darkblack font-semibold-mon"}
        >
          Tôi đồng ý
        </label>
      </div>
      <div className="font-regular-mon text-[13px]">
        P&G Việt Nam và đơn vị cung cấp dịch vụ của P&G có thể xử lý dữ liệu cá
        nhân của bạn nhằm mục đích gửi cho bạn thông tin quảng bá, tiếp thị về
        các sản phẩm, thông tin chương trình khuyến mại và sự kiện của P&G. Các
        thông tin này sẽ được gửi qua tin nhắn với tần suất tối đa 4 lần/tháng.
        Sự đồng ý của bạn sẽ thay thế các lựa chọn từ chối quảng cáo trước đó
        (bao gồm cả việc bạn đã đăng ký danh sách không nhận cuộc gọi quảng cáo
        "Do not call list”), và bạn sẽ thông báo cho P&G biết nếu muốn từ chối
        nhận quảng cáo. 
      </div>
      <div className="font-regular-mon mt-2 text-[13px]">
        Bạn quyết định việc đánh dấu vào các ô bên trên để xác nhận đồng ý cho
        chúng tôi sử dụng dữ liệu cá nhân của bạn. Lựa chọn từ chối của bạn có
        thể ảnh hưởng đến việc bạn được nhận sản phẩm/dịch vụ mà chúng tôi cung
        cấp theo chương trình, cũng như giới hạn trải nghiệm mà bạn có được khi
        tham gia chương trình này. P&G sẽ chia sẻ dữ liệu cá nhân của bạn với
        đơn vị cung cấp dịch vụ được P&G ủy quyền thực hiện chương trình và/hoặc
        chuyển dữ liệu cá nhân của bạn đến một địa điểm bên ngoài Việt Nam cho
        các mục đích xử lý được mô tả trên đây. P&G không bán dữ liệu cá nhân
        của bạn cho bên thứ ba. Bằng cách đánh dấu vào các ô ở trên, bạn đồng ý
        cho P&G được thu thập, sử dụng, xử lý và chuyển dữ liệu cá nhân của bạn
        theo Chính sách quyền riêng tư của chúng tôi, chi tiết tại{" "}
        <a
          href="https://www.pg.com/privacy/english/privacy_statement.shtml."
          target="_blank"
          className="dont-break-out text-[#003DA5] font-semibold-mon"
        >
          https://www.pg.com/privacy/english/privacy_statement.shtml.
        </a>
      </div>
    </div>
  );
};
