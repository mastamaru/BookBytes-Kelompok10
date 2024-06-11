
export const fetchBooks = async () => {
  const url = process.env.NEXT_PUBLIC_URL;
  console.log(url);

  try {
    const booksResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/books`);
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
