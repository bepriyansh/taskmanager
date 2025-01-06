import Link from "next/link";
import { ThemeToggle } from "../toggleTheme";
import CreateTask from "./createTask";

import Logout from "./logout";

const Header = () => {
  

  return (
    <div className="fixed w-full px-4 py-2 z-50">
      <div className="flex items-center justify-between border py-1 px-5 rounded-xl backdrop-blur-sm">
        <Link href="/" className="text-lg text-primary">
          Task Manager
        </Link>
        <div className="flex justify-center items-center gap-3">
          <CreateTask />
          <ThemeToggle />
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Header;
