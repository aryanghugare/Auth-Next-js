import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


connect();
// So here we can handle both request and response , but I am right now only handling the request 
// As for signup , POST request make sense thats why the post request here 
export async function POST(request : NextRequest){

try {
    const reqBody = await request.json();
let {username , password , email} = reqBody ;


if ([username, email, password].some((field) => field?.trim() === "") // .some() is the array method 
) {
   return  NextResponse.json({error : "Enter All the fields"},{status : 402})
    }


const user = await User.findOne({email})

if(user) return NextResponse.json({error : "User Already Exists!!"},{status:405})


// Handling the spaces 
password = password.trim();
username = username.trim();
email = email.trim();


// hash password 
const salt = await bcryptjs.genSalt(10);
const hashedPassword = await bcryptjs.hash(password,salt);


const newUser = new User({
username ,
email ,
password : hashedPassword 

})

const savedUser = await newUser.save();
console.log(savedUser)

// Here we can also create the new user by the method User.create()
/* const createdUser = await User.create({
 username ,
 email ,
 password : hashedPassword 
// */

return NextResponse.json({
message : "User created successfully!!!",
success : true,
savedUser 
})


} 
catch (error:any) {
return NextResponse.json({error : error.message },
{ status : 500}
)
    
}
}

// Here similarly we can handle other requests like GET , DELETE etc 
// Ex: async function GET(request : NextRequest){} etc


