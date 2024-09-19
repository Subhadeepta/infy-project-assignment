//Component to display calculated points
import React from "react";

const CustomerPoints = ({ customerPoints }) => {
  return (
    <div className="app-container">
      {Object.keys(customerPoints).map((customerId) => (
        <div key={customerId}>
          <h2>Customer {customerId}</h2>
          {Object.keys(customerPoints[customerId]).map((month) => (
            <p key={month}>
              Month {month}: {customerPoints[customerId][month]} points
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CustomerPoints;
