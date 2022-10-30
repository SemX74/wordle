import axios from "axios";
import { useEffect, useState } from "react";
import { handleAccept, handleBack, handleUseKey } from "./Redux/KeySlice";
import { useAppDispatch, useAppSelector } from "./Redux/useRedux";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [dayWord, setDayWord] = useState("");

  const {
    cells,
    activeCells,
    isGameEnded,
    isWon,
    enteredKeys,
    activeRow,
    keys,
    letterPositon,
  } = useAppSelector((state) => state.key);
  const dispatch = useAppDispatch();
  useEffect(() => {
    axios
      .get("https://thatwordleapi.azurewebsites.net/get/")
      .then((response) => {
        console.log(response.data.Response);
        setDayWord(response.data.Response);
      });
  }, []);

  const onUseKey = (givenKey: string) => {
    dispatch(handleUseKey(givenKey));
  };

  const onBack = () => {
    dispatch(handleBack());
  };

  const onAccept = () => {
    dispatch(handleAccept(dayWord));
  };

  return (
    <div className="bg-primary h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-white mb-[50px] text-[50px]">WORDLE!</h1>
      <p className="text-white">
        Right words are <span className="text-green-700">green</span>
        <br />
        Right words in wrong position are{" "}
        <span className="text-yellow-600">yellow</span>
      </p>
      <div className="grid grid-cols-5 grid-rows-5">
        {cells.map((el, index) =>
          index === activeRow
            ? activeCells.map((el) => (
                <div
                  className={`${el.isRight && " bg-green-700 "} 
              ${el.isWrongPlace && " bg-yellow-600"}
           ${!el.isRight && !el.isWrongPlace && " bg-slate-600 "} ${
                    !el && "bg-transparent"
                  } w-[100px] h-[100px] rounded flex justify-center items-center text-[50px] text-white uppercase border-4 m-1 border-solid border-secondary`}
                >
                  {el.key}
                </div>
              ))
            : el.map((el) => (
                <div
                  className={`${el.isRight && " bg-green-700 "} 
                ${el.isWrongPlace && " bg-yellow-600"}
             ${!el.isRight && !el.isWrongPlace && " bg-slate-600 "} ${
                    !el && "bg-transparent"
                  } w-[100px] h-[100px] rounded flex justify-center items-center text-[50px] text-white uppercase border-4 m-1 border-solid border-secondary`}
                >
                  {el.key}
                </div>
              ))
        )}
      </div>
      {isGameEnded && isWon && (
        <h1 className="text-white text-[50px]">You win!</h1>
      )}
      {isGameEnded && !isWon && (
        <h1 className="text-white text-[50px]">
          You Loose :( day word is{" "}
          <span className="text-accent">{dayWord}</span>
        </h1>
      )}
      <div className="flex flex-row flex-wrap w-1/3 mx-auto justify-center items-center mt-6 ">
        {keys.map((el) => (
          <button
            onClick={() => onUseKey(el.key)}
            disabled={el.isUsed}
            className={`${el.isRight && " bg-green-700 "} 
            ${el.isWrongPlace && " bg-yellow-600"}
         ${
           !el.isRight && !el.isWrongPlace && " bg-accent "
         } "cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 w-[50px] h-[50px] m-1 flex items-center justify-center text-lg uppercase  text-black rounded"`}
          >
            {el.key}
          </button>
        ))}
        <button
          onClick={() => onBack()}
          className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50  w-[50px] h-[50px] m-1 flex items-center justify-center text-lg uppercase bg-accent text-black rounded"
        >
          back
        </button>
        <button
          disabled={enteredKeys < 5}
          onClick={() => onAccept()}
          className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50  w-[50px] h-[50px] m-1 flex items-center justify-center text-lg uppercase bg-accent text-black rounded"
        >
          enter
        </button>
      </div>
    </div>
  );
};

export default App;
