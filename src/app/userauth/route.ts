
import connectDB from "../db/connect";


import { NextRequest, NextResponse } from 'next/server';
import busadmin from "../adminmodel/admin"
const jwt= require ('jsonwebtoken')
export async function POST(req:NextRequest) {


    
    try {
        
        await connectDB();
        const body = await req.json();
      
     console.log(body)
     
     const admin= await busadmin.findOne({"usermail":body.Email})
 console.log(admin)
console.log(admin.usermail)
console.log("password",admin.Password)
var token = jwt.sign({ email: admin.usermail }, 'secret_key', { expiresIn: '1h' });
   if (admin&&body.password==admin.Password){
console.log("done")
        return Response.json( {
            status: 200, 
           
            body: { message: 'Success' },
            token:token
        });
    }
    else {
        return Response.json({
            status: 400,
           
            body: { message: 'Invalid credentials' }
        });
    }
    } catch (error) {
        console.error(error);
     
        return Response.json( {
            status: 400, // OK
            body: { message: "error" }
        });
    }
}


