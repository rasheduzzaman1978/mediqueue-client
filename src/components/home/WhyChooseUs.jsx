import {
  FaBookOpen,
  FaClock,
  FaLaptop,
  FaUserGraduate,
} from "react-icons/fa";

export default function WhyChooseUs() {
  return (
    <section className="bg-[#0B1120] py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">
            Why Choose TutorQueue
          </h2>

          <p className="text-gray-400 mt-4">
            We make learning smarter and easier.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white/5 p-8 rounded-3xl text-center hover:bg-white/10 transition">
            <FaUserGraduate className="text-5xl text-blue-500 mx-auto mb-5" />

            <h3 className="text-2xl font-bold">
              Expert Tutors
            </h3>

            <p className="text-gray-400 mt-4">
              Learn from experienced professionals.
            </p>
          </div>

          <div className="bg-white/5 p-8 rounded-3xl text-center hover:bg-white/10 transition">
            <FaClock className="text-5xl text-blue-500 mx-auto mb-5" />

            <h3 className="text-2xl font-bold">
              Flexible Schedule
            </h3>

            <p className="text-gray-400 mt-4">
              Book sessions anytime you want.
            </p>
          </div>

          <div className="bg-white/5 p-8 rounded-3xl text-center hover:bg-white/10 transition">
            <FaLaptop className="text-5xl text-blue-500 mx-auto mb-5" />

            <h3 className="text-2xl font-bold">
              Online & Offline
            </h3>

            <p className="text-gray-400 mt-4">
              Learn from anywhere comfortably.
            </p>
          </div>

          <div className="bg-white/5 p-8 rounded-3xl text-center hover:bg-white/10 transition">
            <FaBookOpen className="text-5xl text-blue-500 mx-auto mb-5" />

            <h3 className="text-2xl font-bold">
              Easy Booking
            </h3>

            <p className="text-gray-400 mt-4">
              Smooth and quick tutor booking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}