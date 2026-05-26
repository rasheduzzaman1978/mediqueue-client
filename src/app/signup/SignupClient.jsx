"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlinePhotograph,
} from "react-icons/hi";

import { FiLock } from "react-icons/fi";

import { createAuthClient } from "better-auth/react";

const authClient =
  createAuthClient();

export default function SignupClient() {

  const router =
    useRouter();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
      image: "",
    });

  const [errors, setErrors] =
    useState({});

  // VALIDATION

  const validate = () => {

    let newErrors = {};

    // NAME

    if (!form.name.trim()) {

      newErrors.name =
        "Name is required";
    }

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
      !/[A-Z]/.test(
        form.password
      )
    ) {

      newErrors.password =
        "Password must contain at least one uppercase letter";

    } else if (
      !/[a-z]/.test(
        form.password
      )
    ) {

      newErrors.password =
        "Password must contain at least one lowercase letter";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  // HANDLE INPUT

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // REGISTER

  const handleRegister =
    async (e) => {

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
          await authClient.signUp.email({

            email:
              form.email,

            password:
              form.password,

            name:
              form.name,

            image:
              form.image ||
              undefined,
          });

        if (res?.error) {

          toast.error(
            res.error.message ||
              "Registration failed"
          );

        } else {

          toast.success(
            "Registration successful 🎉"
          );

          router.push(
            "/login"
          );
        }

      } catch (err) {

        toast.error(
          "Something went wrong"
        );
      }

      setLoading(false);
    };

  return (

    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#05060F] px-4 py-10">

      {/* BACKGROUND GLOW */}

      <div className="absolute left-1/2 top-[-200px] h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[140px]" />

      {/* CARD */}

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">

        {/* TOP */}

        <div className="text-center">

          <h1 className="text-3xl font-bold tracking-tight text-white">

            Create an Account

          </h1>

          <p className="mt-3 text-sm text-zinc-400">

            Join us and start your journey today.

          </p>
        </div>

        {/* FORM */}

        <form
          onSubmit={
            handleRegister
          }
          className="mt-10 space-y-5"
        >

          {/* NAME */}

          <div>

            <label className="mb-2 block text-sm font-medium text-zinc-300">

              Name{" "}

              <span className="text-red-500">
                *
              </span>

            </label>

            <div className="relative">

              <HiOutlineUser className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-indigo-500"
              />
            </div>

            {errors.name && (

              <p className="mt-2 text-sm text-red-500">

                {errors.name}

              </p>
            )}
          </div>

          {/* PHOTO URL */}

          <div>

            <label className="mb-2 block text-sm font-medium text-zinc-300">

              Photo URL

            </label>

            <div className="relative">

              <HiOutlinePhotograph className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

              <input
                type="text"
                name="image"
                placeholder="https://example.com/photo.jpg"
                value={form.image}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-indigo-500"
              />
            </div>
          </div>

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
                name="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
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
                name="password"
                placeholder="********"
                value={form.password}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-indigo-500"
              />

              {/* SHOW/HIDE */}

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

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="mt-3 h-12 w-full rounded-xl bg-indigo-600 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50"
          >

            {loading
              ? "Creating..."
              : "Create Account"}

          </button>

          {/* LOGIN */}

          <p className="pt-3 text-center text-sm text-zinc-400">

            Already have an account?{" "}

            <Link
              href="/login"
              className="font-medium text-indigo-400 transition hover:text-indigo-300"
            >

              Login

            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}