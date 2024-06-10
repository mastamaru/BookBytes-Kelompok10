import { useEffect, useState } from "react"
import Image from "next/image";
import Head from "next/head";
import Button from "../../../components/Button";
import { fetchBooks } from "@/lib/getBookUser";
import { useRouter } from "next/router";

export default function Katalog(){
  const [books, setBooks] = useState([]);
  const router = useRouter();

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

    const getBook = async () => {
      try {
        const data = await fetchBooks();
        console.log("Fetched Books:", data);
        setBooks(data);
      } catch (error) {
        console.error(error);
      }
    };

    getBook();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    router.push("/login");
  }

  console.log(books)

      return (
        <>
      <Head>
        <title>BookBytes - Katalog</title>
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
            Katalog
          </div>
        </div>
        <div className="pt-[200px] relative">
          <div className="flex flex-col items-center ">
            <div className="table-container mt-12">
              
            <div className="grid grid-cols-5  gap-4">
              {books.length > 0 ? (
                books.map(book => 
                <div className="p-2 w-fit bg-orange-300 rounded-md font-mplus font-medium hover:bg-orange-400 hover:translate-x-1 hover:translate-y-1" key={book.id}>{book.title}
                  <div className="w-full overflow-hidden justify-center items-center flex rounded-md"> 
                    <Image
                      src={book.imgUrl}
                      width={200}
                      height={200}
                      alt="book"
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div>Stock: {book.stock}</div>
                    <Button
                      text={"Beli"}
                      color="blue"
                      className="flex py-1 px-5 text-sm items-center hover:opacity-60"
                    />
                  </div>
                </div>)
              ) : (
                <div>No books available</div>
              )}
            </div>
    
            </div>
          </div>
        </div>
        
        <div className="flex flex-row items-end gap-6 absolute top-[11%] left-[67.5%] leading-normal font-mplus font-bold text-[35px]">
          <Button
            onClick={() => router.push('/user/keranjang')}
            text={"Keranjang"}
            color="blue"
            className="flex py-1 px-5 text-sm items-center relative top-[-10px]"
          />
          <Button
            onClick={() => router.push('/user/historypesanan')}
            text={"History Pesanan"}
            color="blue"
            className="flex py-1 px-5 text-sm items-center relative top-[-10px]"
          />
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
  )
}