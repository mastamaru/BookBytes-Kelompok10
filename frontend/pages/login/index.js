import React, { useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/router';




export default function LoginSignup(){
    const router = useRouter();
    const[values, setValues] = useState({
        username : "",
        password:""
    })

    const [msg,SetMSG] = useState()

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        console.log(value);
    };
    

    const handleLogin = async (event) => {
        event.preventDefault();
    
        try {
            const response = await fetch("http://localhost:8000/employee/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
    
            const result = await response.json();
    
            if (result === "Cashier" || result === "cashier") {
                console.log("Login Success");
                SetMSG();
                
                
            }
            else if (result === "admin" || result === "Admin") {
                console.log("admin");
                SetMSG();
                router.push("/admin/transaksi");

            }  
            else {
                SetMSG(result);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    

    
    return(
        <section className="body bg-[url('/assets/bglogin.png')] relative h-[100vh] bg-cover 
        flex flex-col items-center justify-center h-screen">
            <div class="flex flex-col  items-center max-w-full bg-white rounded-[25px] p-14">
                <Image
                src={"/assets/logo.png"}
                width={180}
                height={100}
                alt="logo"
                />
                <h1 className="font-mplus text-center text-black text-[40px] font-bold leading-normal pb-7 pt-6 px-10">
                Masuk dengan Akun Terdaftar
                </h1>
                <div className="inputs flex flex-col gap-7 pb-2">
                    <div className="input flex items-center font-roboto font-normal">
                        <input
                        type="nama"
                        placeholder="Username"
                        onChange={handleInput}
                        name="username"
                        className="w-96 h-14 px-4 border border-gray-300 rounded-md bg-transparent text-xl "
                        />
                    </div>
                    <div className="input flex items-center">
                        <input
                        type="password"
                        placeholder="Kata Sandi"
                        onChange={handleInput}
                        name="password"
                        className="w-96 h-14 px-4 border border-gray-300 rounded-md bg-transparent text-xl"
                        />
                    </div>
                </div>
                {msg && <span className="text-red-500 text-lg font-roboto ">{msg}</span>}
                <div className='pt-5'>
                    <button onClick={handleLogin} className="rounded-lg border bg-blue-700 text-white font-bold text-lg py-4 px-8">  
                    Masuk
                    </button>
                </div>
                <button className="self-start mt-auto text-black text-xl font-bold font-mplus-bold bg-transparent">
                &#60;  Kembali
                </button>

            

            </div>
        </section>
    );
}