import { useEffect, useState } from "react";
import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { Buffer } from "buffer";
import axios from "axios";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { addWallet } from "../redux/slices/sol";
import BalanceModal from "./BalanceModal";


const SolWallets = ({ seed }) => {
  const [accountIndex, setAccountIndex] = useState(0);
  const [keys, setKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [balance, setBalance] = useState("");
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

  const handleClick = async (publicKey) => {
    const apiUrl = import.meta.env.VITE_SOL_ALCHEMY;
    try {
      const response = await axios.post(
        apiUrl,
        {
          "jsonrpc": "2.0",
          "id": 1,
          "method": "getBalance",
          "params": [publicKey]
        }
      );
      console.log(response);
      setBalance(response.data.result.value);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  return (
    <div className="mb-12 p-4 h-[30rem] md:w-[45rem] sm:w-[95%] bg-neutral-950 rounded-md shadow-lg flex flex-col items-center overflow-auto custom-scrollbar">
      <button
        className="text-neutral-800 bg-neutral-400 hover:bg-neutral-100 w-32 h-12 mt-4 rounded-xl min-h-12"
        onClick={handleCreateWallet}
      >
        Create Wallet
      </button>
      {keys.map((key, index) => (
        <div
          className="mt-4 bg-neutral-900 h-20 md:w-[42rem] sm:w-[95%] min-h-20 flex flex-col justify-center items-center hover:bg-neutral-800 rounded-lg cursor-pointer"
          key={index + 1}
          onClick={() => handleClick(key.public)}
        >
          <div className="w-full px-2 flex justify-center">
            <p className="truncate text-center"><strong>Public key: </strong>{key.public}</p>
          </div>
          <div className="w-full px-2 flex justify-center">
            <p className="truncate text-center"><strong>Private key: </strong>{key.private}</p>
          </div>
        </div>
      ))}
      {keys.length > 0 && <p className="text-center mt-4">Click on the wallet to check balance</p>}
      <BalanceModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        balance={balance}
        type={"sol"}
      />
    </div>
  );
};

export default SolWallets;
