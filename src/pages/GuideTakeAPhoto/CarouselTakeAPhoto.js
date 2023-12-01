import PropTypes from "prop-types";
import "../../assets/css/guideTakeAPhoto.css";

CarouselTakeAPhoto.propTypes = {
  item: PropTypes.string,
  popup: PropTypes.string,
};
export default function CarouselTakeAPhoto({ item, popup }) {
  return (
    <div>
      <img
        src={item.url}
        style={
          popup === "guide"
            ? {
                height: "285px",
                width: "240px",
              }
            : popup === "ghimWebsite"
            ? { height: "270px", width: "280px" }
            : {
                height: "255px",
                width: "280px",
              }
        }
        className="  rounded-2xl bg-center bg-cover duration-500"
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
          style={
            popup === "guide"
              ? { marginTop: "35px", fontSize: "12px" }
              : popup === "ghimWebsite"
              ? { marginTop: "30px", fontSize: "12px" }
              : { marginTop: "28px", fontSize: "12px" }
          }
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
  );
}
