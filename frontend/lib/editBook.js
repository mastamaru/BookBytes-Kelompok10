const API_URL = "https://book-bytes-kelompok10.vercel.app";

export const editBook = async (bookID, updatedBook) => {
  try {
    const response = await fetch(`${API_URL}/books/${bookID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });

    if (!response.ok) {
      throw new Error("Failed to update book");
    }

    const editedBook = await response.json();
    return editedBook;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};
