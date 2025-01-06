"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/custom/header";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { Session } from "next-auth";
import { TaskProvider } from "@/context/taskContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/auth/login");
    }
  }, [session]);

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TaskProvider>
              <div className="relative h-[100vh] flex flex-col items-center">
                <Header />
                <div className="mb-14"></div>
                {children}
              </div>
            </TaskProvider>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
