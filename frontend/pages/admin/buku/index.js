import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchBooks } from "@/lib/getBook";
import NavbarAdmin from "@/components/NavbarAdmin";
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
export default function Buku() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
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
  }, []);

  return (
    <>
      <section className="body bg-[url('/assets/bgbookopen.png')] relative h-[100vh] bg-cover">
        <Image
          src={"/assets/logo.png"}
          width={250}
          height={100}
          className="absolute left-[2.5%] top-[3%]"
          alt="logo"
        />
        <div className="pt-[260px] relative">
          <NavbarAdmin isActive={true} className="left-[22%] top-[6.5%]" />
          <div className="flex flex-col items-center ">
            <h1 className="font-mplus font-medium text-[65px] ">Data Buku</h1>
            <Button
              text="+ Tambah Buku"
              color="blue"
              className="py-2 px-4 text-[24px] mr-auto ml-[260px]"
            />
            <div
              className="table-container mt-12 max-h-[60vh] overflow-auto"
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
                        <button onClick={() => handleEditBook(book.bookID)}>
                          <FontAwesomeIcon
                            icon={faEdit}
                            style={{ color: "blue" }}
                          />
                        </button>
                        <button onClick={() => handleDeleteBook(book.bookID)}>
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{ color: "red" }}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Button
          icon={"/assets/signout.svg"}
          text={"Keluar"}
          color="red"
          className="flex py-[15px] px-5 text-[24px] items-center gap-2 absolute bottom-[5%] left-[1%]"
        />
      </section>
    </>
  );
}
