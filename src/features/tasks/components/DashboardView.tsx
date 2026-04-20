import { useTasks } from "@/features/tasks/hooks/useTasks";
import { useDeleteTask } from "@/features/tasks/hooks/useDeleteTask";
import { useUpdateTask } from "@/features/tasks/hooks/useUpdateTask";
import { logout } from "@/features/auth/store";
import { useNavigate } from "@tanstack/react-router";
import AddTaskForm from "./AddTaskForm";
import type { Task } from "../types";

export default function DashboardView() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useTasks();
  const deleteMutation = useDeleteTask();
  const updateMutation = useUpdateTask();

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks</p>;

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Add Tasks</h1>
        <button
          onClick={handleLogout}
          className="rounded bg-gray-700 px-3 py-1 text-white"
        >
          Logout
        </button>
      </div>

      <AddTaskForm />
      <h1 className="text-xl font-bold mb-4">Tasks List</h1>
      <ul className="space-y-2">
        {(data ?? []).map((task: Task) => (
          <li
            key={task.id}
            className="p-3 bg-gray-100 rounded flex justify-between"
          >
            <input
              defaultValue={task.title}
              onBlur={(e) =>
                updateMutation.mutate({ ...task, title: e.target.value })
              }
              className="border p-1 w-full"
            />

            <button
              onClick={() => deleteMutation.mutate(task.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
