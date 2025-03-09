import { useState } from "react";
import { PieChart, Pie, Cell } from 'recharts';
import AddIncome from "../Addincome";
import AddExpense from "../AddExpense";
import './HomePage.css'

export default function HomePage() {
    const [expense, setExpense] = useState(0);
    const [balance, setBalance] = useState(5000);
    const [transactions, setTransactions] = useState([]);
    const [showAddIncome, setShowAddIncome] = useState(false);
    const [showAddExpense, setShowAddExpense] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);

    const COLORS = ['#9C27B0', '#FF9800', '#FFEB3B'];

    const handleAddIncome = (amount) => {
        setBalance(prevBalance => prevBalance + amount);
        setTransactions(prevTransactions => [...prevTransactions, { id: Date.now(), type: "Income", amount }]);
        setShowAddIncome(false);
    };

    const handleAddExpense = (amount, category) => {
        if (amount > balance) {
            alert("Insufficient balance!");
            return;
        }
        setBalance(prevBalance => prevBalance - amount);
        setExpense(prevExpense => prevExpense + amount);
        setTransactions(prevTransactions => [...prevTransactions, { id: Date.now(), type: "Expense", amount, category }]);
        setShowAddExpense(false);
    };

    const handleDeleteTransaction = (id) => {
        const transaction = transactions.find(t => t.id === id);
        if (transaction.type === "Income") {
            setBalance(prevBalance => prevBalance - transaction.amount);
        } else {
            setBalance(prevBalance => prevBalance + transaction.amount);
            setExpense(prevExpense => prevExpense - transaction.amount);
        }
        setTransactions(prevTransactions => prevTransactions.filter(t => t.id !== id));
    };

    const handleEditTransaction = (id, newAmount, newCategory) => {
        const transaction = transactions.find(t => t.id === id);
        const difference = newAmount - transaction.amount;

        if (transaction.type === "Income") {
            setBalance(prevBalance => prevBalance + difference);
        } else {
            if (difference > balance) {
                alert("Insufficient balance!");
                return;
            }
            setBalance(prevBalance => prevBalance - difference);
            setExpense(prevExpense => prevExpense + difference);
        }

        setTransactions(prevTransactions =>
            prevTransactions.map(t =>
                t.id === id ? { ...t, amount: newAmount, category: newCategory } : t
            )
        );
        setEditingTransaction(null);
    };

    const pieData = [
        { name: 'Food', value: transactions.filter(t => t.category === "Food").reduce((sum, t) => sum + t.amount, 0) },
        { name: 'Entertainment', value: transactions.filter(t => t.category === "Entertainment").reduce((sum, t) => sum + t.amount, 0) },
        { name: 'Travel', value: transactions.filter(t => t.category === "Travel").reduce((sum, t) => sum + t.amount, 0) }
    ].filter(item => item.value > 0);


    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };

    return (
        <div className="homepage" style={{ backgroundColor: '#222', color: 'white', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ color: 'white', marginBottom: '20px' }}>Expense Tracker</h1>
            
            <div className="container-block">
                <div className="wallet-balance">
                    <h3 style={{ color: 'white' }}>Wallet Balance: <span style={{ color: '#90EE90' }}>₹{balance}</span></h3>
                    <button className="add-income-btn" onClick={() => setShowAddIncome(true)}>+ Add Balance</button>
                </div>

                <div className="expense-block">
                    <h3 style={{ color: 'white' }}>Expenses: <span style={{ color: '#FFD700' }}>₹{expense}</span></h3>
                    <button className="add-expense-btn" onClick={() => setShowAddExpense(true)}>+ Add Expense</button>
                </div>

                <div style={{ flex: 1, minWidth: '300px', textAlign: 'center' }}>
                    <PieChart width={300} height={200} className="ml-56">
                        <Pie
                            data={pieData.length > 0 ? pieData : [{ name: 'No Data', value: 1 }]}
                            cx="50%"
                            cy="50%"
                            outerRadius={70}
                            innerRadius={0}
                            dataKey="value"
                            labelLine={false}
                        >
                            {pieData.length > 0 ? (
                                pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))
                            ) : (
                                <Cell fill="#777" />
                            )}
                        </Pie>
                    </PieChart>

                    <div className="legend ml-32">
                        <span><div className="legend-box food"></div>Food</span>
                        <span><div className="legend-box entertainment"></div>Entertainment</span>
                        <span><div className="legend-box travel"></div>Travel</span>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <div style={{ width: '58%' }}>
                    <h2 style={{ color: 'white', marginBottom: '10px' }}>Recent Transactions</h2>
                    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '10px', minHeight: '100px' }}>
                        {transactions.length === 0 ? (
                            <p style={{ color: 'black', textAlign: 'center' }}>No transactions!</p>
                        ) : (
                            transactions.map((t, index) => (
                                <div key={index} style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center', 
                                    padding: '10px', 
                                    borderBottom: index !== transactions.length - 1 ? '1px solid #eee' : 'none',
                                    color: 'black'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ 
                                            backgroundColor: t.type === 'Income' ? '#E0FFFF' : '#F5F5F5', 
                                            padding: '8px', 
                                            borderRadius: '50%', 
                                            width: '20px', 
                                            height: '20px', 
                                            display: 'flex', 
                                            justifyContent: 'center', 
                                            alignItems: 'center' 
                                        }}>
                                            {t.type === 'Income' ? '$' : '¥'}
                                        </div>
                                        <div>
                                            <div>{t.type === 'Income' ? 'Income' : t.category}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#777' }}>{formatDate(t.id)}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ color: t.type === 'Income' ? 'green' : 'orange', fontWeight: 'bold' }}>
                                            {t.type === 'Income' ? '+' : '-'}₹{t.amount}
                                        </span>
                                        <button style={{ 
                                            backgroundColor: '#FFE4B5', 
                                            border: 'none', 
                                            borderRadius: '50%', 
                                            width: '30px', 
                                            height: '30px', 
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }} onClick={() => setEditingTransaction(t)}>
                                            ✏️
                                        </button>
                                        <button style={{ 
                                            backgroundColor: '#FFC0CB', 
                                            border: 'none', 
                                            borderRadius: '50%', 
                                            width: '30px', 
                                            height: '30px', 
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }} onClick={() => handleDeleteTransaction(t.id)}>
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div style={{ width: '38%' }}>
                    <h2 style={{ color: 'white', marginBottom: '10px' }}>Top Expenses</h2>
                    <div style={{ 
                        backgroundColor: 'white', 
                        borderRadius: '8px', 
                        padding: '20px', 
                        color: 'black',
                        minHeight: '100px'
                    }}>
                        {['Food', 'Entertainment', 'Travel'].map((category, index) => {
                            const amount = transactions
                                .filter(t => t.category === category)
                                .reduce((sum, t) => sum + t.amount, 0);
                            
                            return (
                                <div key={index} style={{ marginBottom: '15px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                        <span>{category}</span>
                                        <span>₹{amount}</span>
                                    </div>
                                    <div style={{ 
                                        width: '100%', 
                                        height: '10px', 
                                        backgroundColor: '#f0f0f0', 
                                        borderRadius: '5px',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{ 
                                            width: `${expense > 0 ? (amount / expense) * 100 : 0}%`, 
                                            height: '100%', 
                                            backgroundColor: COLORS[index],
                                            borderRadius: '5px'
                                        }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {showAddIncome && <AddIncome onClose={() => setShowAddIncome(false)} onAdd={handleAddIncome} />}
            {showAddExpense && <AddExpense onClose={() => setShowAddExpense(false)} onAdd={handleAddExpense} />}
            {editingTransaction && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Transaction</h2>
                        <input
                            type="number"
                            defaultValue={editingTransaction.amount}
                            onChange={(e) => setEditingTransaction({ ...editingTransaction, amount: parseFloat(e.target.value) })}
                        />
                        {editingTransaction.type === "Expense" && (
                            <select
                                defaultValue={editingTransaction.category}
                                onChange={(e) => setEditingTransaction({ ...editingTransaction, category: e.target.value })}
                            >
                                <option value="Food">Food</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Travel">Travel</option>
                            </select>
                        )}
                        <button onClick={() => handleEditTransaction(editingTransaction.id, editingTransaction.amount, editingTransaction.category)}>Save</button>
                        <button onClick={() => setEditingTransaction(null)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}