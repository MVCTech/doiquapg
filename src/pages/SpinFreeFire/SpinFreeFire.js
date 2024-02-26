import BG_TOP from "../../assets/fontawesome/image/bgtop-spin-freefire.png";
import BG_BOTTOM from "../../assets/fontawesome/image/bgbottom-spin-freefire.png";
import PIECE from "../../assets/fontawesome/image/piece.png";
import PIECE_V1 from "../../assets/fontawesome/image/piece-light.png";
import PIECE_YELLOW from "../../assets/fontawesome/image/piece-yellow.png";
import BG_PIECE from "../../assets/fontawesome/image/bg-piece.png";
import BG_PIECE_YELLOW from "../../assets/fontawesome/image/bg-piece-yellow.png";
import BG_BUTTON_ROTATION from "../../assets/fontawesome/image/bg-button-rotation.png";
import START from "../../assets/fontawesome/image/start.png";
import IPHONE_15 from "../../assets/fontawesome/image/iphone15.png";
import TITLE from "../../assets/fontawesome/image/title_bg_spinfreefire.png";
import "./SpinFreeFire.css";
import { useEffect, useState } from "react";
import { luckyDrawService } from "../../services/apiService/LuckyDraw";
import { useNavigate, useParams } from "react-router-dom";
import {
  WHEEL_HAS_LUOTQUAY,
  WHEEL_LUOTQUAY,
  WHEEL_PHANTHUONG,
} from "../../utils/KeyConstant";
import { toast } from "react-toastify";

