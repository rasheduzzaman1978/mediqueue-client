"use client";

import { useState } from "react";
import { Button, Card } from "@heroui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient();

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 🔥 Validation
  const validate = () => {
    let newErrors = {};

    if (!form.name) newErrors.name = "Name is required";

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

  // 🔐 Register
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors");
      return;
    }

    setLoading(true);

    try {
      const res = await authClient.signUp.email({
        email: form.email,
        password: form.password,
        name: form.name,
        image: form.image || undefined,
      });

      if (res?.error) {
        toast.error(res.error.message || "Registration failed");
      } else {
        toast.success("Registration successful 🎉");
        router.push("/login");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md p-8 shadow-xl rounded-2xl bg-white">

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create an Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">

          {/* Name */}
          <div>
            <label className="text-sm text-gray-600">
              Name <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              placeholder="Enter your name"
              className={`w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none ${
                errors.name ? "border-red-500" : "focus:border-blue-500"
              }`}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Photo */}
          <div>
            <label className="text-sm text-gray-600">
              Photo URL
            </label>
            <input
              type="text"
              value={form.image}
              placeholder="https://example.com/photo.jpg"
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
              onChange={(e) =>
                setForm({ ...form, image: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">
              Email <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              placeholder="john@example.com"
              className={`w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none ${
                errors.email ? "border-red-500" : "focus:border-blue-500"
              }`}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-sm text-gray-600">
              Password <span className="text-red-500 font-bold">*</span>
            </label>

            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              placeholder="••••••••"
              className={`w-full border rounded-lg px-3 py-2 mt-1 pr-10 focus:outline-none ${
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
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? "Registering..." : "Register"}
          </Button>

        </form>

        <p className="text-center mt-5 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>

      </Card>
    </div>
  );
}