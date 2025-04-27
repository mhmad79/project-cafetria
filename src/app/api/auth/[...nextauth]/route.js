import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
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
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};

        try {
          // محاولة الاتصال بـ MongoDB
          await mongoose.connect(process.env.MONGO_URL);
          
          // البحث عن المستخدم في قاعدة البيانات
          const user = await User.findOne({ email });

          if (!user) return null; // إذا لم يكن المستخدم موجودًا، أعد null

          // مقارنة كلمة السر
          const passwordOk = bcrypt.compareSync(password, user.password);

          // إذا كانت كلمة السر صحيحة، أعد المستخدم
          if (passwordOk) {
            return user;
          }

          return null; // إذا كانت كلمة السر خاطئة
        } catch (error) {
          console.error("Error in authorize:", error);
          return null; // في حالة حدوث أي خطأ، أعد null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