export default function SpinFreeFire() {
  const navigation = useNavigate();
  const [count, setCount] = useState(-1);
  const [isLasted, setIsLasted] = useState(false);
  const [countRound, setCountRound] = useState(0);
  const [start, setStart] = useState(false);
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
  const [render, setRender] = useState(false);
  const [indexGift, setIndexGift] = useState(0);
  const [giftNo, setGiftNo] = useState(0);
  useEffect(() => {
    if (start) {
      const timer = setTimeout(() => {
        if (count < 8 && !isLasted) {
          if (count === 7) {
            setCountRound((prevCount) => prevCount + 1);
            setCount(0);
            if (countRound === 4) {
              setIsLasted(true);
            }
          } else {
            setCount((prevCount) => prevCount + 1);
          }
        } else if (isLasted) {
          if (count < indexGift) {
            setCount((prevCount) => prevCount + 1);
          }
          if (count === 7) {
            return () => clearTimeout(timer);
          }
          setTimeout(() => {
            navigation(`/receive-code/${id}`);
          }, 2000);
        }
      }, 125);
    }
  }, [count, isLasted, countRound, start]);

  function isEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
  const handleStartRotate = () => {
    const positions = [];

    const data = JSON.parse(localStorage.getItem(WHEEL_PHANTHUONG));
    console.log(data);
    for (let i = 0; i < segments.length; i++) {
      if (isEqual(segments[i]?.gift_code, data?.gift_code)) {
        positions.push(i);
      }
    }
    console.log(positions);
    // setStart(true);
    if (positions.length !== 0) {
      setIndexGift(positions[0]);
      console.log(positions[0]);
      setStart(true);
      countDraw();
    } else {
      toast.warn("List win không nằm trong vòng quay");
    }
  };

  const countDraw = async () => {
    luckyDrawService
      .postCountDraw(id)
      .then((response) => {
        console.log(response);

        setGiftNo(response.gift_no - response.count_draw);
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
      .catch((err) => {
        console.log(err);
        toast.error(err);
        setIsSpinning(false);
        navigate(`/list-rotation`);
      });
  };

  const interleave = ([x, ...xs], ys) => (x ? [x, ...interleave(ys, xs)] : ys);

  useEffect(() => {
    console.log(id);
    luckyDrawService
      .postDrawLuckyGift(id)
      .then((dataResponse) => {
        console.log(dataResponse);
        // setGiftNo(dataResponse.gift_no);
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
          }
          setsegments(segmentsTemp);
          setGiftNo(gift_no - count_draw);
          console.log(gift_no);
          console.log(count_draw);
          if (gift_no - count_draw === 0) {
            navigate("/list-rotation");
          }
          localStorage.setItem(WHEEL_LUOTQUAY, "" + (gift_no - count_draw));
          console.log(segmentsTemp);
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
  }, []);

  return (
    <div className="relative top-0">
      <div className="relative top-0">
        <img src={BG_TOP} className="relative top-0" />
        <div className="absolute top-[5%] w-full">
          <img
            src={TITLE}
            className="relative top-0 left-1/2 -translate-x-1/2"
          />
        </div>
        <div className="absolute bottom-0 w-full">
          <div className="relative flex justify-center w-full">
            <div className="absolute z-40 bottom-0 translate-y-1/2">
              <button onClick={handleStartRotate}>
                <img src={START} />
              </button>
            </div>
            <div className="relative top-0">
              <div className="relative z-30 top-[6%] scale-spin">
                <div className="relative z-30">
                  <img src={count === 0 ? PIECE_YELLOW : PIECE} className="" />
                  <div className="absolute -top-8 z-40 w-[90px] left-1/2 -translate-x-1/2">
                    <div className="relative">
                      <img
                        src={count === 0 ? BG_PIECE_YELLOW : BG_PIECE}
                        className=""
                      />
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white">
                        {" "}
                        <img
                          src={segments[0]?.gift_image}
                          className="rotate-giftsize"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 rotate-spin-1">
                  <img
                    src={count === 1 ? PIECE_YELLOW : PIECE_V1}
                    className=""
                  />
                  <div className="absolute -top-8 z-40 w-[90px] left-1/2 -translate-x-1/2">
                    <div className="relative">
                      <img src={count === 1 ? BG_PIECE_YELLOW : BG_PIECE} />
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white">
                        {" "}
                        <img
                          src={segments[1]?.gift_image}
                          className="rotate-giftsize rotate-gift-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 rotate-spin-2">
                  <img src={count === 2 ? PIECE_YELLOW : PIECE} className="" />
                  <div className="absolute -top-8 z-40 w-[90px] left-1/2 -translate-x-1/2">
                    <div className="relative">
                      <img src={count === 2 ? BG_PIECE_YELLOW : BG_PIECE} />
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white">
                        {" "}
                        <img
                          src={segments[2]?.gift_image}
                          className="rotate-giftsize rotate-gift-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 rotate-spin-3">
                  <img
                    src={count === 3 ? PIECE_YELLOW : PIECE_V1}
                    className=""
                  />
                  <div className="absolute -top-8 z-40 w-[90px] left-1/2 -translate-x-1/2">
                    <div className="relative">
                      <img src={count === 3 ? BG_PIECE_YELLOW : BG_PIECE} />
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white">
                        {" "}
                        <img
                          src={segments[3]?.gift_image}
                          className="rotate-giftsize rotate-gift-3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 rotate-spin-4">
                  <img src={count === 4 ? PIECE_YELLOW : PIECE} className="" />
                  <div className="absolute -top-8 z-40 w-[90px] left-1/2 -translate-x-1/2">
                    <div className="relative">
                      <img src={count === 4 ? BG_PIECE_YELLOW : BG_PIECE} />
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white">
                        {" "}
                        <img
                          src={segments[4]?.gift_image}
                          className="rotate-giftsize rotate-gift-4"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 rotate-spin-5">
                  <img
                    src={count === 5 ? PIECE_YELLOW : PIECE_V1}
                    className=""
                  />
                  <div className="absolute -top-8 z-40 w-[90px] left-1/2 -translate-x-1/2">
                    <div className="relative">
                      <img src={count === 5 ? BG_PIECE_YELLOW : BG_PIECE} />
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white">
                        {" "}
                        <img
                          src={segments[5]?.gift_image}
                          className="rotate-giftsize rotate-gift-5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 rotate-spin-6">
                  <img src={count === 6 ? PIECE_YELLOW : PIECE} className="" />
                  <div className="absolute -top-8 z-40 w-[90px] left-1/2 -translate-x-1/2">
                    <div className="relative">
                      <img src={count === 6 ? BG_PIECE_YELLOW : BG_PIECE} />
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white">
                        {" "}
                        <img
                          src={segments[6]?.gift_image}
                          className="rotate-giftsize rotate-gift-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 rotate-spin-7">
                  <img
                    src={count === 7 ? PIECE_YELLOW : PIECE_V1}
                    className=""
                  />
                  <div className="absolute -top-8 z-40 w-[90px] left-1/2 -translate-x-1/2">
                    <div className="relative">
                      <img src={count === 7 ? BG_PIECE_YELLOW : BG_PIECE} />
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white">
                        {" "}
                        <img
                          src={segments[7]?.gift_image}
                          className="rotate-giftsize rotate-gift-7"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative -top-1 w-full">
        <img src={BG_BOTTOM} />
        <div className="absolute top-[40%] z-50 left-1/2 -translate-x-1/2 w-full">
          <button className="relative w-full">
            <img
              src={BG_BUTTON_ROTATION}
              className="absolute left-1/2 -translate-x-1/2"
            />
            <div className="absolute left-1/2 -translate-x-1/2 top-3 text-white text-[22px] font-bold-mon w-full">
              BẠN CÓ{" "}
              <span className="text-[28px] text-yellow-300">
                {giftNo > 9 ? giftNo : "0" + giftNo}
              </span>{" "}
              LƯỢT QUAY
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
