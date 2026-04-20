import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task } from "../types";

export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updatedTask: Task) => updatedTask,

        onMutate: async (updatedTask: Task) => {
            await queryClient.cancelQueries({ queryKey: ["tasks"] });

            const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]) ?? [];

            const newTasks = previousTasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
            );

            localStorage.setItem("tasks", JSON.stringify(newTasks));

            queryClient.setQueryData(["tasks"], newTasks);

            return { previousTasks };
        },

        onError: (_err, _task, context) => {
            queryClient.setQueryData(["tasks"], context?.previousTasks);
            localStorage.setItem("tasks", JSON.stringify(context?.previousTasks ?? []));
        },
    });
};