"use client";

import React, { useEffect, useState } from "react";
import MyCalendar from "@/components/custom/Calendar";
import TaskCard from "@/components/custom/taskCard";
import { ITask } from "@/lib/interfaces";
import { useTaskContext } from "@/context/taskContext";

const Home = () => {
  const [completedTasks, setCompletedTasks] = useState<ITask[]>([]);
  const { tasks, fetchTasks } = useTaskContext(); 

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]); 

  useEffect(() => {
    const completed = tasks.filter((task) => task.status === "completed");
    setCompletedTasks(completed);
  }, [tasks]); // Re-run when tasks update

  return (
    <div className="flex w-full justify-center items-center my-2">
      <div className="flex flex-col">
        <div className="flex justify-center gap-8">
          <MyCalendar />
          <TaskCard />
        </div>
        <div className="flex flex-col justify-start gap-4 mt-8">
          <p className="text-3xl py-4">Completed tasks</p>
          <div className="flex flex-col gap-2">
            {completedTasks.length > 0 ? (
              completedTasks.map((task) => (
                <div key={task._id} className="p-4 border rounded-md">
                  <h3 className="text-lg font-bold">{task.title}</h3>
                  <p>{task.description}</p>
                  <p className="text-sm text-gray-600">Due Date: {task.dueDate}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No completed tasks found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
