import { NextResponse } from "next/server";

export  async function GET(){
    try {
        
        const response=NextResponse.json({
            message:"Logout out Succesfully",
            success:true
        })
        response.cookies.set("token","",{
            httpOnly:true
        })

        return response

    } catch (error:any) {
        return NextResponse.json({
            error:error.message
        })
    }
}