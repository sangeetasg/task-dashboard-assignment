import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask } from "../api/addTask";
import type { Task, TaskInput } from "../types";

export const useAddTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addTask,

        onMutate: async (newTask: TaskInput) => {
            await queryClient.cancelQueries({ queryKey: ["tasks"] });

            const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]) ?? [];

            const updatedTasks = [
                ...previousTasks,
                { id: Date.now(), ...newTask },
            ];

            // ✅ Save to localStorage
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));

            // ✅ Update UI
            queryClient.setQueryData(["tasks"], updatedTasks);

            return { previousTasks };
        },

        onError: (_err, _newTask, context) => {
            queryClient.setQueryData(["tasks"], context?.previousTasks);
            localStorage.setItem("tasks", JSON.stringify(context?.previousTasks ?? []));
        },

    });
};