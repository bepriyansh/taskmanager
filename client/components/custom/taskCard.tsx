import React, { useEffect, useState } from "react";
import { ITask } from "@/lib/interfaces";
import { getTasks } from "@/lib/requests/tasks";
import Task from "./task";

const TaskCard = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const tasksData = await getTasks(); // Fetch tasks
        setTasks(tasksData); // Set the tasks in state
      } catch (error: unknown) {  // Use `unknown` instead of `any`
        if (error instanceof Error) {
          setError(error.message);  // Safely handle the error
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchTasks(); // Call the function to fetch tasks
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="w-full max-w-[750px] border rounded-lg shadow-lg p-5 mb-4">
      <div className="flex flex-col w-full">
        <div className="flex border-b w-[450px] pb-3 mb-2 font-semibold">
          <p>My Tasks ({`${tasks.length}`})</p>
        </div>
        <div className="flex flex-col max-h-[350px] overflow-y-auto">
          {loading ? (
            <p>Loading tasks...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            tasks.map((task) => (
              <Task
                key={task._id}
                _id={task._id}
                title={task.title}
                description={task.description}
                dueDate={task.dueDate}
                status={task.status}
                userId={task.userId}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
