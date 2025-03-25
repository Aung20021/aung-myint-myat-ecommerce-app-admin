// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "../../../lib/mongodb"; // Ensure correct path
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
});
