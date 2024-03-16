import "../../assets/css/noaccess.css";
import desktop from "../../assets/desktop.png";
import scan_qr from "../../assets/scan_qr.png";
import default_qr from "../../assets/default_qr.png";
import bg_default from "../../assets/bg_default.png";
import { isMobileDevice } from "../../services/deviceModel";

const NoAccessBrowser = () => {
  let isMobile = isMobileDevice();

  const background = {
    background: "url(" + desktop + ")",
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  const backgroundMobile = {
    background: "url(" + bg_default + ")",
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    paddingTop: "40vh",
    paddingLeft: "15px",
    paddingRight: "15px",
  };
  return (
    <>
      {isMobile ? (
        <div style={backgroundMobile}>
          <div className="container">
            <div style={{ textAlign: "center" }}>
              <div>
                <div className="noaccess-content">
                  Bạn vui lòng truy cập ứng dụng trên trình duyệt (Không phải ẩn
                  danh) Chrome hoặc Safari của thiết bị di động. Nhấn vào dấu
                  “…” ở góc phải màn hình xong chọn “Mở bằng trình duyệt” để
                  tiếp tục tham gia chương trình.
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={background}>
          <div className="container">
            <div className="qr-container">
              <img className="scan-qr-text inline" src={scan_qr} />
              <img className="qr-code inline" src={default_qr} />
              <br />
              <a className="link-tc" href="#">
                Thể lệ & Điều khoản sử dụng
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoAccessBrowser;
