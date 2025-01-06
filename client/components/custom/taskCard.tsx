import React, { useEffect } from "react";
import { ITask } from "@/lib/interfaces";
import Task from "./task";
import { useTaskContext } from "@/context/taskContext";

const TaskCard = () => {
  const { tasks, fetchTasks } = useTaskContext();

  useEffect(() => {
    fetchTasks(); // Fetch tasks on mount
  }, [fetchTasks]); // Only call fetchTasks once when the component mounts

  return (
    <div className="w-full max-w-[750px] border rounded-lg shadow-lg p-5 mb-4">
      <div className="flex flex-col w-full">
        <div className="flex border-b w-[450px] pb-3 mb-2 font-semibold">
          <p>My Tasks ({`${tasks.length}`})</p>
        </div>
        <div className="flex flex-col max-h-[350px] overflow-y-auto">
          {tasks.length === 0 ? (
            <p>No tasks available</p>
          ) : (
            tasks.map((task: ITask) => (
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
