import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import "moment-timezone";
import AddRowModal from "@/components/addRowModal";
import NavbarAdmin from "@/components/NavbarAdmin";
import Button from "@/components/Button";
import { fetchTransactions } from "@/lib/getTransaction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteRowModal from "@/components/delRowModal";
import AddTransactionModal from "@/components/addTransactionModal";
import Head from "next/head";
import { fetchBooks } from "@/lib/getBook";
import { fetchEmployees } from "@/lib/getEmployee";
import { getNextTransactionId } from "@/lib/getTransaction";

export default function Kasir() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);
  const [transactionId, setTransactionID] = useState("");
  const [rows, setRows] = useState([]);
  const [books, setBooks] = useState([]);
  const router = useRouter();
  var ind;

  useEffect(() => {
    // add token validation to check user session
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const isTokenValid = () => {
      return token != null && role === "user";
    };

    if (!isTokenValid()) {
      console.log("Navigation error: You are authorized to see this page!");
      if(token == null){
        router.push("/login");
      }
      if(role === "admin"){
        router.push("/admin/transaksi");
      } 
      if(role === "cashier"){
        router.push("/cashier/transaksi");
      }
    }

    const fetchData = async () => {
      try {
        const nextId = await getNextTransactionId();
        setTransactionID(nextId);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error (e.g., show an error message to the user)
      }
    };

    fetchData();
  }, [router]);

  const fetchBookIdByTitle = async (title) => {
    try {
      const booksData = await fetchBooks();
      const book = booksData.find((bk) => bk.title === title);
      return book ? book.bookID : null;
    } catch (error) {
      console.error("Error fetching books data:", error);
      return null;
    }
  };

  const handleAddRow = async (newRow) => {
    try {
      const bookID = await fetchBookIdByTitle(newRow.title);
      newRow.idTransaction = transactionId;
      console.log("newRow:", newRow);
      console.log("bookID:", bookID);
      console.log("employeeId:", employeeId);
      // Ensure both bookID and employeeId are available
      if (bookID !== null && employeeId !== null) {
        // Check if the book already exists in the rows
        const existingRowIndex = rows.findIndex(
          (row) => row.title === newRow.title
        );
        if (existingRowIndex !== -1) {
          // If the book already exists, update the quantity in the existing row
          const updatedRows = [...rows];
          updatedRows[existingRowIndex].quantity += newRow.quantity;
          setRows(updatedRows);
        } else {
          // If the book doesn't exist, add a new row
          setRows([...rows, newRow]);
        }
        // Update the quantity in the books array
        const updatedBooks = [...books];
        const existingBookIndex = updatedBooks.findIndex(
          (book) => book.bookID === bookID
        );
        if (existingBookIndex !== -1) {
          updatedBooks[existingBookIndex].quantity += newRow.quantity;
        } else {
          updatedBooks.push({ bookID, quantity: newRow.quantity });
        }
        setBooks(updatedBooks);
      } else {
        console.error("Error adding row: bookID is null");
      }
    } catch (error) {
      console.error("Error handling add row:", error);
    }
  };

  const handleDeleteRow = () => {
    setIsDeleteModalOpen(true);
  };

  const handleTransaction = () => {
    setIsTransactionModalOpen(true);
  };

  const confirmDeleteRow = (index) => {
    ind = index;
    try {
      // Perform the deletion logic here, using the provided index
      const updatedRows = [...rows];
      const updatedBooks = [...books];
      updatedRows.splice(index, 1); // Remove the row at the specified index
      updatedBooks.splice(index, 1);
      setRows(updatedRows);
      setBooks(updatedBooks);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting row", error);
    }
  };

  const calculateTotalPrice = () => {
    return rows.reduce((total, row) => {
      // Calculate the price for each row and add it to the total
      const rowTotalPrice = row.quantity * row.price;
      return total + rowTotalPrice;
    }, 0);
  };
  const total = calculateTotalPrice();
  return (
    <>
      <Head>
        <title>Keranjang Transaksi</title>
      </Head>
      <section className="body">
        <Image
          src={"/assets/logo.png"}
          width={250}
          height={100}
          className="absolute left-[8.5%] top-[10%]"
          alt="logo"
        />
        <div className="flex flex-row items-end gap-10 absolute top-[0] left-[40%] leading-normal font-mplus font-bold text-[35px]">
          <div
            className="rounded-[24px] px-[92px] py-8 bg-[#FBB91C] mx-auto "
            alt="transaksi"
          >
            Keranjang
          </div>
        </div>
        <div className="pt-[200px] relative">
          <div className="flex flex-col items-center ">
            <div className="table-container mt-12">
              <table>
                <thead>
                  <tr>
                    <th>ID Transaksi</th>
                    <th>Judul Buku</th>
                    <th>Jumlah</th>
                    <th>Harga Satuan</th>
                    <th>Harga</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <td>{row.idTransaction}</td>
                      <td>{row.title}</td>
                      <td>{row.quantity}</td>
                      <td>{row.price}</td>
                      <td>{row.quantity * row.price}</td>
                      <td>
                        <button onClick={() => handleDeleteRow(index)}>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="py-2 px-4 text-[24px] items-center relative top-[10px]"
                            style={{ color: "red" }}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button
                color={"blue"}
                text={"+ Tambah Baris"}
                className="py-2 px-4 text-[24px] items-center relative top-[100px] left-[70%]"
                onClick={() => setIsAddModalOpen(true)}
              />
              <AddRowModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAddRow={handleAddRow}
              />
              <Button
                color={"green"}
                text={"> Simpan"}
                className="py-2 px-4 text-[24px] items-center relative top-[100px] left-[75%]"
                onClick={() => router.push('/user/historypesanan')}
                // onClick={() => setIsTransactionModalOpen(true)}
              />
              {/* <AddTransactionModal
                isOpen={isTransactionModalOpen}
                onClose={() => setIsTransactionModalOpen(false)}
                books={books}
                transactionID={transactionId}
                employeeID={employeeId}
                totalPrice={total}
                onAddRow={handleTransaction}
              /> */}
            </div>
          </div>
        </div>
        {/* Move DeleteRowModal outside the table */}
        <DeleteRowModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDeleteRow={() => confirmDeleteRow(ind)}
        />
        <div className="flex flex-row items-end gap-6 absolute top-[11%] left-[67.5%] leading-normal font-mplus font-bold text-[35px]">
          <Button
            onClick={()=>router.push('/user/katalog')}
            // icon={"/assets/signout.svg"}
            text={"Lihat Katalog"}
            color="red"
            className="flex py-1 px-5 text-sm items-center relative top-[-10px]"
          />
        </div>
      </section>
    </>
  );
}
