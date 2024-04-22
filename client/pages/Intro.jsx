import React from "react";
import { useUser } from "../hooks/useAuth";

const Intro = () => {
  const user = useUser();

  return <h1>Hello {user.username}</h1>;
};

export default Intro;
