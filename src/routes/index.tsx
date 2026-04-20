// src/routes/index.tsx
import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAuth } from "@/features/auth/store";
import LoginView from "@/features/auth/components/LoginView";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (getAuth()) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: LoginView,
});