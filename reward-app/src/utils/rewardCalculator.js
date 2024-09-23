// Calculate reward points based on transaction amount

export const calculatePoints = (amount) => {
  let points = 0;
  if (amount > 100) {
    points += 2 * (amount - 100); // 2 points for each dollar above $100
    amount = 100;
  }
  if (amount > 50) {
    points += (amount - 50); // 1 point for every dollar between $50 and $100
  }
  return points;
};

export const calculateMonthlyPoints = (transactions) => {
  const customerPoints = {};

  transactions.forEach(({ customerId, date, amount, fullName }) => {
    const month = new Date(date).getMonth() + 1;
    const points = calculatePoints(amount);
    if (!customerPoints[customerId]) {
      customerPoints[customerId] = {
        name: fullName,
        pointsByMonth: {}
      };
    }

    if (!customerPoints[customerId].pointsByMonth[month]) {
      customerPoints[customerId].pointsByMonth[month] = 0;
    }

    customerPoints[customerId].pointsByMonth[month] += points;
  });

  return customerPoints;
};
