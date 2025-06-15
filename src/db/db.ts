import mongoose from "mongoose";

export async function ConnectDB(){

    try {
       await mongoose.connect(process.env.MONGO_DB_URI!)
       const connection=mongoose.connection
       connection.on("connected",()=>{
        console.log("DataBase Connected Successfully",connection);
       })
        connection.on("error",(error)=>{
        console.log("DataBase Connection Failed",error);
       })
       process.exit()
        
    } catch (error) {
        console.log("Database ConnectioN Failed", error );

               
    }
}