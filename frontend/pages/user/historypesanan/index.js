import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchBooks } from "@/lib/getBook";
import { fetchTransactions } from "@/lib/getTransaction";
import AddTransactionModal from "@/components/addTransactionModal";
import moment from "moment";
import "moment-timezone";
import Button from "@/components/Button";
import Head from "next/head";

export default function Transaction(){
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
    const [transactions, setTransactions] = useState([]);
    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
    const [books, setBooks] = useState([]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
      }

    const handleTransaction = () => {
        setIsTransactionModalOpen(true);
    };

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

    useEffect(() => {
        const getTransaction = async () => {
            try {
              const data = await fetchTransactions();
              console.log("Fetched Transactions:", data); // Menampilkan data ke console
              setTransactions(data);
            } catch (error) {
              console.error(error);
            }
          };
      
          getTransaction();
    },[])

    console.log(transactions)
    return (
        <>
      <Head>
        <title>Cashier - Data Transaksi</title>
      </Head>
      <section className="body bg-[url('/assets/bgbookopen.png')] relative h-[100vh] bg-cover">
        <Image
          src={"/assets/logo.png"}
          width={250}
          height={100}
          className="absolute left-[2.5%] top-[3%] "
          alt="logo"
        />
        {/* <NavbarAdmin
          selectedLabel="Data Transaksi"
          className="top-[7%] left-[22%] z-[9999]"
        /> */}
        <div className="pt-[260px] relative">

          <div className="flex flex-col items-center ">
            <h1 className="font-mplus font-medium text-[65px]">
              Data Transaksi
            </h1>
            <div className="table-container mt-12 max-h-[48vh] overflow-y-scroll">
              <table>
                <thead>
                  <tr>
                    <th>ID Transaksi</th>
                    <th>Waktu Transaksi</th>
                    <th>User</th>
                    <th>Barang Pembelian</th>
                    <th>Total Harga</th>
                    <th>Status</th>
                    <th>Bukti Pembayaran</th>
                    <th>Konfirmasi Pembayaran</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction._id}>
                      <td className="padded-right">
                        {transaction.idTransaction}
                      </td>
                      <td>
                        {moment
                          .tz(transaction.createdAt, "Asia/Jakarta")
                          .format("DD-MM-YY HH:mm")}
                      </td>
                      <td>{transaction.employeeName}</td>
                      <td>
                        {transaction.books.map((book) => (
                          <div key={book._id}>
                            {book.title} : {book.quantity}
                          </div>
                        ))}
                      </td>
                      <td className="padded-right">{transaction.totalPrice}</td>
                      <td>{transaction.status}</td>
                      {transaction.imgPayment ? (
                        <td>
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            onClick={() => {
                              window.open(transaction.imgPayment);
                            }}
                          >
                            Open
                          </button>
                        </td>
                      ) : (
                        <td></td>
                      )}
                      {transaction.status === "PENDING" && transaction.imgPayment!==null ? (
                        <td className="flex gap-2 items-center justify-center">
                          <Button
                color={"green"}
                text={"> Simpan"}
                className="py-2 px-4 text-[24px] items-center relative top-[100px] left-[75%]"
                // onClick={() => router.push('/user/historypesanan')}
                onClick={() => setIsTransactionModalOpen(true)}
              />
              <AddTransactionModal
                isOpen={isTransactionModalOpen}
                onClose={() => setIsTransactionModalOpen(false)}
                books={books}
                transactionID={transactionId}
                employeeID={employeeId}
                totalPrice={total}
                onAddRow={handleTransaction}
              />
                        </td>
                      ) : (
                        <td></td>
                      )}
                      
                    </tr>
                  ))}
                </tbody>
              </table>
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
    )
}