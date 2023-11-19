import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchTransactions } from "@/lib/getTransaction";
import moment from "moment";
import "moment-timezone";
import NavbarAdmin from "@/components/NavbarAdmin";
import Button from "@/components/Button";
import Head from "next/head";
export default function Transaksi() {
  const [transactions, setTransactions] = useState([]);
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

    const getTransaction = async () => {
      try {
        const data = await fetchTransactions();
        console.log("Fetched Transactions:", data); // Menampilkan data ke console
        setTransactions(data);
      } catch (error) {
        console.error(error);
      }
    };

    getTransaction(); // Memanggil fungsi getTransaction saat komponen dimuat
  }, []); // Menambahkan array kosong sebagai dependency agar useEffect hanya berjalan sekali saat komponen dimuat

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
        <title>Admin - Data Transaksi</title>
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
          {/* <div className="flex flex-row items-end gap-6 absolute top-[10.6%] left-[22%] leading-normal font-mplus font-bold text-[35px]">
            <button className="rounded-[5px] px-[92px] py-2.5 bg-[#7AC2A5]">
              Data Buku
            </button>
            <button className="rounded-[5px] px-[11px] py-[46px] text-[45px] bg-[#B0ABD1]">
              Data Transaksi
            </button>
            <button className="rounded-[5px] px-[91px] py-3 bg-[#E999B8]">
              Data Kasir
            </button>
          </div> */}
          <NavbarAdmin
            selectedLabel="Data Transaksi"
            className="top-[7.9%] left-[22%]"
          />
          <div className="flex flex-col items-center ">
            <h1 className="font-mplus font-medium text-[65px]">
              Data Transaksi
            </h1>
            <div className="table-container mt-12 max-h-[48vh] overflow-hidden">
              <table>
                <thead>
                  <tr>
                    <th>ID Transaksi</th>
                    <th>Waktu Transaksi</th>
                    <th>Barang Pembelian</th>
                    <th>Total Harga</th>
                    <th>Nama Kasir</th>
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
                      <td>
                        {transaction.books.map((book) => (
                          <div key={book._id}>
                            {book.title} : {book.quantity}
                          </div>
                        ))}
                      </td>
                      <td className="padded-right">{transaction.totalPrice}</td>
                      <td>{transaction.employeeName}</td>
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
