import { useState, useEffect } from "react";
import { Wallet } from "ethers";
import { HDNode } from "@ethersproject/hdnode";
import { useDispatch, useSelector } from "react-redux";
import { addWallet } from "../redux/slices/eth";
import axios from "axios";
import BalanceModal from "./BalanceModal"; // Import the BalanceModal component

const EthWallets = ({ seed }) => {
  const [accountIndex, setAccountIndex] = useState(0);
  const [keys, setKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [balance, setBalance] = useState("");
  const dispatch = useDispatch();
  const ethWallets = useSelector((store) => store.ethWallets);

  useEffect(() => {
    if (ethWallets.length > 0) {
      setKeys(ethWallets);
    }
  }, [ethWallets]);

  const handleCreateWallet = () => {
    const hdNode = HDNode.fromSeed(seed);
    const path = `m/44'/60'/${accountIndex}'/0/0`;
    const childNode = hdNode.derivePath(path);

    const newPrivateKey = childNode.privateKey;
    const wallet = new Wallet(newPrivateKey);
    const newPublicKey = wallet.address;
    const keyObj = { public: newPublicKey, private: newPrivateKey };

    dispatch(addWallet(keyObj));
    setKeys((prevKeys) => [...prevKeys, keyObj]);
    setAccountIndex((prev) => prev + 1);
  };

  const handleClick = async (publicKey) => {
    try {
      const apiUrl = import.meta.env.VITE_ETH_ALCHEMY;
      console.log("API URL:", apiUrl); // Debugging line to ensure URL is correct
      const response = await axios.post(
        apiUrl,
        {
          jsonrpc: "2.0",
          id: 1,
          method: "eth_getBalance",
          params: [publicKey, "latest"],
        }
      );
      setBalance(response.data.result);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
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
          onClick={() => handleClick(key.public)}
        >
          <p><strong>Public key: </strong>{key.public}</p>
          <p><strong>Private key: </strong>{key.private}</p>
        </div>
      ))}
      {keys.length > 0 && <p className="text-center mt-4">Click on the wallet to check balance</p>}
      <BalanceModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        balance={balance}
      />
    </div>
  );
};

export default EthWallets;
