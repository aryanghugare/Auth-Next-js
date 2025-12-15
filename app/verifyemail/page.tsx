"use client"

import axios from "axios";
import Link from "next/link";
import React , { useEffect , useState } from "react";

export default function VerifyEmailPage(){
const[token , setToken] = useState("");
const [verified , setVerified] = useState(false);
const [error , setError] = useState(false);

const verifyUserEmail = async () => {
try {
   await axios.post("/api/users/verifyemail" , {token});
   setVerified(true);

} catch (error : any) {
    setError(true);
    console.log("Email verification failed!!!",error.response.data);
}

}

useEffect(()=>{
// extracting the token from the url
const urlToken = window.location.search.split("=")[1];
setToken(urlToken || "");
},[])


useEffect(()=>{
if(token.length > 0){
verifyUserEmail();
}

},[token])


return (

<div className="flex flex-col items-center justify-center min-h-screen py-2 text-center">
<h1 className="text-4xl"> Verify Email</h1>

<h2 className="p-2 bg-orange-300 text-black  ">{token ? `Token: ${token}` : "no token found"}</h2>
{
verified && (<h2 className="text-green-600 text-2xl"> Email verified successfully! You can now <Link href="/login" className="underline"> login </Link> </h2>)
}
{error && (<h2 className="text-red-600 text-2xl"> Email verification failed! The token may be invalid or expired. </h2>)
}

  </div>


)

}

