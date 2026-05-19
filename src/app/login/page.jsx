"use client";

import { useState } from "react";
import { Button, Card } from "@heroui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 🔥 Validation
  const validate = () => {
    let newErrors = {};

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Minimum 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔐 Login (ONLY handler)
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix errors first");
      return;
    }

    setLoading(true);

    try {
      const res = await authClient.signIn.email({
        email: form.email,
        password: form.password,
      });

      if (res?.error) {
        toast.error(res.error.message || "Login failed");
      } else {
        toast.success("Login successful 🎉");

        // ✅ IMPORTANT FIX
        router.replace("/");
        router.refresh(); // 🔥 navbar instantly update হবে
      }
    } catch (err) {
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  // 🔐 Google login
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (err) {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md p-8 shadow-xl rounded-2xl bg-white">

        <h2 className="text-xl md:text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome Back! Please Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              placeholder="Enter your email"
              className={`w-full border rounded-lg px-3 py-2 mt-1 ${
                errors.email ? "border-red-500" : "focus:border-blue-500"
              }`}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-sm text-gray-600">
              Password <span className="text-red-500">*</span>
            </label>

            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              placeholder="Enter your password"
              className={`w-full border rounded-lg px-3 py-2 mt-1 pr-10 ${
                errors.password ? "border-red-500" : "focus:border-blue-500"
              }`}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
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

          {/* ✅ FIXED Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? "Loading..." : "Login"}
          </Button>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <Button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border"
        >
          <FaGoogle />
          Continue with Google
        </Button>

        <p className="text-center mt-5 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>

      </Card>
    </div>
  );
}