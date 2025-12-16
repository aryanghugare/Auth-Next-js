import {connect} from '@/dbConfig/dbConfig'
import { NextResponse, NextRequest } from 'next/server'
 import User from '@/models/userModel'



connect()


export async function POST(request: NextRequest){
try {
    const reqBody = await request.json();
// This is because , there will be frontend call to this api with the token
    const { token } = reqBody;
// console.log(token);

const user =  await User.findOne({
forgotPasswordToken : token,
forgotPasswordTokenExpiry : { $gt : Date.now() } // checking the token expiry

})

if(!user){
    return NextResponse.json({error: "Invalid or expired token"}, {status: 400});
}





await user.save();
// await user.save({validateBeforeSave : false}) // we can also use this to skip the validation

return NextResponse.json({
    message : "Password reset successfully",
    success : true,
})

     
    
} catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 400});
}

}
