"use client";
import MyCalendar from "@/components/custom/Calendar";
import TaskCard from "@/components/custom/taskCard";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();

    if (!cookies.token || !cookies.username) {
      router.push("/auth/login");
    }
  }, [router]);

  return (
    <div className="flex w-full justify-center items-center my-2">
      <div className="flex flex-col">
        <div className="flex justify-center gap-8">
          <MyCalendar />
          <TaskCard />
        </div>
        <div className="flex justify-start gap-8">
          <p className="text-3xl py-4">Completed tasks</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
