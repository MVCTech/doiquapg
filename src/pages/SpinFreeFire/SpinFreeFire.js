import BG_TOP from "../../assets/fontawesome/image/bgtop-spin-freefire.png";
import BG_BOTTOM from "../../assets/fontawesome/image/bgbottom-spin-freefire.png";
import PIECE from "../../assets/fontawesome/image/piece.png";
import PIECE_YELLOW from "../../assets/fontawesome/image/piece-yellow.png";
import BG_PIECE from "../../assets/fontawesome/image/bg-piece.png";
import BG_PIECE_YELLOW from "../../assets/fontawesome/image/bg-piece-yellow.png";
import START from "../../assets/fontawesome/image/start.png";
import "./SpinFreeFire.css";
import { useEffect, useState } from "react";

export default function SpinFreeFire() {
  const [count, setCount] = useState(0);
  const [isLasted, setIsLasted] = useState(false);
  const [countRound, setCountRound] = useState(0);

  useEffect(() => {
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
        if (count < 7) {
          setCount((prevCount) => prevCount + 1);
        }
        if (count === 7) {
          return () => clearTimeout(timer);
        }
      }
    }, 80);
  }, [count, isLasted, countRound]);

  return (
    <div className="relative top-0">
      <div className="relative top-0">
        <img src={BG_TOP} className="relative top-0" />
        <div className="absolute bottom-0 w-full">
          <div className="relative flex justify-center w-full">
            <div className="absolute z-40 bottom-0 translate-y-1/2">
              <img src={START} />
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
                        hello
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="absolute top-0 z-20">
                  <img src={PIECE_YELLOW} className="" />
                  <div className="absolute -top-8 z-40 w-[90px] left-1/2 -translate-x-1/2">
                    <div className="relative">
                      <img src={BG_PIECE_YELLOW} className="" />
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white">
                        {" "}
                        hello
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="absolute top-0 rotate-spin-1">
                  <img src={count === 1 ? PIECE_YELLOW : PIECE} className="" />
                  <div className="absolute -top-8 z-40 w-[90px] left-1/2 -translate-x-1/2">
                    <div className="relative">
                      <img src={count === 1 ? BG_PIECE_YELLOW : BG_PIECE} />
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white">
                        {" "}
                        hello
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
                        hello
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 rotate-spin-3">
                  <img src={count === 3 ? PIECE_YELLOW : PIECE} className="" />
                  <div className="absolute -top-8 z-40 w-[90px] left-1/2 -translate-x-1/2">
                    <div className="relative">
                      <img src={count === 3 ? BG_PIECE_YELLOW : BG_PIECE} />
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white">
                        {" "}
                        hello
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
                        hello
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 rotate-spin-5">
                  <img src={count === 5 ? PIECE_YELLOW : PIECE} className="" />
                  <div className="absolute -top-8 z-40 w-[90px] left-1/2 -translate-x-1/2">
                    <div className="relative">
                      <img src={count === 5 ? BG_PIECE_YELLOW : BG_PIECE} />
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white">
                        {" "}
                        hello
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
                        hello
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 rotate-spin-7">
                  <img src={count === 7 ? PIECE_YELLOW : PIECE} className="" />
                  <div className="absolute -top-8 z-40 w-[90px] left-1/2 -translate-x-1/2">
                    <div className="relative">
                      <img src={count === 7 ? BG_PIECE_YELLOW : BG_PIECE} />
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white">
                        {" "}
                        hello
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=""></div>
            </div>
          </div>
        </div>
      </div>
      <img src={BG_BOTTOM} className="relative -top-1" />
    </div>
  );
}
