"use client";
import { Avatar } from "keep-react";

export const AvatarComponent = ({ path = "", size = "md" }) => {
  return (
    <>
      <Avatar shape="circle" img={path} size={size} />
    </>
  );
};
