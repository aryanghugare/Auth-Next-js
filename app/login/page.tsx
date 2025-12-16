"use client";
// because of "use client" we could use useState and useEffect here and also other react hooks
// here because of "use client" console.logs in the pages will be seen in the browser
//  all the console.log in the api will be available in the terminal  
// because of "use client" we could use useState and useEffect here and also other react hooks
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState , useEffect } from "react";
import toast from "react-hot-toast";

export default function LoginPage(){
const router = useRouter();
let [user , setUser]= useState({
email : "",
password : "",

});

const [buttonDisabled , setButtonDisabled] = useState(false);
const [loading ,setLoading] = useState(false);


const onLogin = async () => {

try {
setLoading(true);
    const response = await axios.post("/api/users/login", user);
    console.log("Sign in successful!!!", response.data);
router.push("/profile"); // progamatically pushing the user to the profile route


} catch (error : any) {
    console.log("Sign in failed!!!",error.message);
   toast.error(error.message);
}finally{ 
  setLoading(false);
}
} // This method will talk with the database 

useEffect(()=>{
if(user.email.length>0 && user.password.length > 0 ){
  setButtonDisabled(false);
}else{
  setButtonDisabled(true);
}

},[user])

return (
<div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 ">
  <h1 className="text-3xl m-7" >{loading ? "Processing" : "Sign in"} </h1>
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
{buttonDisabled ? "Fill all the above" : "Login"}
</button>

{/* Forgot password section */}
<div className="mt-2 text-sm">
  <Link href="/forgotpassword" className="text-red-600 hover:underline text">Forgot password?</Link>
</div>

<hr />
<h3>New here ?</h3>
<Link className="border-2 m-2 border-white px-8 rounded-lg" href="/signup">Sign up </Link>



</div>

)
}