import React, { useState, useEffect, useMemo } from "react";
import { fetchTransactions } from "./api/transactionData";
import { calculateMonthlyPoints } from "./utils/rewardCalculator";
import CustomerPoints from "./components/CustomerPoints";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetching the data asynchronously
    const loadTransactions = async () => {
      try {
        setLoading(true);
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions", error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  // Memoize the points calculation based on transactions
  const customerPoints = useMemo(() => {
    return calculateMonthlyPoints(transactions);
  }, [transactions]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <CustomerPoints customerPoints={customerPoints} />;
};

export default App;
