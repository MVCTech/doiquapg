import Logo from "../../assets/fontawesome/image/logo_mvc.png";

export default function Footer() {
  const handleLink = () => {
    window.open("https://mvc.com.vn/", "_blank", "noopener");
  };
  return (
    <div
      className="hover:cursor-pointer w-full h-3 fixed bottom-0 left-1/2 -translate-x-1/2 flex justify-center items-center font-normal text-[10px] text-[#333333] bg-[#f5f9ff]"
      onClick={handleLink}
    >
      <img src={Logo} className="form__footer-logo" />
      <span className="form__space text-[7px] mt-2">|</span>
      <div className="font-regular-mon -mt-[2px]">
        Developed by <span className="font-semibold-mon">MVC Company.</span>
      </div>
    </div>
  );
}
