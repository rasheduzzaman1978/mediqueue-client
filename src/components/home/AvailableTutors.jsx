"use client";

import Image from "next/image";
import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

export default function AvailableTutors() {

  const [tutors, setTutors] = useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetch(
      "http://localhost:5000/featured-tutors"
    )
      .then((res) => res.json())

      .then((data) => {
        setTutors(data);

        setLoading(false);
      });

  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      {/* Heading */}
      <div className="text-center mb-14">

        <h2 className="text-4xl font-bold">
          Available Tutors
        </h2>

        <p className="text-gray-400 mt-4">
          Discover experienced tutors easily.
        </p>
      </div>

      {/* Loading */}
      {loading ? (

        <div className="text-center text-xl">
          Loading Tutors...
        </div>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {tutors.map((tutor) => (

            <div
              key={tutor._id}
               className="bg-[#071226] border border-[#1e293b] rounded-3xl overflow-hidden shadow-lg hover:scale-[1.02] duration-300 flex flex-col"
            >

              {/* Image */}
              <Image
                src={tutor.photo}
                alt={tutor.tutorName}
                width={500}
                height={300}
                className="w-full h-60 object-cover"
              />

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">

                <div className="flex justify-between items-center gap-3">

                  <h3 className="text-2xl font-bold">
                    {tutor.tutorName}
                  </h3>

                  <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                    {tutor.subject}
                  </span>
                </div>

                <p className="text-gray-400 mt-4 line-clamp-2">
                  {tutor.experience}
                </p>

                <div className="flex justify-between mt-6 text-sm text-gray-300">
                  <span>
                    ${tutor.hourlyFee}/hr
                  </span>

                  <span>
                    {tutor.availableTime}
                  </span>
                </div>

                <div className="mt-auto pt-6">
                  <Link href={`/tutors/${tutor._id}`}>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 transition-all py-4 rounded-2xl font-bold text-lg">
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