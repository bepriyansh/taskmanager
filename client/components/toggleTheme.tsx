"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <div className="cursor-pointer">
      {theme == "light" ? (
        <div onClick={() => setTheme("dark")}>
          <Sun />
        </div>
      ) : (
        <div onClick={() => setTheme("light")}>
          <Moon />
        </div>
      )}
    </div>
  );
}
