// Data set for calculating total points for each month by each customers (Date format: mm/dd/yyyy)
const transactions = [
  { customerId: 1, date: "01-07-2024", fullName:"John Doe", amount: 120 },
  { customerId: 1, date: "01-09-2024", fullName:"John Doe", amount: 77 },
  { customerId: 1, date: "03-10-2024", fullName:"John Doe", amount: 100 },
  { customerId: 1, date: "04-11-2024", fullName:"John Doe", amount: 60 },
  { customerId: 1, date: "05-12-2024", fullName:"John Doe", amount: 120 },
  { customerId: 1, date: "06-12-2024", fullName:"John Doe", amount: 60 },
  { customerId: 2, date: "02-09-2024", fullName:"Harry Potter", amount: 120 },
  { customerId: 2, date: "03-09-2024", fullName:"Harry Potter", amount: 53 },
  { customerId: 2, date: "04-15-2024", fullName:"Harry Potter", amount: 30 },
  { customerId: 2, date: "05-15-2024", fullName:"Harry Potter", amount: 65 },
];

export const fetchTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(transactions), 1000);
  });
};
