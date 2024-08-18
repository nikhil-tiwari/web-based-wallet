import { useEffect, useState } from "react";
import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { Buffer } from "buffer";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { addWallet } from "../redux/slices/sol";


const SolWallets = ({ seed }) => {
  const [accountIndex, setAccountIndex] = useState(0);
  const [keys, setKeys] = useState([]);
  const dispatch = useDispatch();
  const solWallets = useSelector((store) => store.solWallets);

  useEffect(() => {
    if (solWallets.length > 0) {
      setKeys(solWallets);
    }
  }, [setKeys, solWallets]);

  const handleCreateWallet = () => {
    const path = `m/44'/501'/${accountIndex}'/0'`;
    setAccountIndex((prev) => prev + 1);
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);

    const privateKey = bs58.encode(Buffer.from(secret));
    const publicKey = keypair.publicKey.toBase58();
    const keyObj = { public: publicKey, private: privateKey }

    dispatch(addWallet(keyObj))

    setKeys((prevKeys) => [
      ...prevKeys,
      { public: publicKey, private: privateKey },
    ]);
  };

  return (
    <div className="mb-12 p-4 h-[30rem] w-[45rem] bg-neutral-950 rounded-md shadow-lg flex flex-col items-center overflow-auto custom-scrollbar">
      <button
        className="text-neutral-800 bg-neutral-400 hover:bg-neutral-100 w-32 h-12 mt-4 rounded-xl min-h-12"
        onClick={handleCreateWallet}
      >
        Create Wallet
      </button>
      {keys.map((key, index) => (
        <div
          className="mt-4 bg-neutral-900 h-20 w-[42rem] min-h-20 flex flex-col justify-center items-center hover:bg-neutral-800 rounded-lg cursor-pointer"
          key={index + 1}
        >
          <div className="w-full px-2 flex justify-center">
            <p className="truncate text-center"><strong>Public key: </strong>{key.public}</p>
          </div>
          <div className="w-full px-2 flex justify-center">
            <p className="truncate text-center"><strong>Private key: </strong>{key.private}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SolWallets;
