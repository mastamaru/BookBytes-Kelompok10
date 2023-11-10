import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchEmployees } from "@/lib/getEmployee";
import moment from "moment";
import "moment-timezone";
import NavbarAdmin from "@/components/NavbarAdmin";
import Button from "@/components/Button";
import { data } from "autoprefixer";
export default function Kasir() {
  const [employees, setTransactions] = useState([]);

  useEffect(() => {
    const getTransaction = async () => {
      try {
        const data = await fetchEmployees();
        console.log("Fetched Transactions:", data); // Menampilkan data ke console
        setTransactions(data);
      } catch (error) {
        console.error(error);
      }
    };

    getTransaction(); // Memanggil fungsi getTransaction saat komponen dimuat
  }, []); // Menambahkan array kosong sebagai dependency agar useEffect hanya berjalan sekali saat komponen dimuat

  return (
    <>
      <section className="body">
        <Image
          src={"/assets/logo.png"}
          width={250}
          height={100}
          className="absolute left-[8.5%] top-[10%]"
          alt="logo"
        />
        <div className="flex flex-row items-end gap-10 absolute top-[0] left-[35%] leading-normal font-mplus font-bold text-[35px]">
            <div
                className="rounded-[15px] px-[92px] py-6 bg-[#FBB91C] mx-auto"
                alt="transaksi"
            >
                Transaksi
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
                  </tr>
                </thead>
                <tbody>
                  
                </tbody>
              </table>
            </div>
          </div>
        </div> 
        <div className="flex flex-row items-end gap-6 absolute top-[11%] left-[67.5%] leading-normal font-mplus font-bold text-[35px]">
            <h1>
                Kasir:
            </h1>
            <h1 className="text-[#1820EF]">
                {employees.map((employee) => (
                    <span key={employee.id}>{employee.name}</span>
                ))}
            </h1>
            <Button
                icon={"/assets/signout.svg"}
                text={"Keluar"}
                color="red"
                className="flex py-1 px-5 text-sm items-center relative top-[-10px]"
            />
        </div> 
      </section>
    </>
  );
}
