"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

import {
  FaGoogle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { HiOutlineMail } from "react-icons/hi";
import { FiLock } from "react-icons/fi";

import { authClient } from "@/lib/auth-client";

export default function LoginClient() {
  const router = useRouter();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // VALIDATION
  const validate = () => {
    let newErrors = {};

    // EMAIL
    if (!form.email) {
      newErrors.email =
        "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        form.email
      )
    ) {
      newErrors.email =
        "Invalid email address";
    }

    // PASSWORD
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

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error(
        "Please fix the errors!"
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

  // GOOGLE LOGIN
  const handleGoogleLogin =
    async () => {
      try {
        await authClient.signIn.social({
          provider: "google",
          callbackURL: "/",
        });
      } catch (err) {
        toast.error(
          "Google login failed"
        );
      }
    };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#05060F] px-4 py-10">
      
      {/* BACKGROUND GLOW */}
      <div className="absolute left-1/2 top-[-200px] h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[140px]" />

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
        
        {/* TOP */}
        <div className="text-center">
          
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Welcome Back
          </h1>

          <p className="mt-3 text-sm text-zinc-400">
            Login to continue your journey.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          className="mt-10 space-y-6"
        >
          
          {/* EMAIL */}
          <div>
            
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Email{" "}
              <span className="text-red-500">
                *
              </span>
            </label>

            <div className="relative">
              
              <HiOutlineMail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

              <input
                type="email"
                value={form.email}
                placeholder="rashed@gmail.com"
                autoComplete="email"
                onChange={(e) =>
                  setForm({
                    ...form,
                    email:
                      e.target.value,
                  })
                }
                className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-indigo-500"
              />
            </div>

            {errors.email && (
              <p className="mt-2 text-sm text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Password{" "}
              <span className="text-red-500">
                *
              </span>
            </label>

            <div className="relative">
              
              <FiLock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={form.password}
                placeholder="********"
                autoComplete="current-password"
                onChange={(e) =>
                  setForm({
                    ...form,
                    password:
                      e.target.value,
                  })
                }
                className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-indigo-500"
              />

              {/* SHOW / HIDE */}
              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-white"
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* PASSWORD HINT */}
            <p className="mt-2 text-xs text-zinc-500">
              Password must contain uppercase,
              lowercase and minimum 6 characters.
            </p>

            {errors.password && (
              <p className="mt-2 text-sm text-red-500">
                {errors.password}
              </p>
            )}
          </div>

          {/* FORGOT PASSWORD */}
          <div className="flex justify-end">
            
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-indigo-400 transition hover:text-indigo-300"
            >
              Forgot password?
            </Link>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-xl bg-indigo-600 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50"
          >
            {loading
              ? "Loading..."
              : "Login"}
          </button>

          {/* DIVIDER */}
          <div className="flex items-center gap-4">
            
            <div className="h-px flex-1 bg-white/10" />

            <span className="text-sm text-zinc-500">
              OR
            </span>

            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* GOOGLE LOGIN */}
          <button
            type="button"
            onClick={
              handleGoogleLogin
            }
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] text-sm font-medium text-white transition hover:bg-white/[0.06]"
          >
            <FaGoogle className="text-lg" />

            Continue with Google
          </button>

          {/* REGISTER */}
          <p className="text-center text-sm text-zinc-400">
            Don&apos;t have an account?{" "}

            <Link
              href="/signup"
              className="font-medium text-indigo-400 transition hover:text-indigo-300"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}