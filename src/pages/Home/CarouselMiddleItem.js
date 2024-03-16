import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

CarouselMiddleItem.propTypes = {
  item: PropTypes.object,
};
export default function CarouselMiddleItem({ item }) {
  console.log(item);
  const appCode = localStorage.getItem("CAMPAIGN_CODE");
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (appCode === "") {
    } else {
      navigate(`/deal-details/${item?.id}`);
    }
  };

  return (
    <div onClick={handleNavigate}>
      <div className="rounded-2xl">
        <img
          src={item.home_banner}
          className="px-1 max-h-[151px] rounded-2xl "
        />
      </div>
    </div>
  );
}
