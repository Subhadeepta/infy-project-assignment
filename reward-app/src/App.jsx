import React, { useState, useEffect } from 'react';
import { fetchTransactions } from './api/transactionData';
import { calculateMonthlyPoints } from './utils/rewardCalculator';
import CustomerPoints from './components/CustomerPoints';

const App = () => {
  const [customerPoints, setCustomerPoints] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const transactions = await fetchTransactions();
        const points = calculateMonthlyPoints(transactions);
        setCustomerPoints(points);
      } catch (error) {
        console.error("Error fetching transactions", error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <CustomerPoints customerPoints={customerPoints} />;
};

export default App;
