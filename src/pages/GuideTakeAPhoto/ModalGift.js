import GiftItem from "./GiftItem";
import PropTypes from "prop-types";
import MainPopup from "../../component/ConfirmPopupTnC/MainPopup";
import { Fragment } from "react";

ModalGift.propTypes = {
  isOpen: PropTypes.bool,
  soIds: PropTypes.string,
  listPrize: PropTypes.string,
};
export default function ModalGift({
  isOpen,
  soIds,
  listPrize,
  statusLuckyDraw,
}) {
  return (
    <Fragment>
      {isOpen ? (
        <MainPopup
          flagButton="gift_prize"
          statusLuckyDraw={statusLuckyDraw}
          soIds={soIds}
          listPrize={listPrize}
        >
          <p className="containerNotify__background-list px-2">
            <div className="text-center mb-5">
              Hóa đơn của bạn hợp lệ bạn nhận được các phần thưởng sau
            </div>
            {listPrize.map((infor, index) => {
              return (
                <div key={index} className=" bg-[#f0f0f0] rounded-xl mb-4 ">
                  <GiftItem infor={infor} />
                </div>
              );
            })}{" "}
          </p>
        </MainPopup>
      ) : null}
    </Fragment>
  );
}
