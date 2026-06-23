"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { registerUser } from "@/lib/auth-client";
import { useAuth } from "@/lib/AuthProvider";
import { GoogleLogin } from "@react-oauth/google";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { updateUser } = useAuth();

  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters long";
    if (!/[A-Z]/.test(password)) return "Password must contain an uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must contain a lowercase letter";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const photoURL = form.photoURL.value.trim();
    const password = form.password.value;

    if (!name || !email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }
    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser({ name, email, password, photoURL });
      updateUser(data.user);
      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      updateUser(data.user);
      toast.success("Logged in with Google!");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.message || "Google login failed");
    }
  };

  return (
    <div>
      <div className="flex justify-center mb-6">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => toast.error("Google login failed")}
          useOneTap
          shape="rectangular"
          size="large"
          width="400"
          text="continue_with"
        />
      </div>

      <div className="divider text-base-content/40 text-sm">OR</div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label"><span className="label-text font-medium">Full Name</span></label>
          <input type="text" name="name" placeholder="John Doe" className="input input-bordered w-full" required />
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text font-medium">Email</span></label>
          <input type="email" name="email" placeholder="you@example.com" className="input input-bordered w-full" required />
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text font-medium">Photo URL</span></label>
          <input type="text" name="photoURL" placeholder="https://your-photo-link.com" className="input input-bordered w-full" />
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text font-medium">Password</span></label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="At least 6 characters"
              className="input input-bordered w-full pr-12"
              required
            />
            <button type="button" onClick={() => setShowPassword((p) => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/50">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <label className="label">
            <span className="label-text-alt text-base-content/50">Must include uppercase, lowercase & 6+ characters</span>
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? <span className="loading loading-spinner loading-sm"></span> : "Create Account"}
        </button>
      </form>

      <p className="text-center text-sm mt-6 text-base-content/70">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-semibold">Login</Link>
      </p>
    </div>
  );
};

export default RegisterForm;