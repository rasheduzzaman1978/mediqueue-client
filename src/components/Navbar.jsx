"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  useEffect,
  useState,
} from "react";

import {
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";

import {
  Avatar,
  Button,
} from "@heroui/react";

import { useTheme } from "next-themes";

import { authClient } from "@/lib/auth-client";

// ====================== NAVBAR ======================

export default function CustomNavbar() {

  const pathname =
    usePathname();

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  // ================= HYDRATION FIX =================

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {

    setMounted(true);

  }, []);

  // ================= THEME =================

  const {
    theme,
    setTheme,
  } = useTheme();

  // ================= SESSION =================

  const { data: session } =
    authClient.useSession();

  const user =
    session?.user;

  // Prevent hydration mismatch
  if (!mounted) {

    return null;
  }

  // ================= LINKS =================

  const publicLinks = [

    {
      name: "Home",
      path: "/",
    },

    {
      name: "Tutors",
      path: "/tutors",
    },
  ];

  const privateLinks = [

    {
      name: "Add Tutor",
      path: "/add-tutor",
    },

    {
      name: "My Tutors",
      path: "/my-tutors",
    },

    {
      name: "My Booked Sessions",
      path: "/my-bookings",
    },
  ];

  // ================= LOGOUT =================

  const handleLogout =
    async () => {

      await authClient.signOut();
    };

  return (

    <div className="w-full shadow bg-white dark:bg-[#0B1120] text-black dark:text-white sticky top-0 z-50 transition-colors duration-300">

      <Navbar
        maxWidth="full"
        className="px-2 lg:px-4 py-4 bg-white dark:bg-[#0B1120] transition-colors duration-300"
      >

        {/* ================= LEFT → LOGO ================= */}

        <NavbarContent
          justify="start"
          className="flex-1"
        >

          <NavbarBrand>

            <Link
              href="/"
              prefetch={true}
              className="flex items-center"
            >

              <h1 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent whitespace-nowrap">

                TutorQueue

              </h1>

            </Link>

          </NavbarBrand>

        </NavbarContent>

        {/* ================= CENTER → MENU ================= */}

        <NavbarContent
          justify="center"
          className="hidden lg:flex flex-1 items-center gap-4 xl:gap-6 flex-nowrap whitespace-nowrap"
        >

          {/* ===== Public Links ===== */}

          {publicLinks.map((link) => {

            const isActive =
              pathname === link.path;

            return (

              <NavbarItem
                key={link.path}
              >

                <Link
                  href={link.path}
                  prefetch={true}
                  className={`relative text-sm xl:text-base transition duration-200 ${
                    isActive
                      ? "text-black dark:text-white font-semibold"
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-400"
                  }`}
                >

                  {link.name}

                  {isActive && (

                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-500 rounded"></span>

                  )}

                </Link>

              </NavbarItem>
            );
          })}

          {/* ===== Private Links ===== */}

          {user &&
            privateLinks.map((link) => {

              const isActive =
                pathname === link.path;

              return (

                <NavbarItem
                  key={link.path}
                >

                  <Link
                    href={link.path}
                    prefetch={true}
                    className={`relative text-sm xl:text-base transition duration-200 ${
                      isActive
                        ? "text-black dark:text-white font-semibold"
                        : "text-gray-600 dark:text-gray-300 hover:text-blue-400"
                    }`}
                  >

                    {link.name}

                    {isActive && (

                      <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-500 rounded"></span>

                    )}

                  </Link>

                </NavbarItem>
              );
            })}
        </NavbarContent>

        {/* ================= RIGHT SIDE ================= */}

        <NavbarContent className="flex-1 flex justify-end items-center">

          {/* ===== Theme Toggle ===== */}

          <button
            onClick={() =>
              setTheme(
                theme === "dark"
                  ? "light"
                  : "dark"
              )
            }
            className="mr-3 p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:scale-105 transition"
          >

            {theme === "dark" ? (

              <FaSun className="text-yellow-400 text-lg" />

            ) : (

              <FaMoon className="text-black text-lg" />

            )}

          </button>

          {/* ===== Mobile Hamburger ===== */}

          <div className="lg:hidden mr-2">

            <button
              onClick={() =>
                setIsMenuOpen(
                  !isMenuOpen
                )
              }
              className="text-2xl p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >

              {isMenuOpen ? (

                <FaTimes />

              ) : (

                <FaBars />

              )}

            </button>

          </div>

          {/* ================= DESKTOP AUTH ================= */}

          <div className="hidden lg:block">

            {!user ? (

              <ul className="flex items-center gap-3">

                <li>

                  <Link
                    href="/login"
                    prefetch={true}
                  >

                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">

                      Login

                    </Button>

                  </Link>

                </li>

                <li>

                  <Link
                    href="/register"
                    prefetch={true}
                  >

                    <Button className="bg-gray-700 hover:bg-gray-800 text-white">

                      Sign Up

                    </Button>

                  </Link>

                </li>

              </ul>

            ) : (

              <div className="relative group flex items-center gap-4">

                {/* Avatar */}

                <Avatar
                  size="sm"
                  className="cursor-pointer"
                >

                  <Avatar.Image
                    alt={
                      user?.name ||
                      "User"
                    }
                    src={user?.image}
                    referrerPolicy="no-referrer"
                  />

                  <Avatar.Fallback>

                    {user?.name?.charAt(
                      0
                    ) || "G"}

                  </Avatar.Fallback>

                </Avatar>

                {/* Dropdown */}

                <div className="absolute right-0 top-10 w-56 bg-white dark:bg-[#0B1120] text-black dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden z-50">

                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">

                    <p className="font-semibold">

                      {user?.name ||
                        "User"}

                    </p>

                    <p className="text-sm text-gray-500 truncate">

                      {user?.email}

                    </p>

                  </div>

                  <Link
                    href="/profile"
                    prefetch={true}
                    className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >

                    My Profile

                  </Link>

                  <button
                    onClick={
                      handleLogout
                    }
                    className="w-full text-left px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition"
                  >

                    Logout

                  </button>

                </div>

              </div>
            )}
          </div>
        </NavbarContent>
      </Navbar>

      {/* ================= MOBILE MENU ================= */}

      {isMenuOpen && (

        <div className="lg:hidden bg-white dark:bg-[#0B1120] text-black dark:text-white border-t border-gray-300 dark:border-gray-700 px-6 py-4 space-y-3 transition-colors duration-300">

          {publicLinks.map((link) => {

            const isActive =
              pathname === link.path;

            return (

              <Link
                key={link.path}
                href={link.path}
                prefetch={true}
                onClick={() =>
                  setIsMenuOpen(
                    false
                  )
                }
                className={`block py-2 ${
                  isActive
                    ? "text-blue-400 font-semibold"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >

                {link.name}

              </Link>
            );
          })}

          {user &&
            privateLinks.map((link) => {

              const isActive =
                pathname === link.path;

              return (

                <Link
                  key={link.path}
                  href={link.path}
                  prefetch={true}
                  onClick={() =>
                    setIsMenuOpen(
                      false
                    )
                  }
                  className={`block py-2 ${
                    isActive
                      ? "text-blue-400 font-semibold"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >

                  {link.name}

                </Link>
              );
            })}

          <div className="border-t border-gray-300 dark:border-gray-700 pt-3"></div>

          {!user ? (

            <div className="space-y-3">

              <Link
                href="/login"
                prefetch={true}
              >

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">

                  Login

                </Button>

              </Link>

              <Link
                href="/register"
                prefetch={true}
              >

                <Button className="w-full bg-gray-700 hover:bg-gray-800 text-white">

                  Register

                </Button>

              </Link>

            </div>

          ) : (

            <div className="space-y-3">

              <Link
                href="/profile"
                prefetch={true}
                className="block py-2 text-gray-700 dark:text-gray-300"
              >

                My Profile

              </Link>

              <Button
                className="w-full"
                color="danger"
                onClick={() => {

                  handleLogout();

                  setIsMenuOpen(
                    false
                  );
                }}
              >

                Logout

              </Button>

            </div>
          )}
        </div>
      )}
    </div>
  );
}