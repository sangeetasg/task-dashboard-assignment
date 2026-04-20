// src/routes/dashboard.tsx
import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAuth } from "@/features/auth/store";
import DashboardView from "@/features/tasks/components/DashboardView";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: () => {
    if (!getAuth()) {
      throw redirect({ to: "/" });
    }
  },
  component: DashboardView,
});
