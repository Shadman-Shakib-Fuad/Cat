"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { signIn } from "@/lib/auth-client";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
      toast.error("Please fill in both email and password");
      return;
    }

    setLoading(true);
    const { error } = await signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
    });

    if (error) {
      toast.error(error.message || "Login failed");
      setLoading(false);
      return;
    }

    toast.success("Logged in successfully!");
    router.push("/dashboard");
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    await signIn.social({ provider: "google", callbackURL: "/dashboard" });
  };

  return (
    <div>
      <button onClick={handleGoogleLogin} className="btn btn-outline w-full mb-6" type="button">
        <FaGoogle className="text-secondary" /> Continue with Google
      </button>

      <div className="divider text-base-content/40 text-sm">OR</div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label"><span className="label-text font-medium">Email</span></label>
          <input type="email" name="email" placeholder="you@example.com" className="input input-bordered w-full" required />
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text font-medium">Password</span></label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/50"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? <span className="loading loading-spinner loading-sm"></span> : "Login"}
        </button>
      </form>

      <p className="text-center text-sm mt-6 text-base-content/70">
        Don't have an account?{" "}
        <Link href="/register" className="text-primary font-semibold">Register</Link>
      </p>
    </div>
  );
};

export default LoginForm;