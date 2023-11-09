import React, { useState } from 'react'
import validation from './LoginValidation';
import Image from "next/image";





export default function LoginSignup(){
    const[values, setValues] = useState({
        username : "",
        password:""
    })

    const [errors,setErrors] = useState({})

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        console.log(value);
    };
    

    const handleLogin = async (event) => {
        event.preventDefault();
        setErrors(validation(values));
    
        try {
            const response = await fetch("http://localhost:8000/employee/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
    
            const result = await response.json();
    
            if (result === "success") {
                console.log("Success");
            } else {
                console.log(result);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    

    
    return(
        <section className="body bg-[url('/assets/bglogin.png')] relative h-[100vh] bg-cover 
        flex flex-col items-center justify-center h-screen">
            <div class="flex flex-col  items-center max-w-full bg-white rounded-lg p-14">
                <Image
                src={"/assets/logo.png"}
                width={150}
                height={100}
                alt="logo"
                />
                <h1 className="font-mplus text-center text-black text-[40px] font-bold leading-normal pb-7 pt-6 px-12">
                Masuk dengan Akun Terdaftar
                </h1>
                <div className="inputs flex flex-col gap-7 pb-2">
                    <div className="input flex items-center font-roboto font-normal">
                        <input
                        type="nama"
                        placeholder="Username"
                        onChange={handleInput}
                        name="username"
                        className="w-96 h-14 px-4 border border-gray-300 rounded-md bg-transparent "
                        />
                    </div>
                    <div className="input flex items-center">
                        <input
                        type="password"
                        placeholder="Kata Sandi"
                        onChange={handleInput}
                        name="password"
                        className="w-96 h-14 px-4 border border-gray-300 rounded-md bg-transparent"
                        />
                    </div>
                </div>
                <div className='pt-5'>
                    <button onClick={handleLogin} className="rounded-lg border bg-blue-700 text-white font-bold text-lg py-4 px-8">  
                    Masuk
                    </button>
                </div>
                <button className="self-start mt-auto text-black text-lg font-bold font-mplus-bold bg-transparent">
                &#60; Kembali
                </button>

            

            </div>
        </section>
    );
}