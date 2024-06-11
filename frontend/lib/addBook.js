// const NEXT_PUBLIC_URL = "https://book-bytes-kelompok10.vercel.app";

export const addBook = async (newBook) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error("Failed to add book");
    }

    const addedBook = await response.json();
    return addedBook;
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};
