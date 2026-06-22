"use client";

import { useState } from "react";
import Link from "next/link";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain an uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain a lowercase letter";
    }
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
  
    setTimeout(() => {
      setLoading(false);
      toast.success("Account created! (UI only — auth not connected yet)");
    }, 800);
  };

  const handleGoogleLogin = () => {
   
    toast.info("Google login will be connected soon");
  };

  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full mb-6"
        type="button"
      >
        <FaGoogle className="text-secondary" /> Continue with Google
      </button>

      <div className="divider text-base-content/40 text-sm">OR</div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Full Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Photo URL</span>
          </label>
          <input
            type="text"
            name="photoURL"
            placeholder="https://your-photo-link.com"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Password</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="At least 6 characters"
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
          <label className="label">
            <span className="label-text-alt text-base-content/50">
              Must include uppercase, lowercase & be 6+ characters
            </span>
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? <span className="loading loading-spinner loading-sm"></span> : "Create Account"}
        </button>
      </form>

      <p className="text-center text-sm mt-6 text-base-content/70">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-semibold">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;