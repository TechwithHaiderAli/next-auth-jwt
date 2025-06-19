import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ConnectDB } from "@/db/db";
import User from "@/models/userModel";
import crypto from "crypto"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer";
export  async function POST(request:NextRequest){
     await ConnectDB();
        try {

            const requestBody=await request.json();
            console.log(requestBody);
            const {username,email,password}=requestBody;
            const user =await User.findOne({email})
            if(user){
                return NextResponse.json({
                    error:"User already exists in the Data Base",

                },{
                    status:400
                })
            }

            const salt =await bcryptjs.genSalt(10);
            const hashedpassword=await bcryptjs.hash(password,salt)
            const token = crypto.randomBytes(32).toString('hex')
                    console.log(token)
            const NewUser=new User({
                email,
                password:hashedpassword,
                username,
                VerifyToken:token,
                VerifyExpiry:new Date(Date.now()+3600*1000)
            })
            const savedUser=await NewUser.save();
            console.log(savedUser);
            await sendEmail(savedUser.email,token);
            return NextResponse.json({
                success:true,
                message:"User Created Successfully",
                savedUser
            })
            
        } catch (error:any) {
            return NextResponse.json({
                error:error.message,
            },{
                status:500
            })
        }
    }
