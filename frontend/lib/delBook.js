// const NEXT_PUBLIC_URL = "https://book-bytes-kelompok10.vercel.app";

export const delBook = async (bookID) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/books/${bookID}`, {
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
