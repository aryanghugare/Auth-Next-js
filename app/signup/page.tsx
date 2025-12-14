"use client";
// here because of "use client" console.logs in the pages will be seen in the browser
//  all the console.log in the api will be available in the terminal  
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import toast, { Toast } from "react-hot-toast";
// Once the user completes the signup , then the user will be pushed to the login page 
export default function SignUpPage(){
const router = useRouter();
let [user , setUser]= useState({
email : "",
password : "",
username : "",
});
const [buttonDisabled , setButtonDisabled] = useState(false);
const [loading ,setLoading] = useState(false);

const onSignup = async () => {
try {
    setLoading(true);
const response =  await axios.post("/api/users/signup" , user) 
console.log("Signup success" , response.data)
router.push("/login") // progamatically pushing the user to the login route 



} catch (error : any) {
console.log("Signup failed!!!",error.message);
   toast.error(error.message);
}finally{
setLoading(false);
}

} // This method will talk with the database 

useEffect(()=>{
if(user.email.length>0 && user.password.length > 0 && user.username.length>0){
setButtonDisabled(false);
}
else setButtonDisabled(true);

},[user])

return (
<div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 ">
  <h1 className="text-3xl m-7" >{loading ? "Processing" : "Signup"}</h1>
<hr />


<label htmlFor="username"> Username</label>
<input
 type="text"
 id='username' 
className=" border-2 border-white p-1 rounded-lg text-center  "
value={user.username}
onChange={(e)=> setUser({...user,username : e.target.value})}
placeholder="Username"
/>

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
onClick={onSignup}

>
{buttonDisabled ? "Fill all the above" : "Signup"} {/* This is used to ensure that the user fills all the info required  */}
</button>
<hr />
<h3>Already a user ?</h3>
<Link className="border-2 m-2 border-white px-8 rounded-lg" href="/login">Login</Link>



</div>

)
}