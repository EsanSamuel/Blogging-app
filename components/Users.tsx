import { ApiContext, TProps } from "@/context/ApiProvider";
import React from "react";

const Users = () => {
  const { users } = React.useContext(ApiContext) as TProps;
  return <div>Users</div>;
};

export default Users;
