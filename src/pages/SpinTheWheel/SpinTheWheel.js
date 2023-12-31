import React, { useEffect, useState } from "react";
import IconPhoneAndZalo from "../../component/IconPhoneAndZalo/IconPhoneAndZalo";
import wheel_text from "../../assets/fontawesome/image/wheel-text.png";
import spin_img from "../../assets/fontawesome/image/rotaryNeedle1.png";
import { useNavigate, useParams } from "react-router";
import { luckyDrawService } from "../../services/apiService/LuckyDraw";
import { toast } from "react-toastify";
import "./SpinTheWheel.css";
import "./wheel.css";
import ContentGiftPrize from "../../component/ConfirmPopupTnC/ContentGiftPrize";
import MainPopup from "../../component/ConfirmPopupTnC/MainPopup";
import BG_WHEEL from "../../assets/fontawesome/image/wheel-bg.png";

const style = {
  color: "#130682",
  fontSize: "16px",
  fontHeight: "20px",
  fontWeight: "600",
};
export default function SpinTheWheel() {
  const [segments, setSegments] = useState([]);
  console.log(segments)
  const [spinRemain, setSpinRemain] = useState(0);
  const [newGiftList, setNewGiftList] = useState([]);
  const [giftListWin, setGiftListWin] = useState([]);
  const [trans, setTrans] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const [isAnnounce, setIsAnnounce] = useState(false);
  const [severGiftList, setSeverGiftList] = useState([]);
  const appCode = localStorage.getItem("CAMPAIGN_CODE");
  let navigate = useNavigate();
  const { id } = useParams();

  const getRandomInt = (min, max) => {
    let byteArray = new Uint8Array(1);
    window.crypto.getRandomValues(byteArray);
    // Convert to decimal
    let randomNum = "0." + byteArray[0].toString();

    // Get number in range
    randomNum = Math.floor(randomNum * (max - min)) + min;

    return randomNum;
  };

  const shuffleGiftList = (array) => {
    let byteArray = new Uint8Array(1);
    window.crypto.getRandomValues(byteArray);

    // Convert to decimal
    let randomNum = "0." + byteArray[0].toString();
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(randomNum * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const createNewGiftArrayForWheel = (severGiftList) => {
    let newGiftList = [];

    if (severGiftList.length > 8) {
      severGiftList = severGiftList.slice(0, 8);
    }
    let notBigGiftList = severGiftList.filter((gift) => {
      return gift.gift_code !== "bighalfgift_vangpnj";
    });
    let bigGiftList = severGiftList.filter((gift) => {
      return gift.gift_code === "bighalfgift_vangpnj";
    });
    if (severGiftList.length < 8) {
      let lackLenght = 8 - severGiftList.length;
      while (lackLenght > 0) {
        notBigGiftList = [
          ...notBigGiftList,
          notBigGiftList[getRandomInt(0, notBigGiftList.length)],
        ];

        lackLenght--;
      }
    }

    newGiftList = [...shuffleGiftList([...bigGiftList, ...notBigGiftList])];

    setNewGiftList(newGiftList);

    return newGiftList;
  };
  const getDataGift = (severGiftList) => {
    let list_prizes = createNewGiftArrayForWheel(severGiftList);
    list_prizes = list_prizes.map(function (item, index) {
      return {
        id: index + 1,
        text: item.gift,
        img: item.gift_image,
      };
    });
    setSegments(list_prizes);
  };

  useEffect(() => {
    console.log(id);
    luckyDrawService
      .postDrawLuckyGift(id)
      .then((res) => {
        console.log(res);
        setSpinRemain(res.gift_no - res.count_draw);
        getDataGift(res.list_prizes);
        setSeverGiftList(res.list_prizes);
        setGiftListWin(res.list_win);
        let spinRemain = res.gift_no - res.count_draw;
        if (spinRemain <= 0) {
          setTimeout(() => {
            navigate(`/list-rotation`);
          }, 3000);
        }
      })
      .catch((err) => {
        setIsDisable(true);
        toast.error(err);
        setTimeout(() => {
          navigate(`/list-rotation`);
        }, 3000);
      });
  }, []);
  const runWheel = () => {
    setIsDisable(true);
    luckyDrawService
      .postCountDraw(id)
      .then((res) => {
        console.log(res);
        let spinRemain = res.gift_no - res.count_draw;
        setSpinRemain(spinRemain);
        let array_angle = [
          { id: 1, angle: 0 },
          { id: 2, angle: -42 },
          { id: 3, angle: -86 },
          { id: 4, angle: -132 },
          { id: 5, angle: -177 },
          { id: 6, angle: -222 },
          { id: 7, angle: -267 },
          { id: 8, angle: -312 },
        ];

        let indexWinnigGift = giftListWin.findIndex((item) => {
          return res.count_draw === item.index;
        });
        let indexNewGiftList = newGiftList.findIndex((item) => {
          return giftListWin[indexWinnigGift].gift_code === item.gift_code;
        });
        let winningItem = {
          ...newGiftList[indexNewGiftList],
          spinRemain: spinRemain,
          so_id: id,
        };
        localStorage.setItem("WINNING_GIFT", JSON.stringify(winningItem));
        let angle = array_angle[indexNewGiftList]?.angle;
        setTrans("rotate(" + (angle + 360 * 18) + "deg)");
        setTimeout(() => {
          handleChangeAnnounceStatus();
        }, 3000);
      })
      .catch((err) => {
        console.log(err)
        toast.warn(err);
        setTimeout(() => {
          navigate(`/list-rotation`);
        }, 3000);
        setIsDisable(false);
      });
  };
  const handleChangeAnnounceStatus = () => {
    setIsAnnounce(!isAnnounce);
    setTrans("rotate(" + 0 + "deg)");
  };
  const handleEnableBtn = () => {
    setIsDisable(!isDisable);
    getDataGift(severGiftList);
  };
  return (
    <div>
      <div
        className={`spin-the-wheel contain  overflow-hidden ${
          isAnnounce ? "block" : "block"
        }`}
      >
        <img src={BG_WHEEL} className="relative top-0" />
        <div className="absolute top-0 w-full">
          <div className="wheel ">
            <div id="wheel" className="">
              <div className="wheel-container-vongquay ">
                <div className="flex justify-center wheel-text pt-3">
                  <img className="w-11/12" src={wheel_text} alt="" />
                </div>

                <div id="bg" className="bg">
                  <div id="mainbox" className="mainbox">
                    <div
                      id="box"
                      className={`box nenvongquay ${
                        isAnnounce ? "hidden" : "block"
                      }`}
                      style={{ transform: `${trans}` }}
                    >
                      <div className="box1 font-regular-mon">
                        <span className="segment span1 color-1">
                          <i id="id_7" className="item7 segments">
                            <h6>{segments[6]?.text}</h6>
                            <img
                              src={segments[6]?.img}
                              alt={segments[6]?.text}
                            />
                          </i>
                        </span>
                        <span className="segment span2 color-1">
                          <i id="id_3" className="item3 segments">
                            <h6>{segments[2]?.text}</h6>
                            <img
                              src={segments[2]?.img}
                              alt={segments[2]?.text}
                            />
                          </i>
                        </span>
                        <span className="segment span3 color-1">
                          <i id="id_5" className="item5 segments">
                            <h6>{segments[4]?.text}</h6>
                            <img
                              src={segments[4]?.img}
                              alt={segments[4]?.text}
                            />
                          </i>
                        </span>
                        <span className="segment span4 color-1">
                          <i id="id_1" className="item1 segments">
                            <h6>{segments[0]?.text}</h6>
                            <img
                              src={segments[0]?.img}
                              alt={segments[0]?.text}
                            />
                          </i>
                        </span>
                      </div>
                      <div className="box2 font-regular-mon">
                        <span className="segment span1 color-2">
                          <i id="id_4" className="item4 segments">
                            <h6>{segments[3]?.text}</h6>
                            <img
                              src={segments[3]?.img}
                              alt={segments[3]?.text}
                            />
                          </i>
                        </span>
                        <span className="segment span2 color-2">
                          <i id="id_8" className="item8 segments">
                            <h6>{segments[7]?.text}</h6>
                            <img
                              src={segments[7]?.img}
                              alt={segments[7]?.text}
                            />
                          </i>
                        </span>
                        <span className="segment span3 color-2">
                          <i id="id_2" className="item2 segments">
                            <h6>{segments[1]?.text}</h6>
                            <img
                              src={segments[1]?.img}
                              alt={segments[1]?.text}
                            />
                          </i>
                        </span>
                        <span className="segment span4 color-2">
                          <i id="id_6" className="item6 segments">
                            <h6>{segments[5]?.text}</h6>
                            <img
                              src={segments[5]?.img}
                              alt={segments[5]?.text}
                            />
                          </i>
                        </span>
                      </div>
                    </div>
                    <button
                      id="buttonRun"
                      className="spin z-20 "
                      onClick={() => {
                        runWheel();
                      }}
                      disabled={isDisable ? "disabled" : ""}
                    >
                      {/* w-[320px] */}
                      <img className="-z-10  w-[70px]" src={spin_img} alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center box-border text-[#333] font-light-mon relative top-16">
              <button
                style={style}
                type="button"
                className="pointer-events-none color-button-enable border-0 text-[#333] 
                px-[20px] py-[20px] text-center no-underline inline-block rounded-[16px] text-[16px] cursor-pointer not-italic font-[Montserrat-Light] font-black leading-5 z-50"
              >
                {spinRemain >= 1
                  ? `Bạn còn ${spinRemain} lượt quay`
                  : "Bạn đã hết lượt quay"}
              </button>
            </div>
          </div>
        </div>

        <IconPhoneAndZalo />
      </div>
      <div className={`${isAnnounce ? "block" : "hidden"}`}>
        <MainPopup
          handleChangeAnnounceStatus={handleChangeAnnounceStatus}
          handleEnableBtn={handleEnableBtn}
          flagButton={"gift_prize"}
          flag={true}
        >
          <ContentGiftPrize />
        </MainPopup>
      </div>
    </div>
  );
}
