//Component to display calculated points
import React, { useMemo } from "react";

const CustomerPoints = ({ customerPoints }) => {
  // Memoizing the rendered customer points
  const memoizedCustomerPoints = useMemo(() => {
    return Object.keys(customerPoints).map((customerId) => {
      const customer = customerPoints[customerId];
      return (
        <div key={customerId}>
          <h3 className="app-container">{`Customer: ${customer.name}`}</h3>
          {Object.keys(customer.pointsByMonth).map((month) => (
            <p key={month}>
              Month {month}: {customer.pointsByMonth[month]} points
            </p>
          ))}
        </div>
      );
    });
  }, [customerPoints]);

  return (
    <>
      <h2>Monthly Reward Points ➡️</h2>
      <div className="app-container">{memoizedCustomerPoints}</div>
    </>
  );
};

export default CustomerPoints;
