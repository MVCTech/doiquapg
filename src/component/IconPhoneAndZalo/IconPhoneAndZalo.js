import IconZalo from "../../assets/fontawesome/image/logo_zalo.png";
import Phone from "../../assets/fontawesome/image/phone.png";
export default function IconPhoneAndZalo() {
  let contact = localStorage.getItem("CONTACT");
  console.log(contact)

  const handleClickZalo = (e) => {
    console.log(contact)
  };

  return (
    <div className="fixed bottom-32 right-0 z-50 w-[62px] h-[120px] flex flex-wrap justify-center max-[376px]:bottom-[80px]">
      <a href={`tel:02836222399`} className="h-10">
        <img src={Phone} className="w-[52px]"/>
      </a>
      <a href={`https://zalo.me/3442793812218426302`} target="_blank" className="h-10">
      <img
        src={IconZalo}
        className="text-center w-12 h-12 mt-3 z-40 cursor-pointer"
        onClick={(e) => handleClickZalo(e)}
      />
      </a>
    </div>
  );
}
