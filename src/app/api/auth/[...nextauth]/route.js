import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../../../models/User";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../libs/mongodbConnect";

// وظيفة للاتصال بقاعدة البيانات
const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) return; 
  await mongoose.connect(process.env.MONGO_URL);
};

// إعدادات المصادقة
 const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials || {};
        if (!email || !password) return null;

        await connectToDatabase(); 

        try {
          const user = await User.findOne({ email });
          if (!user) return null;

          const passwordOk = bcrypt.compareSync(password, user.password);
          if (!passwordOk) return null;

          return user;
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};

// إنشاء المعالج
const handler = NextAuth(authOptions);

// تصدير المسارات المطلوبة لـ Next.js
export { handler as GET, handler as POST };