import React from "react";
import PropTypes from "prop-types";

CarouselTopItem.propTypes = {
  item: PropTypes.string,
};
export default function CarouselTopItem({ item }) {
  return (
    <div>
      <img
        src={item.home_banner}
        className=" w-full max-h-[300px] rounded-2xl bg-center bg-white bg-cover duration-500"
      />
    </div>
  );
}
