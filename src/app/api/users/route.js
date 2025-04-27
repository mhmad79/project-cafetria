import { User } from "../../models/User";
import mongoose from "mongoose";

export  async function GET() {
  mongoose.connect(process.env.DATABASE_URL);
    const users = await User.find();        
    return Response.json(users);
}