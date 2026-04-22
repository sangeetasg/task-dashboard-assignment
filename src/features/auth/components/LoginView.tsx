import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "../schema/loginSchema";
import { login } from "../store";
import { useNavigate } from "@tanstack/react-router";

export default function LoginView() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log(data.username)
    // fake auth check
    if (data.username === "admin" && data.password === "1234") {
      login(data.username);
      navigate({ to: "/dashboard" });
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Login</h1>

      <input
        {...register("username")}
        placeholder="Username"
        className="border p-2 w-full"
      />
      {errors.username && <p className="text-red-500">{errors.username.message}</p>}

      <input
        type="password"
        {...register("password")}
        placeholder="Password"
        className="border p-2 w-full"
      />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Login
      </button>
    </form>
  );
}