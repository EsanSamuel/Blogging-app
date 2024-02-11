import { AuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Users from "@/models/user.model";
import { AdapterUser } from "next-auth/adapters";
import connectDB from "./connect";

type IUser = {
  user: User | AdapterUser;
};

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const userSession = await Users.findOne({ email: session.user.email });
      session.user.id = userSession._id.toString();
      return session;
    },
    async signIn({ user }: IUser): Promise<boolean> {
      try {
        await connectDB();
        const userExists = await Users.findOne({ email: user.email });

        if (!userExists) {
          await Users.create({
            username: user.name,
            email: user.email,
            image: user.image,
          });
        }

        console.log("Sign in successful!");
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
