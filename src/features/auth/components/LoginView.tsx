import { useNavigate } from "@tanstack/react-router";
import { login } from "@/features/auth/store";

export default function LoginView() {
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
}
