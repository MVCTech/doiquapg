import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "../../assets/css/backgroundListNotify.css";
import "../../assets/css/backgroundPhone.css";
import "../../assets/css/font-text.css";

HeaderBackground.propTypes = {
  TITLE: PropTypes.string,
  buttonBack: PropTypes.string,
  edit: PropTypes.string,
};
export default function HeaderBackground({ TITLE, buttonBack, edit }) {
  const navigation = useNavigate();
  const handleBack = () => {
    navigation(buttonBack);
  };

  return (
    <div className="contain">
      <div className="containerNotify w-full min-h-full h-[291px] bg-no-repeat absolute left-0 top-0">
        <div className="containerNotify__header h-[80px] flex items-center p-[0_20px_0_20px]">
          <div
            className="containerNotify__header-btnBack h-[40px] w-[60px] opacity-80 cursor-pointer"
            onClick={handleBack}
          ></div>
          <div className="containerNotify__header-content flex text-center justify-center leading-5 text-white text-[16px] font-semibold-mon">
            {TITLE}
          </div>
          {edit ? <img src={edit} /> : null}
        </div>
      </div>
    </div>
  );
}
