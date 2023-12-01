import { Carousel } from "react-responsive-carousel";
import "../../assets/css/guidePage.css";
import "../../assets/css/backgroundButton.css";
import B1IOS from "../../assets/fontawesome/image/b1-ios-guide.png";
import B2IOS from "../../assets/fontawesome/image/b2-ios-guide.png";
import B3IOS from "../../assets/fontawesome/image/b3-ios-guide.png";
import BTN_NEXT_GUIDE from "../../assets/fontawesome/image/btn-cancel-guide.svg";
import CarouselItem from "./CarouselItem";
import ICON_DOTS from "../../assets/fontawesome/image/icon-dots.svg";
import ICON_DOTS_PRIMARY from "../../assets/fontawesome/image/icon-dots-primary.svg";
import { useNavigate } from "react-router-dom";

let os = "ios";
export default function GuidePage() {
  const image_ios = [
    {
      url: B1IOS,
      title: "Bước 1",
      description:
        "Bạn truy cập vào trang web bất kỳ với Safari. Tiếp theo, bạn nhấn vào biểu tượng Chia sẻ (1) trên Safari => Thêm vào màn hình chính (2)",
    },
    {
      url: B2IOS,
      title: " Bước 2",
      description:
        "Bạn truy cập vào trình duyệt web của Chrome. Tiếp theo, chọn thêm vào màn hình chính (2)",
    },
    {
      url: B3IOS,
      title: "Bước 3",
      description:
        "Bạn đặt tên cho shortcut trang web (1) => Thêm (2) là xong. Bạn quay trở lại màn hình chính và thấy biểu tượng của website trên đó là thành công",
    },
  ];
  const image_android = [
    {
      url: B1IOS,
      title: "Bước 1",
      description:
        "Bạn truy cập vào trình duyệt web của Chrome. Tiếp theo, bạn chạm vào biểu tượng Thêm (1)",
    },
    {
      url: B2IOS,
      title: " Bước 2",
      description:
        "Bạn truy cập vào trình duyệt web của Chrome. Tiếp theo, chọn thêm vào màn hình chính (2)",
    },
    {
      url: B3IOS,
      title: "Bước 3",
      description:
        "Bạn đặt tên cho shortcut trang web (1) => Thêm (2) là xong. Bạn quay trở lại màn hình chính và thấy biểu tượng của website trên đó là thành công",
    },
  ];
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/infor-customer`);
  };
  return (
    <div>
      <div className="bg-guide">
        <div className="bg-bottom-guide flex flex-col items-center bg-white rounded-t-[32px] min-h-[90%]">
          <div className="header-info uppercase mt-6 w-80 text-center leading-7 mb-1">
            hướng dẫn ghim website vào màn hình
          </div>
          {os === "ios" ? (
            <div className="header-logo font-semibold-mon flex justify-around items-center w-[60px]">
              <div className="logo-ios"></div>IOS
            </div>
          ) : (
            <div className="header-logo font-semibold-mon flex justify-around items-center w-[100px] text-[green]">
              <div className="logo-android"></div>Android
            </div>
          )}
          <div className="w-full px-5 flex flex-col justify-center items-center">
            <div className="w-full">
              <Carousel
                className="style-carousel"
                autoPlay
                centerMode={false}
                showArrows={false}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                preventMovementUntilSwipeScrollTolerance={false}
                renderIndicator={(onClickHandler, isSelected, index, label) => {
                  const defStyle = <img src={ICON_DOTS} className="w-3 h-3" />;
                  const defStylePrimary = (
                    <img src={ICON_DOTS_PRIMARY} className="w-3 h-3" />
                  );
                  const style = isSelected
                    ? { ...defStylePrimary }
                    : { ...defStyle };
                  return (
                    <span
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
                {os === "ios"
                  ? image_ios.map((item) => <CarouselItem item={item} />)
                  : image_android.map((item) => <CarouselItem item={item} />)}
              </Carousel>
            </div>

            <div
              className="location-btn color-button-primary flex justify-around h-[60px] w-[140px] mt-[230px] mb-[80px] rounded-2xl"
              onClick={handleClick}
            >
              <div className="flex flex-col justify-center ml-3">
                <img src={BTN_NEXT_GUIDE} className=" h-6 w-6" />
              </div>
              <button className="-ml-3 text-btn-cancel font-semibold-mon w-[80px] rounded-2xl z-20 text-[#fff] ">
                Bỏ qua hướng dẫn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
