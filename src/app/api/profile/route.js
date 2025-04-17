import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { User } from "../../models/User";
import { authOptions } from "../auth/[...nextauth]/route";

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);    
    const data = await req.json();
    const {_id, name, image, ...otherUserInfo} = data;

    let filter = {}; 

    if(_id) {
        filter = {_id};
    } else {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;
        filter = {email};
    }

    await User.updateOne(filter, {
        name: data.name,
        image: data.image,
        phone: data.phone , 
        admin: data.admin  
    }); 
        
    return Response.json(true);
}


export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
    const session = await getServerSession(authOptions)
    const email = session?.user?.email;
    if(!email) {
        return Response.json({})
    }
    return Response.json(
        await User.findOne({email})
    )

}