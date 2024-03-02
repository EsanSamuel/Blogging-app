"use client";
import { useSession } from "next-auth/react";
import useRoutes from "@/hooks/useRoutes";
import useUsers from "@/hooks/useUsers";
import React from "react";
import useBlogs from "@/hooks/useBlogs";

export type TProps = {
  users: {
    _id: string;
    username: string;
    image: string;
    email: string;
    createdAt: any;
    nickname?: string;
    jobtype?:
      | "Frontend developer"
      | "UI/UX designer"
      | "Backend developer"
      | "Software engineer"
      | "Cyber Security expert";
    bio?: string;
  }[];
  user: {
    _id: string;
    username: string;
    image: string;
    email: string;
    createdAt: any;
    nickname?: string;
    jobtype?:
      | "Frontend developer"
      | "UI/UX designer"
      | "Backend developer"
      | "Software engineer"
      | "Cyber Security expert";
    bio?: string;
  };
  blogs: {
    author: {
      _id: string;
      username: string;
      image: string;
      email: string;
      createdAt: any;
      nickname?: string;
      jobtype?:
        | "Frontend developer"
        | "UI/UX designer"
        | "Backend developer"
        | "Software engineer"
        | "Cyber Security expert";
      bio?: string;
    };
    _id: string;
    title: string;
    image: string;
    firstParagraph: string;
    firstContent: string;
    secondParagraph: string;
    secondContent: string;
    thirdParagraph: string;
    thirdContent: string;
    createdAt: any;
    category:
      | "Web development"
      | "Mobile development"
      | "AI & ML"
      | "Data science"
      | "Blockchain";
    theme: "Light" | "Dark";
  }[];
  userBlogs: {
    author: {
      _id: string;
      username: string;
      image: string;
      email: string;
      createdAt: any;
      nickname?: string;
      jobtype?:
        | "Frontend developer"
        | "UI/UX designer"
        | "Backend developer"
        | "Software engineer"
        | "Cyber Security expert";
      bio?: string;
    };
    _id: string;
    title: string;
    image: string;
    firstParagraph: string;
    firstContent: string;
    secondParagraph: string;
    secondContent: string;
    thirdParagraph: string;
    thirdContent: string;
    createdAt: any;
    category:
      | "Web development"
      | "Mobile development"
      | "AI & ML"
      | "Data science"
      | "Blockchain";
    theme: "Light" | "Dark";
  }[];
};

export const ApiContext = React.createContext<TProps | null>(null);

const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const { data: users = [], isLoading } = useRoutes(
    `/api/users/${session?.user?.id}`
  );
  if (isLoading) {
    console.log("loading users...");
  }
  const { data: user, isLoading: loadingUser } = useRoutes(
    `api/user/${session?.user?.id}`
  );
  if (loadingUser) {
    console.log("loading user...");
  }
  const { data: blogs = [], isLoading: loadingBlogs } = useBlogs();
  if (loadingBlogs) {
    console.log("loading blogs...");
  }
  const { data: userBlogs = [], isLoading: loadingUserBlogs } = useRoutes(
    `/api/userblog/${session?.user?.id}`
  );
  if (loadingUserBlogs) {
    console.log("loading user blogs...");
  }

  return (
    <ApiContext.Provider value={{ users, user, blogs, userBlogs }}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
