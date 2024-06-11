export const fetchBooks = async () => {
    try {
      const booksResponse = await fetch(`${process.env.NEXT_PUBLIC_URL_INVENTORY}/inventory`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
      }});

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
  