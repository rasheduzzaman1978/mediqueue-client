import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">

        {/* Left */}
        <div>
          <p className="text-blue-400 font-semibold mb-4">
            Smart Tutor Booking Platform
          </p>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
            Book Trusted Tutors
            <span className="block text-blue-500">
              Anytime, Anywhere
            </span>
          </h1>

          <p className="mt-6 text-gray-400 text-lg leading-relaxed">
            TutorQueue helps students connect with
            experienced tutors for online and offline
            learning sessions with flexible schedules.
          </p>

          <div className="flex flex-row md:flex-wrap gap-2 md:gap-4 mt-8">
            <Link
              href="/tutors"
              className="bg-blue-600 hover:bg-blue-700 px-7 py-3 text-sm md:text-base rounded-xl font-semibold transition"
            >
              Explore Tutors
            </Link>

            <Link
              href="/add-tutor"
              className="border border-white/20 hover:border-blue-500 px-7 py-3 rounded-xl font-semibold transition"
            >
              Become a Tutor
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>

          <Image
            src="https://i.ibb.co.com/7t8B7H2d/images.jpg"
            alt="Tutor"
            width={700}
            height={700}
            className="relative rounded-3xl shadow-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}