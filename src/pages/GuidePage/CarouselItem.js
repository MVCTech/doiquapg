import BTN_NEXT from "../../assets/fontawesome/image/btn-next.svg";
import PropTypes from "prop-types";

CarouselItem.propTypes = {
  item: PropTypes.string,
};
export default function CarouselItem({ item }) {
  return (
    <div>
      <img
        src={item.url}
        className="  h-[324px] rounded-2xl bg-center bg-cover duration-500"
      />
      <div className="rounded-lg bg-[#f0f0f0] ">
        <div className="flex w-full mt-5 justify-start items-start mx-6 rounded-lg">
          <div className="">
            <img src={BTN_NEXT} className="btn-next " />
          </div>
          <div className="title-description font-semibold-mon mt-2">
            <div>{item.title}</div>
            <div className="content-description font-light-mon mt-1">
              {item.description}
            </div>
            <div className="content-description font-light-mon my-2">
              Vui lòng gọi Hotline hoặc email về contact@mvc.com.vn để được hỗ
              trợ
            </div>
          </div>
        </div>
        <div className="mt-10"></div>
      </div>
    </div>
  );
}
