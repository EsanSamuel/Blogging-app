import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
  }
}

export interface ISignIn {
  user: User | AdapterUser;
  account: Account | null;
  profile: Profile;
  email?: {
    verificationRequest?: boolean;
  };
  credentials?: Record<string, any>;
}

export interface IUser {
  user: User | AdapterUser;
}
