import { useState } from "react";

const AddExpense = ({ onClose, onAdd }) => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");
    const [date, setDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount || isNaN(amount) || amount <= 0) {
            alert("Enter a valid amount!");
            return;
        }
        onAdd(parseFloat(amount), category, title, date);
        setAmount("");
        setTitle("");
    };

    return (
        <div className="modal" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div className="modal-content" style={{
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                padding: '20px',
                width: '350px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
            }}>
                <h2 style={{
                    margin: '0 0 20px 0',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#333'
                }}>Add Expenses</h2>
                
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                fontSize: '14px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <input
                            type="number"
                            placeholder="Price"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                fontSize: '14px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ 
                        display: 'flex', 
                        gap: '10px', 
                        marginBottom: '20px'
                    }}>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{
                                flex: 1,
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                fontSize: '14px',
                                backgroundColor: 'white',
                                boxSizing: 'border-box'
                            }}
                        >
                            <option value="" disabled>Select category</option>
                            <option value="Food">Food</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Travel">Travel</option>
                        </select>

                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            style={{
                                flex: 1,
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                fontSize: '14px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ 
                        display: 'flex', 
                        gap: '10px'
                    }}>
                        <button
                            type="submit"
                            style={{
                                flex: 1,
                                backgroundColor: '#F9B84F',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '12px',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            Add Expense
                        </button>
                        
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                flex: 1,
                                backgroundColor: '#e0e0e0',
                                color: '#666',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '12px',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddExpense;