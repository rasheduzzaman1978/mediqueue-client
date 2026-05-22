"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
} from "next/navigation";

import Link from "next/link";

export default function FindTutorsPage() {

  const searchParams =
    useSearchParams();

  // GET CATEGORY

  const category =
    searchParams.get(
      "category"
    );

  const [tutors, setTutors] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH FILTERED TUTORS

  useEffect(() => {

    async function fetchTutors() {

      try {

        const res = await fetch(
          `http://127.0.0.1:5000/tutors?category=${category}`
        );

        const data =
          await res.json();

        setTutors(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    }

    fetchTutors();

  }, [category]);

  // LOADING

  if (loading) {

    return (

      <div className="min-h-screen bg-gray-100 dark:bg-gradient-to-b dark:from-[#020817] dark:to-[#071226] flex items-center justify-center text-black dark:text-white text-3xl font-black transition-colors duration-300">

        Loading...

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100 dark:bg-gradient-to-b dark:from-[#020817] dark:to-[#071226] text-black dark:text-white px-6 py-10 transition-colors duration-300">

      {/* HEADING */}

      <div className="mb-10">

        <h1 className="text-3xl md:text-5xl font-black mb-4 capitalize">

          {category} Tutors

        </h1>

        <p className="text-gray-600 dark:text-gray-400 text-lg">

          Find expert tutors based on your preferred category.

        </p>

      </div>

      {/* EMPTY STATE */}

      {tutors.length === 0 ? (

        <div className="
          bg-white dark:bg-white/5
          backdrop-blur-md
          border border-gray-200 dark:border-white/10
          rounded-3xl
          p-16
          text-center
          shadow-xl
          transition-all duration-300
        ">

          <h2 className="text-3xl font-black mb-4">

            No Tutors Found

          </h2>

          <p className="text-gray-600 dark:text-gray-400">

            No tutors available in this category.

          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {tutors.map((tutor) => (

            <div
              key={tutor._id}
              className="
                bg-white dark:bg-white/5
                backdrop-blur-md
                border border-gray-200 dark:border-white/10
                rounded-3xl
                p-6
                shadow-lg
                hover:-translate-y-2
                hover:shadow-2xl
                transition-all duration-300
                flex flex-col
              "
            >

              {/* Tutor Name */}

              <h2 className="text-2xl font-black mb-3">

                {tutor.tutorName}

              </h2>

              {/* Subject */}

              <p className="text-blue-500 dark:text-blue-400 text-lg font-medium mb-4">

                {tutor.subject}

              </p>

              {/* Experience */}

              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed flex-1">

                {tutor.experience}

              </p>

              {/* Footer */}

              <div className="flex items-center justify-between pt-5 border-t border-gray-200 dark:border-white/10">

                <span className="text-sm text-gray-600 dark:text-gray-400">

                  ${tutor.hourlyFee}/hr

                </span>

                <Link
                  href={`/tutors/${tutor._id}`}
                  className="
                    bg-blue-600
                    hover:bg-blue-700
                    dark:bg-blue-500
                    dark:hover:bg-blue-600
                    text-white
                    px-5 py-2
                    rounded-xl
                    font-semibold
                    transition-all duration-300
                  "
                >

                  View Details

                </Link>

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}