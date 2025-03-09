import { useState } from "react";

const AddExpense = ({ onClose, onAdd }) => {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount || isNaN(amount) || amount <= 0) {
            alert("Enter a valid amount!");
            return;
        }
        onAdd(parseFloat(amount), category);
        setAmount("");
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Add Expense</h2>
                <form onSubmit={handleSubmit}>
                    <label>Amount:</label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />

                    <label>Category:</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Food">Food</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Travel">Travel</option>
                    </select>

                    <button type="submit">Add Expense</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AddExpense;
