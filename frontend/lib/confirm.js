export const confirmTransaction = async (idTransaction) => {
    try {
      const response = await fetch(`http://localhost:3000/cashier/transaction/${idTransaction}/confirm`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'APPROVED' }),
      });
      if (!response.ok) {
        throw new Error('Failed to confirm transaction');
      }
      return await response.json();
    } catch (error) {
      console.error('Error confirming transaction:', error);
      throw error;
    }
  };  