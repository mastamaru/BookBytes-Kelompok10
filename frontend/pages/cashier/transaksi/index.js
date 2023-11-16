import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchEmployees } from "@/lib/FunctionEmployee";
import { useRouter } from "next/router";
import moment from "moment";
import "moment-timezone";
import AddRowModal from "@/lib/addRowModal";
import NavbarAdmin from "@/components/NavbarAdmin";
import Button from "@/components/Button";
import { data } from "autoprefixer";
import { fetchTransactions } from "@/lib/getTransaction";
export default function Kasir() {
  const [employees, setTransactions] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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
        const data = await fetchEmployees();
        console.log("Fetched Transactions:", data);
        setTransactions(data);
      } catch (error) {
        console.error(error);
      }
    };

    getTransaction();
  }, []);

  const [rows, setRows] = useState([]);

  const handleAddRow = (newRow) => {
    setRows([...rows, newRow]);
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
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <td>{row.idTransaction}</td>
                      <td>{row.title}</td>
                      <td>{row.quantity}</td>
                      <td>{row.price}</td>
                      <td>{row.quantity * row.price}</td>
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
                onAddRow={handleAddRow}
                onClose={() => setIsAddModalOpen(false)}
              />
              <Button
                color={"green"}
                text={"> Bayar"}
                className="py-2 px-4 text-[24px] items-center relative top-[100px] left-[75%]"
              />
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
              onClick={handleLogout}
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
