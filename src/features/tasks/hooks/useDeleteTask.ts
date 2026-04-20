import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task } from "../types";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => id, // fake API

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]) ?? [];

      const updatedTasks = previousTasks.filter((task) => task.id !== id);

      // save to localStorage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      // update UI
      queryClient.setQueryData(["tasks"], updatedTasks);

      return { previousTasks };
    },

    onError: (_err, _id, context) => {
      queryClient.setQueryData(["tasks"], context?.previousTasks);
      localStorage.setItem("tasks", JSON.stringify(context?.previousTasks ?? []));
    },
  });
};