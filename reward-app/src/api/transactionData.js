const transactions = [
    { customerId: 1, date: '01-09-2024', amount: 120 },
    { customerId: 1, date: '01-10-2024', amount: 60 },
    { customerId: 2, date: '02-09-2024', amount: 120 },
    { customerId: 3, date: '02-07-2024', amount: 55 },

  ];
  
  export const fetchTransactions = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(transactions), 1000);
    });
  };
  