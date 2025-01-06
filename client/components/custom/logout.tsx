'use client';
import React from "react";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";

const Logout = () => {
  const { data: session, status } = useSession(); 

  const logout = async () => {
    await signOut();
  };

  if (status === "loading" || !session) {
    return null; 
  }

  return (
    <div>
      <Button onClick={logout} variant="ghost">
        Log out
      </Button>
    </div>
  );
};

export default Logout;
