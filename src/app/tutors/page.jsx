// app/tutors/page.jsx

import Image from "next/image";
import Link from "next/link";

async function getTutors() {

  const res = await fetch(
    "http://localhost:5000/tutors",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {

    throw new Error(
      "Failed to fetch tutors"
    );
  }

  return res.json();
}

export default async function TutorsPage() {

  const tutors =
    await getTutors();

  return (

    <div className="min-h-screen bg-gray-100 dark:bg-gradient-to-b dark:from-[#020817] dark:to-[#071226] text-black dark:text-white px-6 py-12 transition-colors duration-300">

      {/* Heading */}

      <div className="text-center mb-14">

        <h1 className="text-4xl md:text-5xl font-black mb-4">

          Our Tutors

        </h1>

        <p className="text-gray-600 dark:text-gray-400 text-lg">

          Learn from expert tutors and book your preferred session easily.

        </p>

      </div>

      {/* Tutors Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {tutors.map((tutor) => (

          <div
            key={tutor._id}
            className="
              bg-white dark:bg-white/5
              backdrop-blur-md
              border border-gray-200 dark:border-white/10
              rounded-3xl
              overflow-hidden
              shadow-lg dark:shadow-2xl
              hover:-translate-y-2
              hover:shadow-2xl
              transition-all duration-300
              flex flex-col
            "
          >

            {/* Tutor Image */}

            <div className="overflow-hidden">

              <Image
                src={tutor.photo}
                alt={tutor.tutorName}
                width={500}
                height={300}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              />

            </div>

            {/* Tutor Info */}

            <div className="p-6 flex-1 flex flex-col">

              {/* Name + Subject */}

              <div className="flex justify-between items-start gap-4 mb-4">

                <h2 className="text-2xl font-black leading-tight">

                  {tutor.tutorName}

                </h2>

                <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold px-4 py-2 rounded-full whitespace-nowrap">

                  {tutor.subject}

                </span>

              </div>

              {/* Experience */}

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">

                {tutor.experience} experience in{" "}
                {tutor.subject.toLowerCase()} teaching

              </p>

              {/* Fee + Time */}

              <div className="flex justify-between items-center mt-auto text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-white/10 pt-5">

                <span className="font-semibold">

                  ${tutor.hourlyFee}/hr

                </span>

                <span>

                  {tutor.availableTime}

                </span>

              </div>

              {/* Button */}

              <div className="pt-6">

                <Link
                  href={`/tutors/${tutor._id}`}
                >

                  <button
                    className="
                      w-full
                      bg-blue-600
                      hover:bg-blue-700
                      dark:bg-blue-500
                      dark:hover:bg-blue-600
                      transition-all duration-300
                      py-4
                      rounded-2xl
                      font-bold
                      text-lg
                      text-white
                      hover:scale-[1.02]
                    "
                  >

                    Book Session

                  </button>

                </Link>

              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}