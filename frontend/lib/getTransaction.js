import next from "next";

// const NEXT_PUBLIC_URL = "https://book-bytes-kelompok10.vercel.app";

export const fetchTransactions = async () => {
  try {
    const transactionsResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/transactions`); // Ganti dengan path ke route 'getAllTransactions' di backend Anda
    if (!transactionsResponse.ok) {
      throw new Error("Network response was not ok for transactions");
    }
    const transactions = await transactionsResponse.json();

    // Fetch employees
    // ...
    const employeeResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/employee`);
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

export const fetchTransactionsByUsername = async (username) => {
  try {
    const transactionsResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/transactions/user/${username}`);
    if (!transactionsResponse.ok) {
      throw new Error("Network response was not ok for transactions by user ID");
    }
    const transactions = await transactionsResponse.json();

    // Fetch books to map book titles
    const bookIDs = transactions.flatMap(transaction => transaction.books.map(book => book.bookID));
    const uniqueBookIDs = [...new Set(bookIDs)];
    const booksResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/books?ids=${uniqueBookIDs.join(",")}`);
    if (!booksResponse.ok) {
      throw new Error("Network response for books was not ok");
    }
    const booksData = await booksResponse.json();

    const mergeData = transactions.map((transaction) => {
      const mappedBooks = transaction.books.map((book) => {
        const matchedBook = booksData.find((b) => b.bookID === book.bookID);
        return {
          ...book,
          title: matchedBook ? matchedBook.title : "Unknown",
        };
      });
      return {
        ...transaction,
        books: mappedBooks,
      };
    });

    return mergeData;
  } catch (error) {
    console.error("Error fetching transactions by user ID:", error);
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

export const confirmTransaction = async (idTransaction) => {
  console.log(`Confirming transaction with ID: ${idTransaction}`);
  const response = await fetch(`https://book-bytes-be.vercel.app/transactions/${idTransaction}/confirm`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: 'APPROVED' }),
  });
  const data = await response.json();
  console.log('Response from confirmTransaction:', data);
  return data;
};

export const rejectTransaction = async (idTransaction) => {
  console.log(`Rejecting transaction with ID: ${idTransaction}`);
  const response = await fetch(`https://book-bytes-be.vercel.app/transactions/${idTransaction}/reject`, {
    method: 'DELETE',
  });
  const data = await response.json();
  console.log('Response from rejectTransaction:', data);
  return data;
};
