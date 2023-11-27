import next from "next";

const API_URL = "http://localhost:8000";

export const fetchTransactions = async () => {
  try {
    const transactionsResponse = await fetch(`${API_URL}/transactions`); // Ganti dengan path ke route 'getAllTransactions' di backend Anda
    if (!transactionsResponse.ok) {
      throw new Error("Network response was not ok for transactions");
    }
    const transactions = await transactionsResponse.json();

    // Fetch employees
    // ...
    const employeeResponse = await fetch(`${API_URL}/employee`);
    if (!employeeResponse.ok) {
      throw new Error("Network response for employees was not ok");
    }
    const employeesData = (await employeeResponse.json()).data; // Perubahan disini

    // ...

    const mergeData = transactions.map((transaction) => {
      const employee = employeesData.find(
        // Perubahan disini
        (emp) => emp.id === transaction.employeeID
      );
      return {
        ...transaction,
        employeeName: employee ? employee.name : "Unknown",
      };
    });
    // ...

    return mergeData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getNextTransactionId = async () => {
  try {
      // Fetch transactions to get the count
      const transactions = await fetchTransactions();

      // Calculate the next ID based on the count
      const nextId = `TRX${transactions.length + 1}`;

      return nextId;
  } catch (error) {
      console.error("Error getting next transaction ID:", error);
      throw error;
  }
};
