import React from 'react'


export default async function UserProfilePage({params}: any ) {
 const { id } = await params
  return (
    <div className='flex flex-col min-h-screen items-center justify-center px-4 py-12 '>

        <h1 className='text-3xl m-7 text-center'>Profile Page</h1>
    <hr />
        <span className='text-center'>Welcome to your profile!</span>
<span className='text-center flex  '>Your ID is : {id}</span>


</div>
  )
}

 