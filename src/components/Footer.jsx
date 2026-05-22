import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {

  return (

    <footer className="
      bg-white dark:bg-[#071226]
      text-black dark:text-white
      border-t border-gray-200 dark:border-white/10
      py-12
      mt-auto
      transition-colors duration-300
    ">

      <div className="max-w-7xl mx-auto px-6">

        {/* MAIN GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ================= LOGO ================= */}

          <div>

            <Link
              href="/"
              className="flex items-center"
            >

              <h1 className="text-xl md:text-2xl lg:text-3xl font-black bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">

                TutorQueue

              </h1>

            </Link>

            <p className="mt-5 text-gray-600 dark:text-gray-400 leading-relaxed">

              Book expert tutors and manage your learning sessions with ease and flexibility.

            </p>

          </div>

          {/* ================= SERVICES ================= */}

          <div>

            <h3 className="text-xl font-bold mb-5">

              Services

            </h3>

            <ul className="space-y-3 text-gray-600 dark:text-gray-400">

              <li>

                <Link
                  href="/tutors"
                  className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                >

                  Find Tutors

                </Link>

              </li>

              <li>

                <Link
                  href="/my-bookings"
                  className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                >

                  Book Sessions

                </Link>

              </li>

              <li>

                <Link
                  href="/add-tutor"
                  className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                >

                  Become a Tutor

                </Link>

              </li>

              <li>

                <Link
                  href="/tutors"
                  className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                >

                  Learning Support

                </Link>

              </li>

            </ul>

          </div>

          {/* ================= CATEGORIES ================= */}

          <div>

            <h3 className="text-xl font-bold mb-5">

              Categories

            </h3>

            <ul className="space-y-3 text-gray-600 dark:text-gray-400">

              <li>

                <Link
                  href="/tutors?category=mathematics"
                  className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                >

                  Mathematics

                </Link>

              </li>

              <li>

                <Link
                  href="/tutors?category=physics"
                  className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                >

                  Physics

                </Link>

              </li>

              <li>

                <Link
                  href="/tutors?category=biology"
                  className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                >

                  Biology

                </Link>

              </li>

              <li>

                <Link
                  href="/tutors?category=programming"
                  className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                >

                  Programming

                </Link>

              </li>

              <li>

                <Link
                  href="/tutors?category=english"
                  className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                >

                  English

                </Link>

              </li>

            </ul>

          </div>

          {/* ================= SOCIAL ================= */}

          <div>

            <h3 className="text-xl font-bold mb-5">

              Follow Us

            </h3>

            <p className="text-gray-600 dark:text-gray-400 mb-5">

              Stay connected with us on social media.

            </p>

            <div className="flex gap-4">

              {/* FACEBOOK */}

              <Link
                href="https://facebook.com"
                target="_blank"
                className="
                  bg-gray-200 dark:bg-white/10
                  hover:bg-blue-600
                  hover:text-white
                  transition-all duration-300
                  p-3
                  rounded-full
                  text-lg
                "
              >

                <FaFacebookF />

              </Link>

              {/* INSTAGRAM */}

              <Link
                href="https://instagram.com"
                target="_blank"
                className="
                  bg-gray-200 dark:bg-white/10
                  hover:bg-pink-600
                  hover:text-white
                  transition-all duration-300
                  p-3
                  rounded-full
                  text-lg
                "
              >

                <FaInstagram />

              </Link>

              {/* LINKEDIN */}

              <Link
                href="https://linkedin.com"
                target="_blank"
                className="
                  bg-gray-200 dark:bg-white/10
                  hover:bg-blue-500
                  hover:text-white
                  transition-all duration-300
                  p-3
                  rounded-full
                  text-lg
                "
              >

                <FaLinkedinIn />

              </Link>

              {/* X */}

              <Link
                href="https://x.com"
                target="_blank"
                className="
                  bg-gray-200 dark:bg-white/10
                  hover:bg-black
                  hover:text-white
                  transition-all duration-300
                  p-3
                  rounded-full
                  text-lg
                "
              >

                <FaXTwitter />

              </Link>

            </div>

          </div>

        </div>

        {/* ================= BOTTOM ================= */}

        <div className="
          border-t border-gray-200 dark:border-white/10
          mt-12
          pt-6
          text-center
          text-gray-600 dark:text-gray-400
          text-sm
        ">

          © {new Date().getFullYear()} TutorQueue.
          All rights reserved.

        </div>

      </div>

    </footer>
  );
}