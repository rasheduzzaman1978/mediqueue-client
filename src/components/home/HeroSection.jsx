"use client";

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    title: "Book Trusted Tutors",
    highlight: "Anytime, Anywhere",
    description:
      "Find experienced tutors for online and offline learning with flexible schedules.",
    image: "https://i.ibb.co.com/7t8B7H2d/images.jpg",
  },
  {
    id: 2,
    title: "Learn From Expert Mentors",
    highlight: "Boost Your Skills",
    description:
      "Connect with qualified tutors to improve academic performance and confidence.",
    image: "https://i.ibb.co.com/RG5fTqDJ/images.webp",
  },
  {
    id: 3,
    title: "Flexible Learning Experience",
    highlight: "At Your Convenience",
    description:
      "Schedule classes based on your availability and learn at your own pace.",
    image: "https://i.ibb.co.com/dsdPL34f/Whats-App-Image-2025-12-24-at-7-36-27-PM.avif",
  },
];

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10 md:py-16">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="rounded-3xl overflow-hidden"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="grid lg:grid-cols-2 gap-10 items-center bg-[#0F172A] p-8 md:p-14 rounded-3xl">

              {/* Left Content */}
              <div>
                <p className="text-blue-400 font-semibold mb-4">
                  Smart Tutor Booking Platform
                </p>

                <h1 className="text-3xl md:text-5xl font-black leading-tight text-white">
                  {slide.title}
                  <span className="block text-blue-500 mt-2">
                    {slide.highlight}
                  </span>
                </h1>

                <p className="mt-6 text-gray-300 text-lg leading-relaxed">
                  {slide.description}
                </p>

                <div className="flex flex-wrap gap-4 mt-8">
                  <Link
                    href="/tutors"
                    className="bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-xl font-semibold text-white transition"
                  >
                    Explore Tutors
                  </Link>

                  <Link
                    href="/add-tutor"
                    className="border border-white/20 hover:border-blue-500 px-7 py-3 rounded-xl font-semibold text-white transition"
                  >
                    Become a Tutor
                  </Link>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>

                <Image
                  src={slide.image}
                  alt="Tutor Banner"
                  width={700}
                  height={700}
                  className="relative rounded-3xl shadow-2xl object-cover w-full h-[400px]"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}