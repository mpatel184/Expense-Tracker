import { useState } from "react";

const AddIncome = ({ onClose, onAdd }) => {
  const [income, setIncome] = useState("");

  const handleAddBalance = () => {
    const amount = parseFloat(income);
    if (!isNaN(amount) && amount > 0) {
      onAdd(amount);
      setIncome("");
    } else {
      alert("Please enter a valid amount.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Add Balance</h2>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="Income Amount"
          className="border rounded p-2 w-full mb-4 text-black"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={handleAddBalance} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            Add Balance
          </button>
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddIncome;
