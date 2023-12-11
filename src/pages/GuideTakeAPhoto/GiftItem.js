import PropTypes from "prop-types";
import "../../assets/css/font-text.css";

GiftItem.propTypes = {
  infor: PropTypes.string,
};
export default function GiftItem({ infor }) {
  return (
    <div className="flex relative h-[75px] pl-[14px]">
      <div className="flex flex-col justify-center rounded-2xl">
        <div className="w-[60px]">
          <img className="w-16 h-16" src={infor.image} />
        </div>
      </div>
      <div className="w-full">
        <div className="ml-2 py-2 text-left">
          <div className="text-cut-notify-title font-semibold-mon text-[#363534] text-[12px]">
            {infor.gift_name}
          </div>
          <p className="text-cut-notify font-light-mon text-[12px]">
            {infor.title}
          </p>
        </div>
      </div>
    </div>
  );
}
