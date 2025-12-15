import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';





export const sendEmail = async({email,emailType,userId}:any)=>{
try {
// we are considering the mail will be for either verification or reset password 
// a hashed token 
    const hashedToken = await bcryptjs.hash(userId.toString(),10);
if(emailType==="VERIFY"){
await User.findByIdAndUpdate(userId,
{
verifyToken : hashedToken ,
verifyTokenExpiry : Date.now() + 3600000
})
}
else if(emailType==="RESET"){
await User.findByIdAndUpdate(userId,
{
forgotPasswordToken : hashedToken ,
forgotPasswordTokenExpiry : Date.now() + 3600000
})

}

 const transporter = nodemailer.createTransport({
host : process.env.MAILTRAP_SMTP_HOST,
port : process.env.MAILTRAP_SMTP_PORT ,
auth : {
user : process.env.MAILTRAP_SMTP_USER,
pass : process.env.MAILTRAP_SMTP_PASSWORD
}
} as any)

const mailOptions = {
from : "aryanghugare75@gmail.com",
to : email ,
subject : emailType === "VERIFY" ? "Verification Email" : "Password Reset",
html : `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to 
${emailType === "VERIFY" ? "verify your email" : "reset your password"} 
or copy paste this link in your browser : <br>
${process.env.DOMAIN}/verifyemail?token=${hashedToken}
</p>`

}

const mailResponse = await transporter.sendMail(mailOptions);
return mailResponse ;

} catch (error : any) {
    throw new Error(error.message);
}

}
