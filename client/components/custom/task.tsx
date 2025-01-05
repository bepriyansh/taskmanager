"use client";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ITask } from "@/lib/interfaces";
import { format, isToday, isTomorrow, isThisWeek } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, MoreVertical } from "lucide-react";
import { deleteTask, updateTask, updateTaskStatus } from "@/lib/requests/tasks"; // Import the task functions

const Task: React.FC<ITask> = ({ _id, title, description, dueDate, status }) => {
  const [marked, setMarked] = React.useState<boolean>(status === "completed");
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [editTitle, setEditTitle] = React.useState(title);
  const [editDueDate, setEditDueDate] = React.useState<Date | undefined>(new Date(dueDate));
  const [editDescription, setEditDescription] = React.useState(description);

  const getRelativeDate = (date: string) => {
    const taskDate = new Date(date);

    if (isToday(taskDate)) {
      return "Today";
    } else if (isTomorrow(taskDate)) {
      return "Tomorrow";
    } else if (isThisWeek(taskDate)) {
      return format(taskDate, "EEEE");
    }
    return format(taskDate, "dd/MM/yyyy");
  };

  const handleSaveEdit = async () => {
    try {
      await updateTask(_id, editTitle, editDescription, format(editDueDate!, "yyyy-MM-dd"));
      setEditDialogOpen(false); // Close dialog on successful update
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask(_id); // Call delete task function
      console.log("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleStatusChange = async () => {
    const newStatus = marked ? "pending" : "completed"; // Use "completed" instead of "Completed"
    try {
      const updatedTask = await updateTaskStatus(_id, newStatus); // Get updated task from API
      if (updatedTask) {
        setMarked(!marked); // Toggle marked status only if the API response is successful
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="flex flex-col gap-1 p-2 border-b cursor-pointer">
      <div className="flex items-center gap-4">
        <Checkbox checked={marked} onClick={()=>handleStatusChange()} />
        <div className="flex-1">
          <p className={`text-sm font-medium ${marked ? "line-through" : ""}`}>{editTitle}</p>
          <p className="text-xs text-muted-foreground w-full max-w-[400px]">{description}</p>
        </div>
        <span className="ml-auto text-xs">{getRelativeDate(dueDate)}</span>
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogTrigger asChild>
            <MoreVertical size={18} className="text-gray-700 dark:text-gray-200 cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="title" className="text-right">Title</label>
                <Input
                  id="title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="description" className="text-right">Description</label>
                <Textarea
                  id="description"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right">Due Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[280px] justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {editDueDate ? format(editDueDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={editDueDate || undefined}
                      onSelect={setEditDueDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <DialogFooter>
              <div className="flex gap-2">
                <Button onClick={handleDeleteTask} className="bg-red-500 text-white hover:bg-red-600">
                  Delete
                </Button>
                <Button onClick={handleSaveEdit}>Save</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Task;
