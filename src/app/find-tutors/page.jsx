"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
} from "next/navigation";

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
      <div className="min-h-screen bg-[#020817] flex items-center justify-center text-white text-3xl font-black">

        Loading...

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#020817] text-white px-6 py-16">

      {/* HEADING */}

      <h1 className="text-3xl md:text-5xl font-black mb-12 py-4">

        {category} Tutors

      </h1>

      {/* EMPTY STATE */}

      {tutors.length === 0 ? (

        <div className="bg-[#071226] rounded-3xl p-16 text-center">

          <h2 className="text-3xl font-black mb-4">

            No Tutors Found

          </h2>

          <p className="text-gray-400">

            No tutors available in this category.

          </p>
        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {tutors.map((tutor) => (

            <div
              key={tutor._id}
              className="bg-[#071226] rounded-3xl p-6"
            >

              <h2 className="text-3xl font-black mb-3">

                {tutor.tutorName}

              </h2>

              <p className="text-blue-400 text-lg">

                {tutor.subject}

              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}