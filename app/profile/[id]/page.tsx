"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import useRoutes from "@/hooks/useRoutes";

type Params = {
  params: {
    id: string;
  };
};

const Profile = ({ params }: Params) => {
  const getParams = useSearchParams();
  const username = getParams.get("username");
  const email = getParams.get("email");
  const image = getParams.get("image");

  const { data: userBlogs = [], isLoading: loadingUserBlogs } = useRoutes(
    `/api/userblog/${params?.id}`
  );
  if (loadingUserBlogs) {
    console.log("loading user blogs...");
  }

  const { data: user, } = useRoutes(
    `/api/user/${params?.id}`
  );
  return <div>Profile</div>;
};

export default Profile;
