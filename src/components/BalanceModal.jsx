
const BalanceModal = ({ isVisible, onClose, balance, type }) => {
  if (!isVisible) return null;

  const balanceInEther = parseInt(balance) / 1e18; // Convert from Wei to Ether
  const balanceInSol = parseInt(balance) / 1e9;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-neutral-900 p-6 rounded-lg shadow-lg md:w-80 sm:w-[90%]">
        <h2 className="text-xl font-bold text-white mb-4">Wallet Balance</h2>
        <p className="text-lg text-white mb-4">Balance: {type === "eth" ? balanceInEther : balanceInSol} {type === "eth" ? "ETH" : "SOL"}</p>
        <button
          className="bg-neutral-400 text-neutral-800 hover:bg-neutral-300 py-2 px-4 rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BalanceModal;
