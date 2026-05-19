
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#0B1120] text-white py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Logo */}
          <div>
            <Link
              href="/"
              className="flex items-center"
            >
              <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                TutorQueue
              </h1>
            </Link>

            <p className="mt-4 text-gray-400 leading-relaxed">
              Book expert tutors and manage your
              learning sessions with ease and
              flexibility.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Services
            </h3>

            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-blue-400 transition">
                <Link href="/tutors">
                  Find Tutors
                </Link>
              </li>

              <li className="hover:text-blue-400 transition">
                <Link href="/my-booked-sessions">
                  Book Sessions
                </Link>
              </li>

              <li className="hover:text-blue-400 transition">
                <Link href="/add-tutor">
                  Become a Tutor
                </Link>
              </li>

              <li className="hover:text-blue-400 transition">
                <Link href="/tutors">
                  Learning Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Categories
            </h3>

            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/tutors?category=mathematics"
                  className="hover:text-blue-400 transition"
                >
                  Mathematics
                </Link>
              </li>
              <li className="hover:text-blue-400 transition">
                <Link
                  href="/tutors?category=physics"
                  className="hover:text-blue-400 transition"
                >
                  Physics
                </Link>
              </li>
              <li className="hover:text-blue-400 transition">
                <Link
                  href="/tutors?category=biology"
                  className="hover:text-blue-400 transition"
                >
                  Biology
                </Link>
              </li>
              <li className="hover:text-blue-400 transition">
                <Link
                  href="/tutors?category=programming"
                  className="hover:text-blue-400 transition"
                >
                  Programming
                </Link>
              </li>
              <li className="hover:text-blue-400 transition">
                <Link
                  href="/tutors?category=english"
                  className="hover:text-blue-400 transition"
                >
                  English
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Follow Us
            </h3>

            <div className="flex gap-4 mt-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="bg-white/10 p-3 rounded-full hover:bg-blue-600 transition"
              >
                <FaFacebookF />
              </Link>

              <Link
                href="https://instagram.com"
                target="_blank"
                className="bg-white/10 p-3 rounded-full hover:bg-pink-600 transition"
              >
                <FaInstagram />
              </Link>

              <Link
                href="https://linkedin.com"
                target="_blank"
                className="bg-white/10 p-3 rounded-full hover:bg-blue-500 transition"
              >
                <FaLinkedinIn />
              </Link>

              <Link
                href="https://x.com"
                target="_blank"
                className="bg-white/10 p-3 rounded-full hover:bg-gray-700 transition"
              >
                <FaXTwitter />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 pt-5 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} TutorQueue.
          All rights reserved.
        </div>
      </div>
    </footer>
  );
}