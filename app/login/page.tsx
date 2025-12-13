"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { Axios } from "axios";
import { useState } from "react";

export default function LoginPage(){
let [user , setUser]= useState({
email : "",
password : "",

});

const onLogin = async () => {

} // This method will talk with the database 

return (
<div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 ">
  <h1 className="text-3xl m-7" >Login </h1>
<hr />



<label htmlFor="email"> Email</label>
<input
 type="text"
 id='email' 
className=" border-2 border-white p-1 rounded-lg text-center  "
value={user.email}
onChange={(e)=> setUser({...user,email : e.target.value})}
placeholder="Email"
/>


<label htmlFor="password"> Password</label>
<input
 type="password"
 id='password' 
className=" border-2 border-white p-1 rounded-lg text-center  "
value={user.password}
onChange={(e)=> setUser({...user,password : e.target.value})}
placeholder="Password"
/>
<button
className="m-4 px-5 py-2 rounded-xl bg-blue-800 text-white font-semibold shadow-md hover:bg-amber-600 active:scale-95 transform transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none   "
onClick={onLogin}

>
Login
</button>
<hr />
<h3>New here ?</h3>
<Link className="border-2 m-2 border-white px-8 rounded-lg" href="/signup">Sign up </Link>



</div>

)
}