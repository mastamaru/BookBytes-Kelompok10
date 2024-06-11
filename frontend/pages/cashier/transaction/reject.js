export const rejectTransaction = async (idTransaction) => {
    try {
      const response = await fetch(`http://localhost:3000/cashier/transactions/${idTransaction}/reject`, {
        method: 'DELETE',
      });
// export const rejectTransaction = async (idTransaction) => {
//     try {
//       const response = await fetch(`http://localhost:3000/transactions/${idTransaction}/reject`, {
//         method: 'DELETE',
//       });

      if (!response.ok) {
        throw new Error('Failed to reject transaction');
      }
//       if (!response.ok) {
//         throw new Error('Failed to reject transaction');
//       }

      return await response.json();
    } catch (error) {
      console.error('Error rejecting transaction:', error);
      throw error;
    }
  };  
//       return await response.json();
//     } catch (error) {
//       console.error('Error rejecting transaction:', error);
//       throw error;
//     }
//   }; 