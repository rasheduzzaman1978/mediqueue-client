"use client";

import {
  useEffect,
  useState,
} from "react";

import Image from "next/image";

import Link from "next/link";

import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import {
  Autoplay,
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    title: "Book Trusted Tutors",
    highlight: "Anytime, Anywhere",
    description:
      "Find experienced tutors for online and offline learning with flexible schedules.",
    image:
      "https://i.ibb.co.com/Z1mNvmmN/rashed.jpg",
  },

  {
    id: 2,
    title: "Learn From Expert Mentors",
    highlight: "Boost Your Skills",
    description:
      "Connect with qualified tutors to improve academic performance and confidence.",
    image:
      "https://i.ibb.co.com/L3Fk78D/htaser.jpg",
  },

  {
    id: 3,
    title:
      "Flexible Learning Experience",
    highlight:
      "At Your Convenience",
    description:
      "Schedule classes based on your availability and learn at your own pace.",
    image:
      "https://i.ibb.co/dsdPL34f/Whats-App-Image-2025-12-24-at-7-36-27-PM.avif",
  },
];

export default function HeroSection() {

  // ================= HYDRATION FIX =================

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {

    setMounted(true);

  }, []);

  if (!mounted) {

    return null;
  }

  return (

    <section className="max-w-7xl mx-auto px-6 py-6 md:py-10 lg:py-12">

      <Swiper
        modules={[
          Autoplay,
          Pagination,
        ]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction:
            false,
        }}
        pagination={{
          clickable: true,
        }}
        className="rounded-3xl overflow-hidden"
      >

        {slides.map((slide) => (

          <SwiperSlide
            key={slide.id}
          >

            <div className="grid lg:grid-cols-2 gap-10 items-center bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-8 md:p-14 rounded-3xl shadow-xl dark:shadow-2xl transition-all duration-300">

              {/* LEFT CONTENT */}

              <div>

                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4 tracking-wide uppercase text-sm">

                  Smart Tutor Booking Platform

                </p>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-black dark:text-white">

                  {slide.title}

                  <span className="block text-blue-600 dark:text-blue-500 mt-3">

                    {slide.highlight}

                  </span>

                </h1>

                <p className="mt-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">

                  {slide.description}

                </p>

                {/* BUTTONS */}

                <div className="flex flex-wrap gap-4 mt-8">

                  <Link
                    href="/tutors"
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-7 py-3 rounded-xl font-semibold text-white hover:scale-105 active:scale-95 transition-all duration-300"
                  >

                    Explore Tutors

                  </Link>

                  <Link
                    href="/add-tutor"
                    className="border border-gray-300 dark:border-white/20 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-white/10 px-7 py-3 rounded-xl font-semibold text-black dark:text-white transition-all duration-300"
                  >

                    Become a Tutor

                  </Link>

                </div>

              </div>

              {/* RIGHT IMAGE */}

              <div className="relative">

                <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>

                <Image
                  src={slide.image}
                  alt="Tutor Banner"
                  width={700}
                  height={700}
                  priority
                  className="relative rounded-3xl shadow-2xl object-cover w-full h-[400px] hover:scale-[1.02] transition-transform duration-500"
                />

              </div>

            </div>

          </SwiperSlide>
        ))}

      </Swiper>

    </section>
  );
}