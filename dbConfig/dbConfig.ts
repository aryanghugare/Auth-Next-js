import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config()

export async function connect(){
try {
 await mongoose.connect(process.env.MONGODB_URL!)
const connection = mongoose.connection;

connection.on('connected',()=>{

console.log("MongoDb Connected Successfully!!!")
})

connection.on('error',(err)=>{
console.log("There was an error while connecting to the database!!!! "+err)
process.exit();

})

    
} catch (error) {
    console.log("There was an error while connecting to the database!!!!")
console.log(error)
}

}