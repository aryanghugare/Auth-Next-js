"use client";
import React from 'react'
import axios from 'axios';
import { useState , useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ProfilePage() {
const router = useRouter();
const [loading , setLoading] = useState(false);
const [data,setData] = useState("nothing");
const [info , setInfo] = useState({
username : "",
email:"",
isVerfied : ""
});

const handleLogout = async () => {
try {
setLoading(true)
const response = await axios.get("/api/users/logout");
console.log("Logout response ", response.data);
router.push("/login");
} catch (error:any) {
  console.log("Signup failed!!!",error.message);
   toast.error(error.message);

}finally{
setLoading(false)
}
}

const getUserDetails = async () =>{
const res = await axios.get('/api/users/me')
console.log(res.data)
setData(res.data.data._id) // extracting the user_id 

}


// This is my method of injecting the data coming from the 'me' route 
// This is the wrong way , useEffect is the right one 
/*
let details : any = {

}
// This details comes from the me route api
const getUserDetails = async () =>{

  details = await axios.get("api/users/me")

document.querySelector('.details-box')!.innerHTML = 
` 
<h2>Username: ${details.data.data.username}</h2>
<h2>Email: ${details.data.data.email}</h2>
<h2> Verification : ${details.data.data.verified ? "Verified" : "Not Verified"}</h2>`;

}
*/


useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get('/api/users/me');
      setInfo(res.data.data);
      console.log(res.data.data); // log the fetched data, not the stale state
    } catch (err) {
      console.error(err);
    }
  };
  fetchUser();
}, []);


  return (
    <div className='flex flex-col min-h-screen items-center justify-center px-4 py-12 '>

        <h1 className='text-3xl m-7 text-center'>Profile Page</h1>
    <hr />
        <p className='text-center'>Welcome to your profile!</p>
<h2>{data === "nothing" ? "Nothing" :<Link href={`/profile/${data}`}> {data}</Link> }</h2>

<hr />
<button className='bg-blue-500 text-white px-4 py-2 rounded m-6' onClick={getUserDetails} > User Details</button>
<div className='details-box'>

</div>

<div className='Info'>
<div className="w-full max-w-md bg-white/5 backdrop-blur-sm border border-white/6 rounded-2xl shadow-lg p-6 mt-4 text-left">
 <p className="text-xs text-neutral-400">Username</p>
 <p className="text-lg font-semibold text-white">{info?.username}</p> 
<p className="mt-4 text-xs text-neutral-400">Email</p> 
<p className="text-lg font-medium text-white">{info?.email ?? "—"}</p> 
<p className="mt-4 text-xs text-neutral-400">Verified</p> 
<p className="text-sm font-medium text-amber-300">{info?.isVerfied ? "Yes" : "No"}</p> </div>

</div>

  <button className='bg-red-500 text-white px-4 py-2 rounded m-6' onClick={handleLogout}>
{loading ? "logging out...": "logout"}
</button>

 




</div>
  )
}

 