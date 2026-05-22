"use client";

import { useState } from "react";
import { Button, Card } from "@heroui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  FaGoogle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function LoginClient() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] =
    useState(false);

  // 🔥 Validation
  const validate = () => {
    let newErrors = {};

    // Email validation
    if (!form.email) {
      newErrors.email =
        "Email is required";
    } else if (
      !/\S+@\S+\.\S+/.test(form.email)
    ) {
      newErrors.email =
        "Invalid email";
    }

    // Password validation
    if (!form.password) {
      newErrors.password =
        "Password is required";
    } else if (
      form.password.length < 6
    ) {
      newErrors.password =
        "Password must be at least 6 characters";
    } else if (
      !/[A-Z]/.test(form.password)
    ) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (
      !/[a-z]/.test(form.password)
    ) {
      newErrors.password =
        "Password must contain at least one lowercase letter";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // 🔐 Login
  const handleLogin = async (e) => {
    e.preventDefault();

    // ❌ Stop login if validation fails
    if (!validate()) {
      toast.error(
        "Please fix errors first"
      );
      return;
    }

    setLoading(true);

    try {
      const res =
        await authClient.signIn.email({
          email: form.email,
          password: form.password,
        });

      if (res?.error) {
        toast.error(
          res.error.message ||
            "Login failed"
        );
      } else {
        toast.success(
          "Login successful 🎉"
        );

        // ✅ Redirect after login
        router.replace("/");
        router.refresh();
      }
    } catch (err) {
      toast.error(
        "Something went wrong"
      );
    }

    setLoading(false);
  };

  // 🔐 Google login
  const handleGoogleLogin =
    async () => {
      try {
        await authClient.signIn.social({
          provider: "google",
        });
      } catch (err) {
        toast.error(
          "Google login failed"
        );
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 text-black">
      <Card className="w-full max-w-md p-8 shadow-xl rounded-2xl bg-white">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome Back! Please Login
        </h2>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">
              Email{" "}
              <span className="text-red-500">
                *
              </span>
            </label>

            <input
              type="email"
              value={form.email}
              placeholder="Enter your email"
              autoComplete="email"
              className={`w-full border rounded-lg px-3 py-2 mt-1
              bg-white text-black placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
              onChange={(e) =>
                setForm({
                  ...form,
                  email:
                    e.target.value,
                })
              }
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-sm text-gray-600">
              Password{" "}
              <span className="text-red-500">
                *
              </span>
            </label>

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={form.password}
              placeholder="Enter your password"
              autoComplete="current-password"
              className={`w-full border rounded-lg px-3 py-2 mt-1 pr-10
              bg-white text-black placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${
                errors.password
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
              onChange={(e) =>
                setForm({
                  ...form,
                  password:
                    e.target.value,
                })
              }
            />

            {/* 👁 Show / Hide Password */}
            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-3 top-10 text-gray-500"
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

            {/* Password Error */}
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {
                  errors.password
                }
              </p>
            )}
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading
              ? "Loading..."
              : "Login"}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-300"></div>

          <span className="text-sm text-gray-500">
            OR
          </span>

          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <Button
          onClick={
            handleGoogleLogin
          }
          className="w-full flex items-center justify-center gap-2 border border-gray-300 bg-white text-black hover:bg-gray-100"
        >
          <FaGoogle />
          Continue with Google
        </Button>

        {/* Register Link */}
        <p className="text-center mt-5 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
}