import type { Task, TaskInput } from "../types";

export const addTask = async (task: TaskInput): Promise<Task> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: Date.now(), ...task });
        }, 500);
    });
};