"use client"

import axios from "axios";
import Link from "next/link";
import React , { useEffect , useState } from "react";
import { useRouter } from "next/navigation";

 export default  function ForgotPasswordConfPage() {
const[newPassword, setNewPassword] = useState("");
const[confirmPassword, setConfirmPassword] = useState("");
const[token , setToken] = useState("");
const [verified , setVerified] = useState(false);
const [error , setError] = useState(false);
const router = useRouter();
const [errorMessage , setErrorMessage] = useState("");

// verifying the token from the url
const verifyPassword = async ()=> {
try {
   await axios.post("/api/users/forgotpasswordconf" , {token});
   setVerified(true);


} catch (error : any) {
    setError(true);
    console.log("Email verification failed!!!",error.response.data);
}
}
// saving the new password to the database
const saveNewPassword = async ()=>{
try {
if(newPassword !== confirmPassword){
setErrorMessage("Passwords do not match");
return ;
}
 let data =  await axios.post("/api/users/savePassword" , {newPassword,token});
if(data) console.log("Password reset successful");
setNewPassword("");
setConfirmPassword("");
router.push("/login");
} catch (error : any) {
  console.log("Password reset failed!!!",error.message);
}

}

useEffect(()=>{
// extracting the token from the url
const urlToken = window.location.search.split("=")[1];
setToken(urlToken || "");
},[])


useEffect(()=>{
if(token.length > 0){
verifyPassword();
}

},[token])



  return (

   <div className="flex flex-col items-center justify-center min-h-screen py-2 text-center">
<h1 className="text-4xl"> Verify Email</h1>

<h2 className="p-2 bg-orange-300 text-black  ">{token ? `Token: ${token}` : "no token found"}</h2>
{
verified && (

<div>
<h2 className="text-green-600 text-2xl"> Email verified successfully! You can now reset your password  </h2>
  <label htmlFor="new-password" className="block text-sm font-medium text-neutral-300 mt-3">New Password</label>
       <input
         type="password"
         id="new-password"
         value={newPassword}
         onChange={(e) => setNewPassword(e.target.value)}
         className="w-full mt-2 p-2 rounded-md bg-white/6 text-white placeholder:text-white/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400"
       />

       <label htmlFor="confirm-password" className="block text-sm font-medium text-neutral-300 mt-3">Confirm Password</label>
       <input
         type="password"
         id="confirm-password"
         value={confirmPassword}
         onChange={(e) => setConfirmPassword(e.target.value)}
         className="w-full mt-2 p-2 rounded-md bg-white/6 text-white placeholder:text-white/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400"
       />
        <button onClick={saveNewPassword} className="mt-5 w-full px-4 py-2 rounded-lg bg-amber-700 text-black font-semibold hover:bg-amber-600">Reset password</button>
{ errorMessage && <div className="mt-4 text-red-500 text-center">{errorMessage}</div>}
</div>



)


}
{error && (<h2 className="text-red-600 text-2xl"> Email verification failed! The token may be invalid or expired. </h2>)
}

  </div>


  )
}


