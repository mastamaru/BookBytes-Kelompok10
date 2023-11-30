const API_URL = "https://book-bytes-kelompok10.vercel.app";

export const delBook = async (bookID) => {
  try {
    const response = await fetch(`${API_URL}/books/${bookID}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete book");
    }

    const deletedBook = await response.json();
    return deletedBook;
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};
