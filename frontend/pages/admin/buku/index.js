import Image from "next/image";
import { useEffect, useState } from "react";
import NavbarAdmin from "@/components/NavbarAdmin";
import Button from "@/components/Button";
export default function Buku() {
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
                    <NavbarAdmin isActive={true} />
                    <div className="flex flex-col items-center ">
                        <h1 className="font-mplus font-medium text-[65px]">
                            Data Buku
                        </h1>
                        <div className="table-container mt-12 max-h-[60vh] overflow-hidden">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID Buku</th>
                                        <th>Judul Buku</th>
                                        <th>Pengarang</th>
                                        <th>Penerbit</th>
                                        <th>Tahun Terbit</th>
                                        <th>Genre</th>
                                        <th>Harga</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
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