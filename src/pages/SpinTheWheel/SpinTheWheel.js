import React, { useEffect, useState } from "react";
import IconPhoneAndZalo from "../../component/IconPhoneAndZalo/IconPhoneAndZalo";
import wheel_text from "../../assets/fontawesome/image/wheel-text.png";
import spin_img from "../../assets/fontawesome/image/rotaryNeedle2.png";
import { useNavigate, useParams } from "react-router";
import { luckyDrawService } from "../../services/apiService/LuckyDraw";
import { toast } from "react-toastify";
import "./SpinTheWheel.css";
import "./wheel.css";
import ContentGiftPrize from "../../component/ConfirmPopupTnC/ContentGiftPrize";
import MainPopup from "../../component/ConfirmPopupTnC/MainPopup";
import BG_WHEEL from "../../assets/fontawesome/image/wheel-bg.png";
import {
  WHEEL_HAS_LUOTQUAY,
  WHEEL_PHANTHUONG,
  WHEEL_LUOTQUAY,
} from "../../utils/KeyConstant";

export default function SpinTheWheel() {
  // const [segments, setSegments] = useState([]);
  const [hasWheel, sethasWheel] = useState("TRUE");
  const [luotPhanThuong, setluotPhanThuong] = useState();
  const [win, setwin] = useState(0);
  const [segments, setsegments] = useState([]);
  const [luotQuay, setluotQuay] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [soqua, setsoqua] = useState(8);

  const [isDisable, setIsDisable] = useState(false);
  const [isAnnounce, setIsAnnounce] = useState(false);
  let navigate = useNavigate();
  const { id } = useParams();
  const [transformBox, settransformBox] = useState("");

  // const getRandomInt = (min, max) => {
  //   let byteArray = new Uint8Array(1);
  //   window.crypto.getRandomValues(byteArray);
  //   // Convert to decimal
  //   let randomNum = "0." + byteArray[0].toString();

  //   // Get number in range
  //   randomNum = Math.floor(randomNum * (max - min)) + min;

  //   return randomNum;
  // };

  // const shuffleGiftList = (array) => {
  //   let byteArray = new Uint8Array(1);
  //   window.crypto.getRandomValues(byteArray);

  //   // Convert to decimal
  //   let randomNum = "0." + byteArray[0].toString();
  //   let currentIndex = array.length,
  //     randomIndex;

  //   // While there remain elements to shuffle.
  //   while (currentIndex != 0) {
  //     // Pick a remaining element.
  //     randomIndex = Math.floor(randomNum * currentIndex);
  //     currentIndex--;

  //     // And swap it with the current element.
  //     [array[currentIndex], array[randomIndex]] = [
  //       array[randomIndex],
  //       array[currentIndex],
  //     ];
  //   }

  //   return array;
  // };

  // const createNewGiftArrayForWheel = (severGiftList) => {
  //   let newGiftList = [];

  //   if (severGiftList.length > 8) {
  //     severGiftList = severGiftList.slice(0, 8);
  //   }
  //   let notBigGiftList = severGiftList.filter((gift) => {
  //     return gift.gift_code !== "bighalfgift_vangpnj";
  //   });
  //   let bigGiftList = severGiftList.filter((gift) => {
  //     return gift.gift_code === "bighalfgift_vangpnj";
  //   });
  //   if (severGiftList.length < 8) {
  //     let lackLenght = 8 - severGiftList.length;
  //     while (lackLenght > 0) {
  //       notBigGiftList = [
  //         ...notBigGiftList,
  //         notBigGiftList[getRandomInt(0, notBigGiftList.length)],
  //       ];

  //       lackLenght--;
  //     }
  //   }

  //   newGiftList = [...shuffleGiftList([...bigGiftList, ...notBigGiftList])];

  //   setNewGiftList(newGiftList);

  //   return newGiftList;
  // };
  // const getDataGift = (severGiftList) => {
  //   let list_prizes = createNewGiftArrayForWheel(severGiftList);
  //   list_prizes = list_prizes.map(function (item, index) {
  //     return {
  //       id: index + 1,
  //       text: item.gift,
  //       img: item.gift_image,
  //     };
  //   });
  //   setSegments(list_prizes);
  // };
  const [render, setRender] = useState(false);
  useEffect(() => {
    console.log(id);
    luckyDrawService
      .postDrawLuckyGift(id)
      .then((dataResponse) => {
        console.log(dataResponse);
        // setSpinRemain(res.gift_no - res.count_draw);
        // getDataGift(res.list_prizes);
        // setSeverGiftList(res.list_prizes);
        // setGiftListWin(res.list_win);
        // let spinRemain = res.gift_no - res.count_draw;
        // if (spinRemain <= 0) {
        //   setTimeout(() => {
        //     navigate(`/list-rotation`);
        //   }, 3000);
        // }
        if (dataResponse.list_prizes !== undefined) {
          sethasWheel("TRUE");
          let list_prizes = dataResponse.list_prizes;
          let segmentsTemp = [];
          let segmentsBigHalfGiftTemp = [];
          let segmentsNormalGiftTemp = [];
          let gift_no = dataResponse.gift_no;
          let count_draw = dataResponse.count_draw;
          let winStateTemp = 0;
          if (gift_no > count_draw) {
            let gift_code_win = dataResponse.list_win[count_draw]?.gift_code;
            setluotPhanThuong(dataResponse.list_win[count_draw]);
            localStorage.setItem(
              WHEEL_PHANTHUONG,
              JSON.stringify(dataResponse.list_win[count_draw])
            );
            if (
              list_prizes !== undefined &&
              list_prizes !== null &&
              list_prizes.length > 0
            ) {
              for (let i = 0; i < list_prizes.length; i++) {
                let a = list_prizes[i].gift;
                var check = false;

                let itemTemp = {
                  gift_code: list_prizes[i].gift_code,
                  image: list_prizes[i].gift_image,
                  text: a,
                  check: check,
                  gift_image: list_prizes[i].gift_image,
                };
                console.log(
                  itemTemp,
                  !list_prizes[i].gift_code.includes("biggift")
                );
                if (!list_prizes[i].gift_code.includes("biggift")) {
                  if (!list_prizes[i].gift_code.includes("bighalfgift")) {
                    segmentsNormalGiftTemp.push(itemTemp);
                  } else {
                    segmentsBigHalfGiftTemp.push(itemTemp);
                  }
                }
                segmentsTemp.push(itemTemp);
              }
              console.log(segmentsTemp);
              let a = 0;
              var segmentsTempList = segmentsTemp.concat(
                segmentsBigHalfGiftTemp
              );
              console.log(segmentsNormalGiftTemp);
              console.log(segmentsBigHalfGiftTemp);

              if (segmentsTempList.length < soqua) {
                a = 8 - segmentsTempList.length;
                var array = [];
                for (let i = 0; i < a; i++) {
                  array.push(
                    segmentsNormalGiftTemp[
                      Math.floor(Math.random() * segmentsNormalGiftTemp.length)
                    ]
                  );
                }
                console.log(array);
                console.log(segmentsTempList);
                let array_segment = [segmentsTempList, array];
                console.log(array_segment);
                segmentsTemp = interleave(segmentsTempList, array);
                console.log(segmentsTemp);
              }
              for (let a = 0; a < segmentsTemp.length; a++) {
                if (segmentsTemp[a].gift_code === gift_code_win) {
                  check = true;
                  winStateTemp = a + 1;
                }
                segmentsTemp[a] = { ...segmentsTemp[a], id: a + 1 };
              }
              setwin(winStateTemp);
            }
          } else {
            sethasWheel("FALSE");
            // setmessage(response.data.result.meta.message);
          }
          setsegments(segmentsTemp);
          setluotQuay(gift_no - count_draw);
          console.log(gift_no);
          console.log(count_draw);
          if (gift_no - count_draw === 0) {
            navigate("/list-rotation");
          }
          localStorage.setItem(WHEEL_LUOTQUAY, "" + (gift_no - count_draw));
        }
      })
      .catch((err) => {
        console.log(err);
        setIsDisable(true);
        toast.error(err);
        setTimeout(() => {
          navigate(`/list-rotation`);
        }, 3000);
      });
  }, [render]);
  const interleave = ([x, ...xs], ys) => (x ? [x, ...interleave(ys, xs)] : ys);

  const runWheel = () => {
    setIsSpinning(true);
    var array_toado = [
      { id: 1, toado: 0 },
      { id: 2, toado: -45 },
      { id: 3, toado: -90 },
      { id: 4, toado: -135 },
      { id: 5, toado: -180 },
      { id: 6, toado: -225 },
      { id: 7, toado: -270 },
      { id: 8, toado: -315 },
    ];
    if (win !== 0) {
      console.log(win);
      var item = array_toado?.find((i) => i.id === win);
      let toado = item?.toado;
      console.log(toado);
      settransformBox("rotate(" + (toado + 360 * 6) + "deg)");
      //settransformBox("rotate(" + 45 * 360 * 6 + "deg)");
      var element = document.getElementById("mainbox");

      setTimeout(function () {
        countDraw();
      }, 3000);
      // chờ thời gian set lại phần thưởng
      setTimeout(function () {
        element.classList.remove("animate");
        // setisredirectToWheelResult(true);
        setIsSpinning(false);
        redirectToWheelResult(); // set qua lun phần thưởng ko dừng
      }, 6000); //3000 = 3 second
    }
  };
  const redirectToWheelResult = () => {
    setIsAnnounce(!isAnnounce);

    // navigate("/" + appCode + "/wheelresult/" + pgCode);
    console.log("hello");
  };
  const countDraw = async () => {
    luckyDrawService
      .postCountDraw(id)
      .then((response) => {
        console.log(response);

        // if (response.data !== undefined) {
        // setcount_draw(json.result.data.count_draw);
        // setgift_no(json.result.data.gift_no);
        setluotQuay(response.gift_no - response.count_draw);
        localStorage.setItem(
          WHEEL_LUOTQUAY,
          "" + (response.gift_no - response.count_draw)
        );
        if (response.gift_no - response.count_draw >= 1) {
          localStorage.setItem(WHEEL_HAS_LUOTQUAY, "TRUE");
        } else {
          localStorage.setItem(WHEEL_HAS_LUOTQUAY, "FAlSE");
        }
        // }
      })
      .catch(() => {
        setIsSpinning(false);
      });
  };
  // const runWheel = () => {
  //   setIsDisable(true);
  //   luckyDrawService
  //     .postCountDraw(id)
  //     .then((res) => {
  //       console.log(res);
  //       let spinRemain = res.gift_no - res.count_draw;
  //       setSpinRemain(spinRemain);
  //       let array_angle = [
  //         { id: 1, angle: 0 },
  //         { id: 2, angle: -42 },
  //         { id: 3, angle: -86 },
  //         { id: 4, angle: -132 },
  //         { id: 5, angle: -177 },
  //         { id: 6, angle: -222 },
  //         { id: 7, angle: -267 },
  //         { id: 8, angle: -312 },
  //       ];

  //       let indexWinnigGift = giftListWin.findIndex((item) => {
  //         return res.count_draw === item.index;
  //       });
  //       let indexNewGiftList = newGiftList.findIndex((item) => {
  //         return giftListWin[indexWinnigGift].gift_code === item.gift_code;
  //       });
  //       let winningItem = {
  //         ...newGiftList[indexNewGiftList],
  //         spinRemain: spinRemain,
  //         so_id: id,
  //       };
  //       localStorage.setItem("WINNING_GIFT", JSON.stringify(winningItem));
  //       let angle = array_angle[indexNewGiftList]?.angle;
  //       setTrans("rotate(" + (angle + 360 * 6) + "deg)");
  //       setTimeout(() => {
  //         handleChangeAnnounceStatus();
  //       }, 6500);
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       toast.warn(err);
  //       setTimeout(() => {
  //         navigate(`/list-rotation`);
  //       }, 3000);
  //       setIsDisable(false);
  //     });
  // };
  const handleChangeAnnounceStatus = () => {
    setIsAnnounce(!isAnnounce);
    setRender(!render);
    settransformBox("rotate(" + 0 + "deg)");
  };
  const handleEnableBtn = () => {
    setIsDisable(!isDisable);

    // getDataGift(severGiftList);
  };
  useEffect(() => {
    console.log(isAnnounce);
  }, []);
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
                      style={{ transform: `${transformBox}` }}
                    >
                      <div className="box1 font-regular-mon">
                        <span className="segment span1 color-1">
                          <i id="id_7" className="item7 segments">
                            <h6>{segments[6]?.text}</h6>
                            <img
                              src={segments[6]?.gift_image}
                              alt={segments[6]?.text}
                            />
                          </i>
                        </span>
                        <span className="segment span2 color-1">
                          <i id="id_3" className="item3 segments">
                            <h6>{segments[2]?.text}</h6>
                            <img
                              src={segments[2]?.gift_image}
                              alt={segments[2]?.text}
                            />
                          </i>
                        </span>
                        <span className="segment span3 color-1">
                          <i id="id_5" className="item5 segments">
                            <h6>{segments[4]?.text}</h6>
                            <img
                              src={segments[4]?.gift_image}
                              alt={segments[4]?.text}
                            />
                          </i>
                        </span>
                        <span className="segment span4 color-1">
                          <i id="id_1" className="item1 segments">
                            <h6>{segments[0]?.text}</h6>
                            <img
                              src={segments[0]?.gift_image}
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
                              src={segments[3]?.gift_image}
                              alt={segments[3]?.text}
                            />
                          </i>
                        </span>
                        <span className="segment span2 color-2">
                          <i id="id_8" className="item8 segments">
                            <h6>{segments[7]?.text}</h6>
                            <img
                              src={segments[7]?.gift_image}
                              alt={segments[7]?.text}
                            />
                          </i>
                        </span>
                        <span className="segment span3 color-2">
                          <i id="id_2" className="item2 segments">
                            <h6>{segments[1]?.text}</h6>
                            <img
                              src={segments[1]?.gift_image}
                              alt={segments[1]?.text}
                            />
                          </i>
                        </span>
                        <span className="segment span4 color-2">
                          <i id="id_6" className="item6 segments">
                            <h6>{segments[5]?.text}</h6>
                            <img
                              src={segments[5]?.gift_image}
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
                      disabled={isSpinning}
                    >
                      <img className="-z-10 w-[380px]" src={spin_img} alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center box-border text-[#333] font-light-mon relative top-16">
              <button
                className=" bg-[#003DA5] text-[#ffffff] 
                px-[20px] py-[20px] rounded-[16px] text-[16px] z-50 font-semibold-mon"
              >
                {luotQuay >= 1
                  ? `Bạn còn ${luotQuay} lượt quay`
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
