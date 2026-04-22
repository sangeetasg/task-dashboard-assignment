import type { Task } from "../types";

export const getTasks = async (): Promise<Task[]> => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
        const parsed = JSON.parse(saved) as Task[];
        if (parsed.length > 0) return parsed;
    }
    const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
    const data = (await res.json()) as Task[];

    localStorage.setItem("tasks", JSON.stringify(data));

    return data;
};