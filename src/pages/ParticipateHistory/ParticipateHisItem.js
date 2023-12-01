import PropTypes from "prop-types";
import CALENDER from "../../assets/fontawesome/image/calender.png";

ParticipateHisItem.propTypes = {
  lstProduct: PropTypes.string,
};
export default function ParticipateHisItem({ lstProduct }) {
  return (
    <>
      <img
        src={lstProduct.campaign_banner}
        className="containerNotify__background-itemImage w-[55px] h-[55px] col-span-2 rounded-lg"
      />
      <div className="containerNotify__background-itemChild pl-1 box-border col-span-10 relative bottom-0">
        <div className="containerNotify__background-itemChildTime font-regular-mon flex justify-between">
          <div className="flex text-[#424242]">
            <img src={CALENDER} className="w-3 h-3 mr-[4px] mt-[2px]" />
            {lstProduct.date}
          </div>
          <div className="corlor-text-primarygreen text-[15px] font-semibold-mon">
            X{lstProduct.count_gift} quà, X{lstProduct.count_voucher} voucher
          </div>
        </div>
        <div className="containerNotify__background-itemChildName font-semibold-mon content-notify  ">
          {lstProduct.title}
        </div>
        <div className="content-description-his font-semibold-mon content-notify corlor-text-darkblue leading-[18px]">
          {lstProduct.campaign_name}
        </div>
      </div>
      <div className="col-span-12 flex justify-between text-[11px] mt-1">
        <div className="font-semibold-mon">
          Mã HĐ | {lstProduct?.receipt_no}
          <span className="text-[#828282] font-regular-mon"></span>
        </div>
        <div className="flex">
          <img src={CALENDER} className="w-3 h-3 mr-1 mt-[2px]" />
          <div className="font-semibold-mon">
            Ngày HĐ | {lstProduct?.receipt_date}
            <span className="text-[#828282] font-regular-mon"></span>
          </div>
        </div>
      </div>
    </>
  );
}
