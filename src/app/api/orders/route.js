import { getServerSession } from "next-auth/next";
import { authOptions } from '../auth/[...nextauth]/route'
import mongoose from "mongoose";
import { Order } from "../../models/Order";
import isAdmin from '../../libs/isAdmin'

export async function GET(req) {
    mongoose.connect(process.env.DATABASE_URL);
  
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    let admin =  isAdmin;
  
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    if (_id) {
      return Response.json( await Order.findById(_id) );
    }
  
  
    if (admin) {
      return Response.json( await Order.find() );
    }
  
    if (userEmail) {
      return Response.json( await Order.find({userEmail}) );
    }
  
  }