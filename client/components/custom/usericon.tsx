"use client";
import React from "react";
import { destroyCookie } from "nookies"; // Import destroyCookie
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Usericon = () => {
  const router = useRouter();
  const logout = () => {
    // Remove cookies
    destroyCookie(null, "token");
    destroyCookie(null, "username");
    router.push("/auth/login");
  };

  return (
    <div>
      <Button onClick={() => logout()} variant={"ghost"}>
        Log out
      </Button>
    </div>
  );
};

export default Usericon;
