import {
  FaBookOpen,
  FaClock,
  FaLaptop,
  FaUserGraduate,
} from "react-icons/fa";

export default function WhyChooseUs() {
  return (
    <section className="py-6 md:py-10 lg:py-12 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        {/* ================= HEADING ================= */}

        <div className="text-center mb-8 md:mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black dark:text-white">
            Why Choose TutorQueue
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">
            We make learning smarter, easier, and more flexible.
          </p>
        </div>

        {/* ================= FEATURES GRID ================= */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* ================= CARD 1 ================= */}

          <div className="bg-gray-100 dark:bg-[#0B1220] border border-gray-200 dark:border-white/10 p-8 rounded-3xl text-center shadow-lg dark:shadow-[0_0_25px_rgba(59,130,246,0.15)] hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
            <FaUserGraduate className="text-5xl text-blue-600 dark:text-blue-500 mx-auto mb-5" />

            <h3 className="text-xl md:text-2xl font-black text-black dark:text-white">
              Expert Tutors
            </h3>

            <p className="text-gray-700 dark:text-gray-400 mt-4 leading-relaxed">
              Learn from experienced professionals with strong teaching
              backgrounds.
            </p>
          </div>

          {/* ================= CARD 2 ================= */}

          <div className="bg-gray-100 dark:bg-[#0B1220] border border-gray-200 dark:border-white/10 p-8 rounded-3xl text-center shadow-lg dark:shadow-[0_0_25px_rgba(59,130,246,0.15)] hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
            <FaClock className="text-5xl text-blue-600 dark:text-blue-500 mx-auto mb-5" />

            <h3 className="text-2xl font-black text-black dark:text-white">
              Flexible Schedule
            </h3>

            <p className="text-gray-700 dark:text-gray-400 mt-4 leading-relaxed">
              Book sessions anytime according to your personal availability.
            </p>
          </div>

          {/* ================= CARD 3 ================= */}

          <div className="bg-gray-100 dark:bg-[#0B1220] border border-gray-200 dark:border-white/10 p-8 rounded-3xl text-center shadow-lg dark:shadow-[0_0_25px_rgba(59,130,246,0.15)] hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
            <FaLaptop className="text-5xl text-blue-600 dark:text-blue-500 mx-auto mb-5" />

            <h3 className="text-2xl font-black text-black dark:text-white">
              Online & Offline
            </h3>

            <p className="text-gray-700 dark:text-gray-400 mt-4 leading-relaxed">
              Learn comfortably from anywhere with online or offline sessions.
            </p>
          </div>

          {/* ================= CARD 4 ================= */}

          <div className="bg-gray-100 dark:bg-[#0B1220] border border-gray-200 dark:border-white/10 p-8 rounded-3xl text-center shadow-lg dark:shadow-[0_0_25px_rgba(59,130,246,0.15)] hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
            <FaBookOpen className="text-5xl text-blue-600 dark:text-blue-500 mx-auto mb-5" />

            <h3 className="text-2xl font-black text-black dark:text-white">
              Easy Booking
            </h3>

            <p className="text-gray-700 dark:text-gray-400 mt-4 leading-relaxed">
              Smooth and quick tutor booking with a user-friendly experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}