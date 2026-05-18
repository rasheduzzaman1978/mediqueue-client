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
// import { authClient } from "@/lib/auth-client";

export default function CustomNavbar() {
  const pathname = usePathname();
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const user = {
    name: "John Doe",
    email: "john@example.com",
    image: "https://i.pravatar.cc/150?img=12",
    };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Tutors", path: "/tutors" },
    { name: "Add Tutor", path: "/add-tutor" },
    { name: "My Tutors", path: "/my-tutors" },
    { name: "My Booked Sessions", path: "/my-booked-sessions" },
    { name: "My Profile", path: "/profile" },
  ];

//   const userData = authClient.useSession();
//   const user = userData.data?.user;

//   const handleLogout = async () => {
//     await authClient.signOut();
//     // window.location.href = "/";
//   };
  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <div className="w-full shadow bg-gray-900 text-white sticky top-0 z-50">
      <Navbar maxWidth="full" className="px-2 md:px-6 py-3 bg-gray-900">

        {/* Left → Logo */}
        <NavbarContent justify="start" className="flex-1">
          <NavbarBrand>
            <Link href="/" className="font-bold text-xl md:text-2xl text-white">
              MediQueue
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* Center → Menu */}
        <NavbarContent justify="center" className="hidden md:flex flex-1 gap-8">
          {navLinks.map((link) => {
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

        {/* Right → Auth */}
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
              <ul className="flex items-center gap-4">
                <li>
                  <Link href="/login">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Login
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href="/register">
                    <Button className="bg-gray-700 hover:bg-gray-800 text-white">
                      Sign Up
                    </Button>
                  </Link>
                </li>
              </ul>
            ) : (
              <div className="flex items-center gap-4">
                <Avatar size="sm">
                  <Avatar.Image
                    alt={user?.name || "User"}
                    src={user?.image}
                    referrerPolicy="no-referrer"
                  />

                  <Avatar.Fallback>
                    {user?.name?.charAt(0) || "G"}
                  </Avatar.Fallback>
                </Avatar>

                <span className="hidden lg:block text-gray-300">
                  {user?.name || "Guest"}
                </span>

                <Button
                  variant="danger"
                  color="danger"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>

        </NavbarContent>
      </Navbar>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 text-white border-t border-gray-700 px-6 py-4 space-y-3">
          {navLinks.map((link) => {
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

          {!user ? (
            <Link href="/login" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Login
              </Button>
            </Link>
          ) : (
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
          )}
        </div>
      )}
    </div>
  );
}