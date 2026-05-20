// app/tutors/page.jsx

import Image from "next/image";
import Link from "next/link";

async function getTutors() {
  const res = await fetch("http://localhost:5000/tutors", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tutors");
  }

  return res.json();
}

export default async function TutorsPage() {
  const tutors = await getTutors();

  return (
    <div className="min-h-screen bg-[#020817] text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Our Tutors
      </h1>

      {/* 3 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tutors.map((tutor) => (
          <div
            key={tutor._id}
            className="bg-[#071226] border border-[#1e293b] rounded-3xl overflow-hidden shadow-lg hover:scale-[1.02] duration-300 flex flex-col"
          >
            {/* Tutor Image */}
            <Image
              src={tutor.photo}
              alt={tutor.tutorName}
              width={500}
              height={300}
              className="w-full h-64 object-cover"
            />

            {/* Tutor Info */}
            <div className="p-6 flex-1 flex flex-col">
              {/* Name + Subject */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold">
                  {tutor.tutorName}
                </h2>

                <span className="bg-blue-900/60 text-blue-300 text-sm px-4 py-2 rounded-full">
                  {tutor.subject}
                </span>
              </div>

              {/* Experience */}
              <p className="text-gray-300 mb-6">
                {tutor.experience} experience in{" "}
                {tutor.subject.toLowerCase()} teaching
              </p>

              {/* Fee + Time */}
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
    </div>
  );
}