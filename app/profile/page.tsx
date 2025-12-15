"use client";
import React from 'react'
import axios from 'axios';
import { useState , useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ProfilePage() {
const router = useRouter();
const [loading , setLoading] = useState(false);


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

  return (
    <div className='flex flex-col min-h-screen items-center justify-center px-4 py-12 '>

        <h1 className='text-3xl m-7 text-center'>Profile Page</h1>
    <hr />
        <p className='text-center'>Welcome to your profile!</p>

<hr />


  <button className='bg-red-500 text-white px-4 py-2 rounded m-6' onClick={handleLogout}>
{loading ? "logging out...": "logout"}
</button>

</div>
  )
}

 