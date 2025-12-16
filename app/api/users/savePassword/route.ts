import {connect} from '@/dbConfig/dbConfig'
import { NextResponse, NextRequest } from 'next/server'
 import User from '@/models/userModel'
import bcryptjs from "bcryptjs";

connect()

export async function POST(request: NextRequest){
try {
    
    const reqBody = await request.json();
    let { newPassword , token } = reqBody;
newPassword = newPassword.trim();
const user = await User.findOne({forgotPasswordToken : token,
forgotPasswordTokenExpiry : { $gt : Date.now() } // checking the token expiry

})
if(!user){ 
return NextResponse.json({error: "User not found"}, {status: 404});
 }
console.log(newPassword , "New password received");

const salt = await bcryptjs.genSalt(10);
const hashedPassword = await bcryptjs.hash(newPassword,salt);

user.password = hashedPassword;
user.forgotPasswordToken = undefined;
user.forgotPasswordTokenExpiry = undefined;
await user.save();
return NextResponse.json({message: "Password updated successfully"}, {status: 200});

} catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 400});
    
}


}