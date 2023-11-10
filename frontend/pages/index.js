import Image from "next/image";
import { useEffect, useState } from "react";
import NavbarAdmin from "@/components/NavbarAdmin";
import Button from "@/components/Button";
import Link from "next/link";
export default function () {
  return (
    <>
      <section className="body bg-[url('/assets/bgwelcome.png')] relative h-[100vh] bg-cover">
        <Image
          src={"/assets/logo.png"}
          width={250}
          height={100}
          className="absolute left-[3%] top-[20%]"
          alt="logo"
        />
        <div className="pt-[260px] relative ml-10">
          <div className="flex flex-col items-left ">
            <h1
              className="font-mplus font-bold text-[65px]"
              style={{ lineHeight: "1.2" }}
            >
              Kelola Toko Bukumu <br />
              Sekarang!
            </h1>
          </div>
          <div className="pt-[50px] relative ml-2">
            <Link href="/login">
              <Button
                text="Masuk"
                onClick={() => console.log("Button Clicked")}
                className="mt-4 px-10 py-50 text-[35px] bg-yellow-500 text-black rounded-md"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
