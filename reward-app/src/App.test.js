import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {
  calculatePoints,
  calculateMonthlyPoints,
} from "./utils/rewardCalculator";
import CustomerPoints from "./components/CustomerPoints";

//Test for calculation start
describe("calculatePoints", () => {
  test("should return 0 points for amounts $50 or below", () => {
    expect(calculatePoints(50)).toBe(0);
    expect(calculatePoints(30)).toBe(0);
  });

  test("should return 1 point per dollar between $50 and $100", () => {
    expect(calculatePoints(60)).toBe(10); // 60 - 50 = 10 points
    expect(calculatePoints(77)).toBe(27); // 77 - 50 = 27 points
  });

  test("should return 2 points per dollar above $100", () => {
    expect(calculatePoints(120)).toBe(90); // (120 - 100) * 2 + (100 - 50) = 40 + 50 = 90 points
    expect(calculatePoints(105)).toBe(60); // (105 - 100) * 2 + (100 - 50) = 10 + 50 = 60 points
  });

  test("should return correct points for exactly $100", () => {
    expect(calculatePoints(100)).toBe(50); // (100 - 50) = 50 points
  });
});

describe("calculateMonthlyPoints", () => {
  const transactions = [
    { customerId: 1, fullName: "John Doe", date: "01-07-2024", amount: 120 },
    { customerId: 1, fullName: "John Doe", date: "01-09-2024", amount: 77 },
    { customerId: 1, fullName: "John Doe", date: "03-10-2024", amount: 100 },
    { customerId: 1, fullName: "John Doe", date: "04-11-2024", amount: 60 },
    { customerId: 1, fullName: "John Doe", date: "05-12-2024", amount: 120 },
    { customerId: 1, fullName: "John Doe", date: "06-12-2024", amount: 60 },
    {
      customerId: 2,
      fullName: "Harry Potter",
      date: "02-09-2024",
      amount: 120,
    },
    { customerId: 2, fullName: "Harry Potter", date: "02-09-2024", amount: 53 },
    { customerId: 2, fullName: "Harry Potter", date: "02-15-2024", amount: 30 },
    { customerId: 2, fullName: "Harry Potter", date: "03-15-2024", amount: 65 },
  ];

  test("should calculate correct points for multiple customers and transactions in various months with customer names", () => {
    const expectedPoints = {
      1: {
        name: "John Doe",
        pointsByMonth: {
          1: 117, // 120 gives 90 points, 77 gives 27 points
          3: 50, // 100 gives 50 points
          4: 10, // 60 gives 10 points
          5: 90, // 120 gives 90 points
          6: 10, // 60 gives 10 points
        },
      },
      2: {
        name: "Harry Potter",
        pointsByMonth: {
          2: 93, // 120 gives 90 points, 53 gives 3 points, 30 gives 0 points
          3: 15, // 65 gives 15 points
        },
      },
    };

    expect(calculateMonthlyPoints(transactions)).toEqual(expectedPoints);
  });
  // Test for same month transactions
  test("should handle transactions in the same month with different amounts for the same customer", () => {
    const transactionsSameMonth = [
      {
        customerId: 2,
        fullName: "Harry Potter",
        date: "02-09-2024",
        amount: 120,
      },
      {
        customerId: 2,
        fullName: "Harry Potter",
        date: "02-09-2024",
        amount: 53,
      },
    ];

    const expectedPoints = {
      2: {
        name: "Harry Potter",
        pointsByMonth: {
          2: 93, // 120 gives 90 points, 53 gives 3 points
        },
      },
    };

    expect(calculateMonthlyPoints(transactionsSameMonth)).toEqual(
      expectedPoints
    );
  });

  test("should handle different customers and different months correctly", () => {
    const transactionsDifferentCustomers = [
      { customerId: 1, fullName: "John Doe", date: "01-09-2024", amount: 77 },
      {
        customerId: 2,
        fullName: "Harry Potter",
        date: "02-09-2024",
        amount: 53,
      },
    ];

    const expectedPoints = {
      1: {
        name: "John Doe",
        pointsByMonth: {
          1: 27, // 77 gives 27 points in January
        },
      },
      2: {
        name: "Harry Potter",
        pointsByMonth: {
          2: 3, // 53 gives 3 points in February
        },
      },
    };

    expect(calculateMonthlyPoints(transactionsDifferentCustomers)).toEqual(
      expectedPoints
    );
  });

  test("should return an empty object when no transactions are provided", () => {
    const transactionsEmpty = [];
    const expectedPoints = {};

    expect(calculateMonthlyPoints(transactionsEmpty)).toEqual(expectedPoints);
  });
});
//Test for calculation ends

//Test for rendering on screen starts
describe("CustomerPoints Component", () => {
  // Test rendering of customer points for a single customer with full name
  test("renders customer points for one customer with full name", () => {
    const customerPoints = {
      1: {
        name: "John Doe",
        pointsByMonth: {
          January: 150,
          February: 120,
        },
      },
    };

    render(<CustomerPoints customerPoints={customerPoints} />);

    expect(screen.getByText(/Customer: John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Month January: 150 points/i)).toBeInTheDocument();
    expect(screen.getByText(/Month February: 120 points/i)).toBeInTheDocument();
  });

  // Test rendering of customer points for multiple customers with full names
  test("renders customer points for multiple customers with full names", () => {
    const customerPoints = {
      1: {
        name: "John Doe",
        pointsByMonth: { January: 100 },
      },
      2: {
        name: "Harry Potter",
        pointsByMonth: { March: 200 },
      },
    };

    render(<CustomerPoints customerPoints={customerPoints} />);

    expect(screen.getByText(/Customer: John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Month January: 100 points/i)).toBeInTheDocument();
    expect(screen.getByText(/Customer: Harry Potter/i)).toBeInTheDocument();
    expect(screen.getByText(/Month March: 200 points/i)).toBeInTheDocument();
  });
});

//Test for rendering on screen ends
