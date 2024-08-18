import { useState } from "react";
import EthWallets from "./EthWallets";
import SolWallets from "./SolWallets";

const Mneumonic = ({ separateMnemonic, seed }) => {

  const [activeChain, setActiveChain] = useState("eth");

  return (
    <>
        <div className="mt-8 h-[23rem] w-[30rem] border-neutral-500 bg-black rounded-md shadow-lg flex flex-wrap flex-col justify-evenly blur-md hover:blur-0 transition-all duration-500">
            <div className="w-full h-[23%] rounded-md flex flex-wrap justify-evenly">
                <div className="h-full w-[32%] bg-neutral-900 flex justify-center items-center rounded-md hover:bg-neutral-800 cursor-pointer transition-colors duration-500">
                    {separateMnemonic[0]}
                </div>
                <div className="h-full w-[32%] bg-neutral-900 flex justify-center items-center rounded-md hover:bg-neutral-800 cursor-pointer transition-colors duration-500">
                    {separateMnemonic[1]}
                </div>
                <div className="h-full w-[32%] bg-neutral-900 flex justify-center items-center rounded-md hover:bg-neutral-800 cursor-pointer transition-colors duration-500">
                    {separateMnemonic[2]}
                </div>
            </div>
            <div className="w-full h-[23%] flex flex-wrap justify-evenly">
                <div className="h-full w-[32%] bg-neutral-900 flex justify-center items-center rounded-md hover:bg-neutral-800 cursor-pointer transition-colors duration-500">
                    {separateMnemonic[3]}
                </div>
                <div className="h-full w-[32%] bg-neutral-900 flex justify-center items-center rounded-md hover:bg-neutral-800 cursor-pointer transition-colors duration-500">
                    {separateMnemonic[4]}
                </div>
                <div className="h-full w-[32%] bg-neutral-900 flex justify-center items-center rounded-md hover:bg-neutral-800 cursor-pointer transition-colors duration-500">
                    {separateMnemonic[5]}
                </div>
            </div>
            <div className="w-full h-[23%] flex flex-wrap justify-evenly">
                <div className="h-full w-[32%] bg-neutral-900 flex justify-center items-center rounded-md hover:bg-neutral-800 cursor-pointer transition-colors duration-500">
                    {separateMnemonic[6]}
                </div>
                <div className="h-full w-[32%] bg-neutral-900 flex justify-center items-center rounded-md hover:bg-neutral-800 cursor-pointer transition-colors duration-500">
                    {separateMnemonic[7]}
                </div>
                <div className="h-full w-[32%] bg-neutral-900 flex justify-center items-center rounded-md hover:bg-neutral-800 cursor-pointer transition-colors duration-500">
                    {separateMnemonic[8]}
                </div>
            </div>
            <div className="w-full h-[23%] flex flex-wrap justify-evenly">
                <div className="h-full w-[32%] bg-neutral-900 flex justify-center items-center rounded-md hover:bg-neutral-800 cursor-pointer transition-colors duration-500">
                    {separateMnemonic[9]}
                </div>
                <div className="h-full w-[32%] bg-neutral-900 flex justify-center items-center rounded-md hover:bg-neutral-800 cursor-pointer transition-colors duration-500">
                    {separateMnemonic[10]}
                </div>
                <div className="h-full w-[32%] bg-neutral-900 flex justify-center items-center rounded-md hover:bg-neutral-800 cursor-pointer transition-colors duration-500">
                    {separateMnemonic[11]}
                </div>
            </div>
        </div>
        <div className="mt-8 h-12 w-80 text-center p-3 bg-red-500 text-stone-50 rounded-md">
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
        {activeChain === 'eth' && <EthWallets seed={seed} />}
        {activeChain === 'sol' && <SolWallets seed={seed} />}
    </>
  );
};

export default Mneumonic;
