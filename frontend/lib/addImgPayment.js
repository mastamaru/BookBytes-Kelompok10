export const addImgPayment = async (idTransaction, imgPayment) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/transactions/img/${idTransaction}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(imgPayment),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update book");
      }
  
      const editedTransaction = await response.json();
      return editedTransaction;
    } catch (error) {
      console.error("Error updating imgPayment:", error);
      throw error;
    }
  };