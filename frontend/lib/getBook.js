const API_URL = "https://book-bytes-kelompok10.vercel.app";

export const fetchBooks = async () => {
  try {
    const booksResponse = await fetch(`${API_URL}/books`);
    if (!booksResponse.ok) {
      throw new Error("Network response was not ok for books");
    }
    const books = await booksResponse.json();

    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};
