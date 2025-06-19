import { NextRequest,NextResponse } from "next/server";


export const config={
    matcher:['/','/login','/signup','/profile']
}
export function middleware(request:NextRequest){

    const path=request.nextUrl.pathname;

    const isPublicPath=path==="/login" || path==="/signup"

    const token=request.cookies.get('token')?.value || ""

    if(isPublicPath && token){
        return NextResponse.redirect(new URL("/",request.url))

    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL("/login",request.url))
    }

    NextResponse.next()
}


