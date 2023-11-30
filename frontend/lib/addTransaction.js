const API_URL = "https://book-bytes-kelompok10.vercel.app";

export const addTransaction = async (newTransaction) => {
  try {
    const response = await fetch(`${API_URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    });

    if (!response.ok) {
      throw new Error("Failed to add transaction");
    }

    const addedTransaction = await response.json();
    return addedTransaction;
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw error;
  }
};
