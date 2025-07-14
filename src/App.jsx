import React, { useState, useEffect } from 'react';

function App() {
  const [transactions, setTransactions] = useState(() => {
    const data = localStorage.getItem('transactions');
    return data ? JSON.parse(data) : [];
  });

  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = () => {
    if (!desc || !amount) return;
    const newTx = {
      id: Date.now(),
      desc,
      amount: parseFloat(amount)
    };
    setTransactions([newTx, ...transactions]);
    setDesc('');
    setAmount('');
  };

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="app">
      <h1>💼 Expense Tracker</h1>
      <p>Income: ₹{income}</p>
      <p>Expense: ₹{Math.abs(expense)}</p>

      <input
        type="text"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={addTransaction}>Add Transaction</button>

      <ul>
        {transactions.map((tx) => (
          <li key={tx.id}>
            {tx.desc} - ₹{tx.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
