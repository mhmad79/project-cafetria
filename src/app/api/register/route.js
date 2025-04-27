import mongoose from "mongoose";
import { User } from '../../models/User';
import bcrypt from 'bcrypt'

    export async function POST(req) {

        const body = await req.json();
        mongoose.connect(process.env.DATABASE_URL);
        const pass = body.password;
        if (!pass.length || pass.length < 5 ) {
            new Error('password must be least 5 characters')
        }

        const notHashdPassword = pass;
        const salt = bcrypt.genSaltSync(10);
        body.password = bcrypt.hashSync(notHashdPassword, salt);

        const crateUser = await User.create(body)
        return  Response.json(crateUser)

    }