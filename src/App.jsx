import { useState, useEffect } from "react";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { Buffer } from "buffer";
import Mneumonic from "./components/Mneumonic";

// Polyfill Buffer for browser usage
window.Buffer = Buffer;

function App() {
  const [mnemonic, setMnemonic] = useState(false);
  const [separateMnemonic, setSeparateMnemonic] = useState([]);
  const [seed, setSeed] = useState();

  const handleIsMnemonic = () => {
    setMnemonic(true);
    const mnemonic = generateMnemonic();
    const spaceSeparateMnemonic = mnemonic.split(" ");
    setSeparateMnemonic(spaceSeparateMnemonic);
    const seedFromMnemonic = mnemonicToSeedSync(mnemonic);
    console.log("Seed from Mnemonic: ", seedFromMnemonic);
    setSeed(seedFromMnemonic)
    console.log("Seed:", seed);
  };

  useEffect(() => {
    if (seed) {
      console.log("Updated Seed:", seed);
    }
  }, [seed]);

  return (
    <div>
      <div className="fixed top-0 -z-10 h-full w-full">
        <div className="absolute top-0 z-[-10] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>

      <div className="flex flex-wrap flex-col justify-center items-center pb-8">
        <h1 className="text-6xl text-center w-full mt-24">Web based wallet</h1>
        <button className="mt-8 bg-neutral-400 text-neutral-800 px-6 py-3 rounded-2xl transition-all ease-in-out shadow-md font-medium min-w-[200px] hover:bg-neutral-100" onClick={handleIsMnemonic}>Create Mnemonics</button>
        { mnemonic && separateMnemonic && <Mneumonic separateMnemonic={separateMnemonic} seed={seed} /> }
      </div>
    </div>
  );
}

export default App;
