import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchEmployees } from "@/lib/FunctionEmployee";
import { useRouter } from "next/router";
import moment from "moment";
import "moment-timezone";
import AddRowModal from "@/lib/addRowModal";
import NavbarAdmin from "@/components/NavbarAdmin";
import Button from "@/components/Button";
import { fetchTransactions } from "@/lib/getTransaction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteRowModal from "@/lib/delRowModal";

export default function Kasir() {
  const [employees, setEmployees] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const router = useRouter();
  var ind;

  useEffect(() => {
    // Add token validation to check the user session
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const isTokenValid = () => {
      setUserName(username);
      return token != null;
    };

    if (!isTokenValid()) {
      router.push("/login");
    }
  }, []);

  const [rows, setRows] = useState([]);

  const handleAddRow = (newRow) => {
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteRow = (index) => {
    ind = index;
    try {
      // Perform the deletion logic here, using the provided index
      const updatedRows = [...rows];
      updatedRows.splice(index, 1); // Remove the row at the specified index
      setRows(updatedRows);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting row", error);
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
                text={"> Bayar"}
                className="py-2 px-4 text-[24px] items-center relative top-[100px] left-[75%]"
              />
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
          <h1>Kasir:</h1>
          <h1 className="text-[#1820EF]">
            {username}
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
