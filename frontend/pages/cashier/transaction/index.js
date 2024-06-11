import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchTransactions, confirmTransaction, rejectTransaction } from "@/lib/getTransaction";
import moment from "moment";
import "moment-timezone";
import NavbarAdmin from "@/components/NavbarAdmin";
import Button from "@/components/Button";
import Head from "next/head";

export default function Transaction() {
  const [transactions, setTransactions] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  useEffect(() => {
    const getTransaction = async () => {
      try {
        const data = await fetchTransactions();
        console.log("Fetched Transactions:", data);
        setTransactions(data);
      } catch (error) {
        console.error(error);
      }
    };

    getTransaction();
  }, []);

  const handleConfirm = async (idTransaction) => {
    console.log(`Confirm button clicked for transaction ID: ${idTransaction}`);
    try {
      const response = await confirmTransaction(idTransaction);
      if (response.success) {
        setTransactions((prevTransactions) =>
          prevTransactions.map((transaction) =>
            transaction.idTransaction === idTransaction
              ? { ...transaction, status: 'APPROVED' }
              : transaction
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (idTransaction) => {
    console.log(`Reject button clicked for transaction ID: ${idTransaction}`);
    try {
      const response = await rejectTransaction(idTransaction);
      if (response.success) {
        setTransactions((prevTransactions) =>
          prevTransactions.filter((transaction) => transaction.idTransaction !== idTransaction)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          className="absolute left-[2.5%] top-[3%]"
          alt="logo"
        />
        <div className="pt-[260px] relative">
          <div className="flex flex-col items-center ">
            <h1 className="font-mplus font-medium text-[65px]">Data Transaksi</h1>
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
                      <td className="padded-right">{transaction.idTransaction}</td>
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
                      {transaction.status === "PENDING" && transaction.imgPayment !== null ? (
                        <td className="flex gap-2 items-center justify-center">
                          <button
                            className="bg-green-500 text-white px-2 py-2 rounded-md"
                            onClick={() => handleConfirm(transaction.idTransaction)}
                          >
                            Confirm
                          </button>
                          <button
                            className="bg-red-500 text-white px-2 py-2 rounded-md"
                            onClick={() => handleReject(transaction.idTransaction)}
                          >
                            Reject
                          </button>
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
  );
}