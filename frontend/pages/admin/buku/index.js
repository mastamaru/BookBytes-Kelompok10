import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchBooks } from "@/lib/getBook";
import NavbarAdmin from "@/components/NavbarAdmin";
import Button from "@/components/Button";
import AddBookModal from "@/lib/addBookModal";
import DeleteBookModal from "@/lib/delBookModal";
import EditBookModal from "@/lib/editBookModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { delBook } from "@/lib/delBook";
export default function Buku() {
  const [books, setBooks] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const router = useRouter();
  useEffect(() => {
    //add token validation to check user session
    const token = localStorage.getItem("token");

    const isTokenValid = () => {
      return token != null;
    };

    if (!isTokenValid()) {
      router.push("/login");
    }

    const getBook = async () => {
      try {
        const data = await fetchBooks();
        console.log("Fetched Books:", data);
        setBooks(data);
      } catch (error) {
        console.error(error);
      }
    };

    getBook();
  }, [router]);

  const handleAddBook = async () => {
    // Refetch books after adding a new book
    const updatedBooks = await fetchBooks();
    setBooks(updatedBooks);
  };

  const handleDeleteBook = (bookId) => {
    setSelectedBookId(bookId);
    setIsDeleteModalOpen(true);
  };

  const handleEditBookClick = (bookId) => {
    const bookToEdit = books.find((book) => book.bookID === bookId);
    setSelectedBookId(bookToEdit);
    setIsEditModalOpen(true);
  };

  const handleEditBook = async () => {
    const updatedBooks = await fetchBooks();
    setBooks(updatedBooks);

    setIsEditModalOpen(false);
  };

  const confirmDeleteBook = async () => {
    try {
      await delBook(selectedBookId);

      const updatedBooks = await fetchBooks();
      setBooks(updatedBooks);

      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting book", error);
    }
  };
  // Fungsi untuk menangani proses logout
  const handleLogout = () => {
    // Menghapus token dari localStorage
    localStorage.removeItem("token");

    // Redirect ke halaman login
    router.push("/login");
  };

  return (
    <>
      <Head>
        <title>Admin - Data Buku</title>
      </Head>
      <section className="body bg-[url('/assets/bgbookopen.png')] relative h-[100vh] bg-cover">
        <Image
          src={"/assets/logo.png"}
          width={250}
          height={100}
          className="absolute left-[2.5%] top-[3%]"
          alt="logo"
        />
        <NavbarAdmin
          selectedLabel="Data Buku"
          className="left-[22%] top-[7%] z-[9999]"
        />
        <div className="pt-[260px] relative">
          <div className="w-[1200px] mx-auto">
            <div className="flex flex-col items-center ">
              <h1 className="font-mplus font-medium text-[65px] ">Data Buku</h1>
              <Button
                text="+ Tambah Buku"
                color="blue"
                className="py-2 px-4 text-[24px] mr-auto ml-[100px]"
                onClick={() => setIsAddModalOpen(true)}
              />
              <AddBookModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAddBook={handleAddBook}
              />
              <div
                className="table-container mt-12 max-h-[48vh] overflow-y-scroll"
                style={{ maxWidth: "1100px", marginLeft: "100px" }}
              >
                <table style={{ tableLayout: "fixed", width: "100%" }}>
                  <colgroup>
                    <col style={{ width: "10%" }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th style={{ fontSize: "16px" }}>ID Buku</th>
                      <th style={{ fontSize: "16px" }}>Judul Buku</th>
                      <th style={{ fontSize: "16px" }}>Pengarang</th>
                      <th style={{ fontSize: "16px" }}>Penerbit</th>
                      <th style={{ fontSize: "16px" }}>Tahun Terbit</th>
                      <th style={{ fontSize: "16px" }}>Genre</th>
                      <th style={{ fontSize: "16px" }}>Harga</th>
                      <th style={{ fontSize: "16px" }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book) => (
                      <tr key={book.bookID}>
                        <td>{book.bookID}</td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.publisher}</td>
                        <td>{book.year}</td>
                        <td>{book.genre}</td>
                        <td>{book.price}</td>
                        <td
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <button
                            onClick={() => handleEditBookClick(book.bookID)}
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              style={{ color: "blue" }}
                            />
                          </button>
                          <EditBookModal
                            isOpen={isEditModalOpen}
                            onClose={() => setIsEditModalOpen(false)}
                            onEditBook={handleEditBook}
                            selectedBook={selectedBookId}
                          />
                          <button onClick={() => handleDeleteBook(book.bookID)}>
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{ color: "red" }}
                            />
                          </button>
                          <DeleteBookModal
                            isOpen={isDeleteModalOpen}
                            onClose={() => setIsDeleteModalOpen(false)}
                            onDeleteBook={confirmDeleteBook}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Button
          onClick={handleLogout}
          icon={"/assets/signout.svg"}
          text={"Keluar"}
          color="red"
          className="flex py-[15px] px-5 text-[24px] items-center gap-2 absolute bottom-[5%] left-[1%]"
        />
      </section>
    </>
  );
}
