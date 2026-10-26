import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useState } from "react";
import supabase from "@/services/supabase";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, isInitializing } = useAuth();

  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const destination = location.state?.from?.pathname ?? "/";

  async function onSubmit({ email, password }) {
    setLoginError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setLoginError(error.message);
      return;
    }
    navigate(destination, { replace: true });
  }

  if (isInitializing) {
    return <p>Checking session...</p>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="bg-grey-50 flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-[50rem] rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-brand-600 mb-2 font-bold">FreshFare</h1>
        <p className="text-grey-500 mb-6">Sign in to your account</p>
        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full rounded-md border p-2"
              {...register("email", {
                required: "Email is required",
              })}
            />

            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="w-full rounded-md border p-2"
              {...register("password", {
                required: "Password is required",
              })}
            />

            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
          {loginError && (
            <p role="alert" className="text-sm text-red-600">
              {loginError}
            </p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-brand-600 w-full rounded-md p-3 text-white disabled:opacity-50"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </Form>
      </div>
    </main>
  );
}
