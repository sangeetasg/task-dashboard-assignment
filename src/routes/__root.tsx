// src/routes/__root.tsx
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div>
      <h1 className="text-2xl font-bold p-4">Task Dashboard</h1>
      <Outlet />
    </div>
  ),
});