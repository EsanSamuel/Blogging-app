"use client";
import { ApiContext, TProps } from "@/context/ApiProvider";
import React from "react";

const YourProfile = () => {
  const { userBlogs } = React.useContext(ApiContext) as TProps;
  return <div>YourProfile</div>;
};

export default YourProfile;
