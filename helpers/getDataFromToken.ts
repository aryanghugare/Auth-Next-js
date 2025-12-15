import { NextRequest,NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// returns the user id from the token
export function getDataFromToken(request: NextRequest){
try {
    const encodedToken = request.cookies.get('token')?.value || "";
    const decodedToken : any = jwt.verify(encodedToken, process.env.TOKEN_SECRET!);
  return decodedToken.id;


} catch (error :any) {
    throw new Error(error.message);
}

}