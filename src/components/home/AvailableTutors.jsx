"use client";

import Image from "next/image";
import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

export default function AvailableTutors() {
  const [tutors, setTutors] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // ================= FETCH TUTORS =================

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/featured-tutors`
    )
      .then((res) =>
        res.json()
      )

      .then((data) => {
        setTutors(data);

        setLoading(false);
      })

      .catch((error) => {
        console.log(error);

        setLoading(false);
      });
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-6 md:py-10 lg:py-12 bg-transparent">
      {/* ================= HEADING ================= */}

      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black dark:text-white">
          Available Tutors
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">
          Discover experienced tutors easily and book sessions instantly.
        </p>
      </div>

      {/* ================= LOADING ================= */}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-xl md:text-2xl font-bold text-black dark:text-white">
            Loading Tutors...
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutors.map((tutor) => (
            <div
              key={tutor._id}
              className="bg-gray-100 dark:bg-[#0B1220] border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-lg dark:shadow-[0_0_25px_rgba(59,130,246,0.15)] hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* ================= IMAGE ================= */}

              <div className="overflow-hidden">
                <Image
                  src={tutor.photo}
                  alt={tutor.tutorName}
                  width={500}
                  height={300}
                  className="w-full h-60 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* ================= CONTENT ================= */}

              <div className="p-6 flex-1 flex flex-col">
                {/* NAME + SUBJECT */}

                <div className="flex justify-between items-center gap-3">
                  <h3 className="text-2xl font-black text-black dark:text-white">
                    {tutor.tutorName}
                  </h3>

                  <span className="bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                    {tutor.subject}
                  </span>
                </div>

                {/* EXPERIENCE */}

                <p className="text-gray-700 dark:text-gray-400 mt-4 line-clamp-2 leading-relaxed">
                  {tutor.experience}
                </p>

                {/* FEE + TIME */}

                <div className="flex justify-between mt-6 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-white/10 pt-5">
                  <span className="font-semibold">
                    ${tutor.hourlyFee}/hr
                  </span>

                  <span>
                    {
                      tutor.availableTime
                    }
                  </span>
                </div>

                {/* BUTTON */}

                <div className="mt-auto pt-6">
                  <Link
                    href={`/tutors/${tutor._id}`}
                  >
                    <button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-300 py-4 rounded-2xl font-bold text-lg text-white hover:scale-[1.02] active:scale-95">
                      Book Session
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}