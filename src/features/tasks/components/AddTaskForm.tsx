import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, type TaskFormValues } from "../schema/taskSchema";
import { useAddTask } from "../hooks/useAddTask";

export default function AddTaskForm() {
  const mutation = useAddTask();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = (data: TaskFormValues) => {
    mutation.mutate(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
      <input
        {...register("title")}
        placeholder="Enter task"
        className="border p-2 mr-2"
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>

      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      {mutation.isPending && <p>Adding...</p>}
    </form>
  );
}
