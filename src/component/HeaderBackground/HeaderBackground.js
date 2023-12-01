import { useNavigate } from "react-router-dom";
import "../../assets/css/backgroundListNotify.css";
import "../../assets/css/backgroundPhone.css";
import "../../assets/css/font-text.css";
import PropTypes from "prop-types";

HeaderBackground.propTypes = {
  clickFilter: PropTypes.func,
  TITLE: PropTypes.string,
  buttonBack: PropTypes.string,
  filter: PropTypes.string,
};
export default function HeaderBackground({
  TITLE,
  buttonBack,
  filter,
  clickFilter,
}) {
  const navigation = useNavigate();
  const handleBack = () => {
    navigation(buttonBack);
  };
  const handleFilter = () => {
    navigation(clickFilter);
  };
  return (
    <div className="contain">
      <div className="containerNotify w-full min-h-full h-[250px] bg-no-repeat absolute z-10 left-0 top-0">
        <div className="containerNotify__header h-[80px] w-full flex items-center p-[0_20px_0_20px]">
          <div
            className="h-[45px] w-[43px] opacity-80 cursor-pointer"
            onClick={handleBack}
          >
            <div className="containerNotify__header-btnBack h-[40px] w-[60px] cursor-pointer"></div>
          </div>
          <div
            className="containerNotify__header-content w-7/12 font-semibold-mon flex text-center justify-center
           leading-5 text-white text-[16px] mt-1"
          >
            {TITLE}
          </div>
          {filter ? (
            <img
              src={filter}
              className="ml-auto mt-0 w-9 h-9"
              onClick={handleFilter}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
