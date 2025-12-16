import {connect} from '@/dbConfig/dbConfig'
import { NextResponse, NextRequest } from 'next/server'
 import User from '@/models/userModel'
import { sendEmailforPassword } from '@/helpers/mailerforPassword'


connect()

export async function POST(request: NextRequest){
try {
     const reqBody = await request.json();
    const { email , newPassword , confirmPassword } = reqBody;
const user = await User.findOne({ email });

if(!user){
    return NextResponse.json({error: "User not found"}, {status: 404});
}
console.log("Resetting password for user:", user);
await sendEmailforPassword({
email ,
emailType : "RESET",
userId : user._id
})

console.log("pass",user);


const data = {
message : "Password reset email sent successfully"
}

return NextResponse.json(data , {status : 200} )

} catch (error: any) {
    console.log("Error sending password reset email:", error.message);
    return NextResponse.json({ error: "Failed to send password reset email" }, { status: 500 });
}



}