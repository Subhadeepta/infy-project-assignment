//Component to display calculated points
import React, { useMemo } from "react";

const CustomerPoints = ({ customerPoints }) => {
  // Memoizing the rendered customer points
  const memoizedCustomerPoints = useMemo(() => {
    return Object.keys(customerPoints).map((customerId) => (
      <>
        <div key={customerId}>
          <h2 className="app-container">Customer {customerId}</h2>
          {Object.keys(customerPoints[customerId]).map((month) => (
            <p key={month}>
              Month {month}: {customerPoints[customerId][month]} points
            </p>
          ))}
        </div>
      </>
    ));
  }, [customerPoints]);

  return (
    <>
      <div className="app-container">{memoizedCustomerPoints}</div>
    </>
  );
};

export default CustomerPoints;
