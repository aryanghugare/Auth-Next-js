import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

connect()

export async function GET(){
try {
   const response = NextResponse.json(
{
    message : "Logout Successful",
    success : true
}) 

// Clear the token cookie , as the response is instance from NextResponse
response.cookies.set("token", "", {httpOnly : true, secure : true , expires : new Date(0) })

return response;
} catch (error:any) {
  return NextResponse.json({error : "Logout failed!!!"}, {status : 500});
}
}