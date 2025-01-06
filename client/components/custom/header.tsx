'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "../toggleTheme";
import Usericon from "./usericon";
import CreateTask from "./createTask";

import { parseCookies } from "nookies";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.token && cookies.username) {
      setIsAuthenticated(true);
    }
  }, []);
  

  return (
    <div className="fixed w-full px-4 py-2 z-50">
      <div className="flex items-center justify-between border py-1 px-5 rounded-xl backdrop-blur-sm">
        <Link href="/" className="text-lg text-primary">
          Task Manager
        </Link>
        <div className="flex justify-center items-center gap-3">
          {isAuthenticated && <CreateTask />}
          <ThemeToggle />
          {isAuthenticated && <Usericon />}
        </div>
      </div>
    </div>
  );
};

export default Header;
