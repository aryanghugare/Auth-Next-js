"use client";

import axios from "axios";
import Link from "next/link";
import React , { useEffect , useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function ForgotPasswordPage(){
const[newPassword, setNewPassword] = useState("");
const[confirmPassword, setConfirmPassword] = useState("");
const[emailSent, setEmailSent] = useState("");
const [error, setError] = useState("");
const[passwordEmailSent, setPasswordEmailSent] = useState(false);

const router = useRouter();

 const resetPassword = async ()=>{
 try {
setError("");
 if(confirmPassword !== newPassword) {
 console.log("Passwords do not match");
setError("Passwords do not match");
 return;
 }
  await axios.post("/api/users/forgotpassword" , {email : emailSent , newPassword , confirmPassword});
setPasswordEmailSent(true);
setNewPassword("")
setConfirmPassword("")
setEmailSent("")
  
 
 
 } catch (error:any) {
 console.log("Reset password failed!!!",error.message);
 setError(error.message);
 }
 
 }

 
 return (
   <div className="min-h-screen flex items-center justify-center  px-4 py-12">
     <div className="w-full max-w-md bg-white/5 backdrop-blur-sm border border-white/6 rounded-2xl shadow-lg p-6">
       <h1 className="text-2xl font-semibold text-white mb-4 text-center">Reset Password</h1>

       
       <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mt-3">Email</label>
       <input
         type="email"
         id="email"
         value={emailSent}
         onChange={(e) => setEmailSent(e.target.value)}
         className="w-full mt-2 p-2 rounded-md bg-white/6 text-white placeholder:text-white/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400"
       />

       <button onClick={resetPassword}  className="mt-5 w-full px-4 py-2 rounded-lg bg-amber-700 text-black font-semibold hover:bg-amber-600">Reset password</button>

         {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
{passwordEmailSent && (<p className="mt-4 text-green-500 text-center">Password reset email sent successfully!</p>)}

     </div>

   </div>
 );



}
