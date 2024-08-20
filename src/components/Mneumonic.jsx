import { useState } from "react";
import EthWallets from "./EthWallets";
import SolWallets from "./SolWallets";

const Mneumonic = ({ separateMnemonic, seed }) => {
  const [activeChain, setActiveChain] = useState("eth");

  return (
    <>
      <div className="mt-8 md:h-[23rem] md:w-[50%] sm:h-[20rem] sm:w-[100%] border-neutral-500 bg-black rounded-md shadow-lg flex flex-wrap flex-col justify-evenly blur-md hover:blur-0 transition-all duration-500">
        <div className="w-full h-[23%] flex flex-wrap justify-evenly">
          {separateMnemonic.slice(0, 3).map((word, index) => (
            <div
              key={index+1}
              className="h-full w-[32%] bg-neutral-900 flex justify-center items-center rounded-md hover:bg-neutral-800 cursor-pointer transition-colors duration-500"
            >
              {word}
            </div>
          ))}
        </div>
        <div className="w-full h-[23%] flex flex-wrap justify-evenly">
          {separateMnemonic.slice(3, 6).map((word, index) => (
            <div
              key={index}
              className="h-full w-[32%] bg-neutral-900 flex justify-center items-center rounded-md hover:bg-neutral-800 cursor-pointer transition-colors duration-500"
            >
              {word}
            </div>
          ))}
        </div>
        <div className="w-full h-[23%] flex flex-wrap justify-evenly">
          {separateMnemonic.slice(6, 9).map((word, index) => (
            <div
              key={index}
              className="h-full w-[32%] bg-neutral-900 flex justify-center items-center rounded-md hover:bg-neutral-800 cursor-pointer transition-colors duration-500"
            >
              {word}
            </div>
          ))}
        </div>
        <div className="w-full h-[23%] flex flex-wrap justify-evenly">
          {separateMnemonic.slice(9, 12).map((word, index) => (
            <div
              key={index}
              className="h-full w-[32%] bg-neutral-900 flex justify-center items-center rounded-md hover:bg-neutral-800 cursor-pointer transition-colors duration-500"
            >
              {word}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 md:h-12 md:text-base sm:w-[70%] sm:text-xs md:w-80 text-center p-3 bg-red-500 text-stone-50 rounded-md">
        Make sure to save this mnemonic
      </div>
      <div className="mt-8 h-12 w-80 flex flex-wrap justify-between bg-neutral-800 rounded-t-md">
        <button
          className={`w-[49%] rounded-t-md transition-colors duration-500 ${
            activeChain === "eth" ? "bg-neutral-900" : "bg-neutral-800"
          }`}
          value="eth"
          onClick={(e) => setActiveChain(e.target.value)}
        >
          Eth
        </button>
        <button
          className={`w-[49%] rounded-t-md transition-colors duration-500 ${
            activeChain === "sol" ? "bg-neutral-900" : "bg-neutral-800"
          }`}
          value="sol"
          onClick={(e) => setActiveChain(e.target.value)}
        >
          Sol
        </button>
      </div>
      {activeChain === "eth" && <EthWallets seed={seed} />}
      {activeChain === "sol" && <SolWallets seed={seed} />}
    </>
  );
};

export default Mneumonic;
