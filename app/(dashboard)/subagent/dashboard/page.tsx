"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";
import Spinner from "@/components/Spinner";

interface Task {
  _id: string;
  firstName: string;
  phone: string;
  notes: string;
  completed: boolean;
}

interface DistributedTask {
  _id: string;
  agentId: string;
  tasks: Task[];
  uploadDate: string;
}

export default function SubAgentDashboardPage() {
  const { user, loading } = useAuth();
  const [distributedTasks, setDistributedTasks] = useState<DistributedTask[]>([]);
  const [error, setError] = useState("");
  const [tasksLoading, setTasksLoading] = useState(true);

  useEffect(() => {
    if (!loading && user) {
      fetchAgentTasks();
    }
  }, [user, loading]);

  const fetchAgentTasks = async () => {
    setTasksLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/agent-tasks`,
        { withCredentials: true }
      );
      setDistributedTasks(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch tasks.");
    } finally {
      setTasksLoading(false);
    }
  };

  const handleToggleTaskStatus = async (taskId: string, currentStatus: boolean) => {
  try {

    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/agent-tasks/${taskId}/status`,
      { completed: !currentStatus },
      { withCredentials: true }
    );

    setDistributedTasks((prev) =>
      prev.map((distTask) => ({
        ...distTask,
        tasks: distTask.tasks.map((task) =>
          task._id === taskId ? { ...task, completed: !currentStatus } : task
        ),
      }))
    );

    toast.success("Task status updated successfully!");

  } catch (err: any) {
    setError(err.response?.data?.message || "Failed to update task status.");
  }
};


  if (loading || tasksLoading) {
    return <Spinner />;
  }

  return (
    <main className="px-8 md:px-28 py-8 md:py-12 font-outfit">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <h2 className="text-xl font-semibold mb-8 md:mb-12">
        Hello {user?.name || "Agent"}
        {distributedTasks.length === 0
          ? ", you have no tasks assigned."
          : ", here are your tasks:"}
      </h2>

      {distributedTasks.length === 0 ? (
        <p className="text-left text-foreground/70">No tasks assigned yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {distributedTasks.map((distTask) => (
            <motion.div
              key={distTask._id}
              initial={{ y: 10, opacity: 0, filter: "blur(5px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-background p-6 rounded-xl border border-foreground/10"
            >
              <p className="text-sm text-muted-foreground mb-4">
                Uploaded on: {new Date(distTask.uploadDate).toLocaleDateString()}
              </p>

              {distTask.tasks.length === 0 ? (
                <p>No individual tasks in this distribution.</p>
              ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
                  {distTask.tasks.map((task) => (
                    <li
                      key={task._id}
                      className={`mb-4 p-4 bg-card/40 border border-foreground/10 rounded-lg ${task.completed ? 'opacity-55' : ''}`}
                    >
                      <div className="flex items-center mt-0 pb-2 transition-all duration-500">
                        <input
                          type="checkbox"
                          id={`task-${task._id}`}
                          checked={task.completed}
                          onChange={() =>
                            handleToggleTaskStatus(task._id, task.completed)
                          }
                          className="mr-2 h-4 w-4 text-primary rounded focus:ring-primary border-gray-300 transition-all duration-500"
                        />
                        <label
                          htmlFor={`task-${task._id}`}
                          className="text-sm transition-all duration-500"
                        >
                          {task.completed ? "Completed" : "Mark as Complete"}
                        </label>
                      </div>
                      <p className="font-medium">Name: {task.firstName}</p>
                      <p>
                        Phone:{" "}
                        <Link
                          href={`tel:${task.phone}`}
                          className="text-blue-500/80 dark:text-blue-400 hover:underline"
                        >
                          {task.phone}
                        </Link>
                      </p>
                      <p>Notes: {task.notes}</p>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}