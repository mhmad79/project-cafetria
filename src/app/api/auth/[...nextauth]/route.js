import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth"
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { User } from "../../../models/User";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../libs/mongodbConnect";

export const authOptions = {
    secret: process.env.SECRET,
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          }),
        CredentialsProvider({
            name: "Credentials",
            id: 'credentials',
            credentials: {
            username: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      const email  = credentials?.email;
      const password  = credentials?.password;

      
       
    mongoose.connect(process.env.MONGO_URL);
    const user = await User.findOne({email});
    const passwordOk = user && bcrypt.compareSync(password, user.password)

        
 
    
      if (passwordOk) {
        return user
    } 
        // If you return null then an error will be displayed advising the user to check their details.
        return null
        
        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter

}
})
],
session: {
  strategy: 'jwt',
}
}


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }