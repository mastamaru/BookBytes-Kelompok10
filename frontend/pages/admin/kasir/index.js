import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchEmployees } from "@/lib/getEmployee"; // Make sure to create the fetchEmployees function
import NavbarAdmin from "@/components/NavbarAdmin";
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Karyawan() {
  const [employees, setEmployees] = useState([]);
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

    const getEmployees = async () => {
      try {
        const data = await fetchEmployees();
        console.log("Fetched Employees:", data);
        setEmployees(data);
        console.log(employees);
      } catch (error) {
        console.error(error);
      }
    };

    getEmployees();
  }, []);

  return (
    <>
      <section className="body bg-[url('/assets/bgbookopen.png')] relative h-[100vh] bg-cover">
        <Image
          src="/assets/logo.png"
          width={250}
          height={100}
          className="absolute left-[2.5%] top-[3%]"
          alt="logo"
        />
        <div className="pt-[260px] relative">
          <NavbarAdmin
            selectedLabel="Data Kasir"
            className="top-[7.2%] left-[22%]"
          />
          <div className="w-[1200px] mx-auto">
            <div className="flex flex-col items-center">
              <h1 className="font-mplus font-bold text-[65px] pt-3 pb-10">
                Data Karyawan
              </h1>
              <Button
                text="+ Tambah Karyawan"
                color="blue"
                className="py-2 px-4 text-[24px] mr-auto ml-[100px]"
              />

              <div
                className="table-container mt-5 max-h-[60vh] overflow-auto"
                style={{ maxWidth: "1100px", marginLeft: "100px" }}
              >
                <table style={{ tableLayout: "fixed", width: "100%" }}>
                  <colgroup>
                    <col style={{ width: "10%" }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th style={{ fontSize: "16px" }}>ID Karyawan</th>
                      <th style={{ fontSize: "16px" }}>Nama</th>
                      <th style={{ fontSize: "16px" }}>Role</th>
                      <th style={{ fontSize: "16px" }}>Username</th>
                      <th style={{ fontSize: "16px" }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.role}</td>
                        <td>{employee.username}</td>
                        <td
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <button
                            onClick={() => handleEditEmployee(employee.id)}
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              style={{ color: "blue" }}
                            />
                          </button>
                          <button
                            onClick={() => handleDeleteEmployee(employee.id)}
                          >
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
        </div>
        <Button
          icon="/assets/signout.svg"
          text="Keluar"
          color="red"
          className="flex py-[15px] px-5 text-[24px] items-center gap-2 absolute bottom-[5%] left-[1%]"
        />
      </section>
    </>
  );
}
