"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";

import { Avatar, Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function CustomNavbar() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userData = authClient.useSession();
  const user = userData.data?.user;

  // Public Links
  const publicLinks = [
    { name: "Home", path: "/" },
    { name: "Tutors", path: "/tutors" },
  ];

  // Private Links
  const privateLinks = [
    { name: "Add Tutor", path: "/add-tutor" },
    { name: "My Tutors", path: "/my-tutors" },
    { name: "My Booked Sessions", path: "/my-booked-sessions" },
  ];

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <div className="w-full shadow bg-gray-900 text-white sticky top-0 z-50">
      <Navbar maxWidth="full" className="px-2 md:px-4 py-1 bg-gray-900">
        {/* Left → Logo */}
        <NavbarContent justify="start" className="flex-1">
          <NavbarBrand>
           <Link
            href="/"
            className="flex items-center"
          >
            <Image
              src="/logo.png"
              alt="TutorHub Logo"
              width={120}
              height={120}
              priority
              className="object-contain"
            />
          </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* Center → Menu */}
        <NavbarContent
          justify="center"
          className="hidden md:flex flex-1 items-center space-x-6"
        >

          {/* Public Links */}
          {publicLinks.map((link) => {
            const isActive = pathname === link.path;

            return (
              <NavbarItem key={link.path}>
                <Link
                  href={link.path}
                  className={`relative transition ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-gray-300 hover:text-white"
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

          {/* Private Links */}
          {user &&
            privateLinks.map((link) => {
              const isActive = pathname === link.path;

              return (
                <NavbarItem key={link.path}>
                  <Link
                    href={link.path}
                    className={`relative transition ${
                      isActive
                        ? "text-white font-semibold"
                        : "text-gray-300 hover:text-white"
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

        {/* Right Side */}
        <NavbarContent className="flex-1 flex justify-end items-center">

          {/* Mobile Hamburger */}
          <div className="md:hidden mr-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-2xl p-2 rounded-lg hover:bg-gray-800 transition"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:block">
            {!user ? (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Login
                  </Button>
                </Link>

                <Link href="/register">
                  <Button className="bg-gray-700 hover:bg-gray-800 text-white">
                    Register
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="relative group">

                {/* Avatar */}
                <Avatar
                  size="sm"
                  src={user?.image}
                  className="cursor-pointer"
                />

                {/* Dropdown */}
                <div className="absolute right-0 mt-3 w-52 bg-white text-black rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden z-50">

                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold">
                      {user?.name || "User"}
                    </p>

                    <p className="text-sm text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>

                  <Link
                    href="/profile"
                    className="block px-4 py-3 hover:bg-gray-100 transition"
                  >
                    My Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-500 transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </NavbarContent>
      </Navbar>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 text-white border-t border-gray-700 px-6 py-4 space-y-3">

          {/* Public Links */}
          {publicLinks.map((link) => {
            const isActive = pathname === link.path;

            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 ${
                  isActive
                    ? "text-blue-400 font-semibold"
                    : "text-gray-300"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Private Links */}
          {user &&
            privateLinks.map((link) => {
              const isActive = pathname === link.path;

              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 ${
                    isActive
                      ? "text-blue-400 font-semibold"
                      : "text-gray-300"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

          <div className="border-t border-gray-700 pt-3"></div>

          {/* Mobile Auth */}
          {!user ? (
            <div className="space-y-3">

              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Login
                </Button>
              </Link>

              <Link
                href="/register"
                onClick={() => setIsMenuOpen(false)}
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
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-gray-300"
              >
                My Profile
              </Link>

              <Button
                className="w-full"
                color="danger"
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
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