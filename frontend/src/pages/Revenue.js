import React, { useState } from "react";
import "./Revenue.css";

function Revenue() {
  const [transactions] = useState([
    {
      id: 1,
      customer: "John Doe",
      amount: 5000,
      status: "Paid",
      date: "2024-11-15",
    },
    {
      id: 2,
      customer: "Jane Smith",
      amount: 3000,
      status: "Pending",
      date: "2024-11-16",
    },
    {
      id: 3,
      customer: "Bob Lee",
      amount: 7000,
      status: "Failed",
      date: "2024-11-17",
    },
  ]);

  const totalEarnings = transactions
    .filter((t) => t.status === "Paid")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <div className="revenue">
      <h2>REVENUE OVERVIEW</h2>

      <div className="revenue-summary">
        <div className="summary-item">
          <h3>Total Earnings</h3>
          <p>KES {totalEarnings}</p>
        </div>
        <div className="summary-item">
          <h3>Transactions</h3>
          <p>{transactions.length}</p>
        </div>
        <div className="summary-item">
          <h3>Pending Payments</h3>
          <p>{transactions.filter((t) => t.status === "Pending").length}</p>
        </div>
      </div>

      <h3>Transaction Summaries</h3>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.customer}</td>
              <td>KES {transaction.amount}</td>
              <td className={`status-${transaction.status.toLowerCase()}`}>
                {transaction.status}
              </td>
              <td>{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Revenue;
