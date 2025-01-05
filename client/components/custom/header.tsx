import React from "react";
import Link from "next/link";
import { ThemeToggle } from "../toggleTheme";
import Usericon from "./usericon";
import CreateTask from "./createTask";

const Header = () => {
  return (
    <div className="fixed w-full px-4 py-2 z-50">
      <div className="flex items-center justify-between border py-1 px-5 rounded-xl backdrop-blur-sm">
        <Link href="/" className="text-lg text-primary">
          Task Manager
        </Link>
        <div className="flex justify-center items-center gap-3">
          <CreateTask/>
          <ThemeToggle />
          <Usericon name="Priyansh" />
        </div>
      </div>
    </div>
  );
};

export default Header;
