// Displays Transactions
import React from "react";

const TransactionsTable = ({ transactions }) => {
  return (
    <table>
      <caption>Customer Transactions</caption>
      <thead>
        <tr>
          <th className="app-container">Customer Name</th>
          <th className="app-container">Date</th>
          <th className="app-container">Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td className="app-container">{transaction.fullName}</td>
            <td className="app-container">{transaction.date}</td>
            <td className="app-container">${transaction.amount.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionsTable;
