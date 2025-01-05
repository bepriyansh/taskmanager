"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createTask } from "@/lib/requests/tasks";

interface Task {
  title: string;
  description: string;
  dueDate: string | null;
}

const CreateTask = () => {
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    dueDate: null,
  });

  const [date, setDate] = useState<Date>();
  const [loading, setLoading] = useState<boolean>(false); // Loading state for button
  const [error, setError] = useState<string | null>(null); // For handling error messages

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTask({ ...task, [e.target.id]: e.target.value });
  };

  const handleSaveTask = async () => {
    setLoading(true);
    setError(null);

    try {
      // Call the createTask function from API utils
      const newTask = await createTask(
        task.title,
        task.description,
        task.dueDate || ""
      );

      // Reset the form after saving
      setTask({ title: "", description: "", dueDate: null });
      setDate(undefined);
      return newTask
    } catch (error) {
      // Handle error if the task creation fails
      console.error("Error creating task:", error);
      setError("An error occurred while creating the task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-2xl">Add Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Fill out the details to add a new task.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Enter task description"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dueDate" className="text-right">
              Due Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    setTask((prevTask) => ({
                      ...prevTask,
                      dueDate: selectedDate?.toISOString() || null,
                    }));
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Show error message if there is one */}
        {error && <p className="text-red-500">{error}</p>}

        <DialogFooter>
          <Button
            type="button"
            onClick={handleSaveTask}
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Saving..." : "Save Task"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTask;
