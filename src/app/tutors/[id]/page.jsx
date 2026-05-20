// app/tutors/[id]/page.jsx

import Image from "next/image";
import Link from "next/link";
import { BsPencil, BsTrash2 } from "react-icons/bs";

async function getTutor(id) {
  try {
    const res = await fetch(
      `http://localhost:5000/tutors/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return null;
    }

    return await res.json();

  } catch (error) {

    console.log(error);

    return null;
  }
}

export default async function TutorDetailsPage({
  params,
}) {

  const { id } = await params;

  const tutor = await getTutor(id);

  // Tutor Not Found
  if (!tutor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020817] text-white text-3xl font-bold">
        Tutor Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020817] text-white px-4 md:px-6 py-12">

      {/* Main Container */}
      <div className="max-w-7xl mx-auto bg-[#071226]/90 backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.4)]">

        {/* Top Actions */}
        <div className="flex items-center justify-between px-6 pt-6">

          <Link
            href="/tutors"
            className="text-gray-400 hover:text-white transition text-sm"
          >
            ← Back to Tutors
          </Link>

          <div className="flex items-center gap-3">

            {/* Edit */}
            <button className="flex items-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 transition px-4 py-2 rounded-xl text-sm font-medium text-white">

              <BsPencil size={16} />

              Edit
            </button>

            {/* Delete */}
            <button className="flex items-center gap-2 border border-red-500/20 text-red-400 bg-red-500/10 hover:bg-red-500/20 transition px-4 py-2 rounded-xl text-sm font-medium">

              <BsTrash2 size={16} />

              Delete
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-16 p-6">

          {/* Left Side Image */}
          <div className="relative overflow-hidden rounded-xl">

            <Image
              src={tutor.photo}
              alt={tutor.tutorName}
              width={700}
              height={700}
              priority
              className="w-full h-full object-cover lg:h-[750px]"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

            {/* Subject Badge */}
            <div className="absolute top-6 left-6 bg-blue-600 px-5 py-2 rounded-full text-sm font-semibold shadow-lg">
              {tutor.subject}
            </div>

            {/* Floating Availability */}
            <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4">

              <p className="text-gray-300 text-sm">
                Available Time
              </p>

              <h3 className="text-xl font-bold mt-1">
                {tutor.availableTime}
              </h3>
            </div>
          </div>

          {/* Right Content */}
          <div className="p-4 lg:p-8 flex flex-col justify-center">

            {/* Name */}
            <h1 className="text-5xl lg:text-6xl font-black mb-5 leading-tight tracking-tight">
              {tutor.tutorName}
            </h1>

            {/* Experience */}
            <p className="text-gray-300 text-lg leading-relaxed mb-10">
              {tutor.experience}
            </p>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

              {/* Institution */}
              <div className="bg-white/[0.03] hover:bg-white/[0.05] transition border border-white/10 rounded-2xl p-6">

                <p className="text-gray-400 text-sm mb-2">
                  Institution
                </p>

                <h3 className="font-semibold text-lg">
                  {tutor.institution}
                </h3>
              </div>

              {/* Location */}
              <div className="bg-white/[0.03] hover:bg-white/[0.05] transition border border-white/10 rounded-2xl p-6">

                <p className="text-gray-400 text-sm mb-2">
                  Location
                </p>

                <h3 className="font-semibold text-lg">
                  {tutor.location}
                </h3>
              </div>

              {/* Available Days */}
              <div className="bg-white/[0.03] hover:bg-white/[0.05] transition border border-white/10 rounded-2xl p-6">

                <p className="text-gray-400 text-sm mb-2">
                  Available Days
                </p>

                <h3 className="font-semibold text-lg">
                  {tutor.availableDays}
                </h3>
              </div>

              {/* Teaching Mode */}
              <div className="bg-white/[0.03] hover:bg-white/[0.05] transition border border-white/10 rounded-2xl p-6">

                <p className="text-gray-400 text-sm mb-2">
                  Teaching Mode
                </p>

                <h3 className="font-semibold text-lg">
                  {tutor.teachingMode}
                </h3>
              </div>

              {/* Session Start */}
              <div className="bg-white/[0.03] hover:bg-white/[0.05] transition border border-white/10 rounded-2xl p-6">

                <p className="text-gray-400 text-sm mb-2">
                  Session Start
                </p>

                <h3 className="font-semibold text-lg">
                  {tutor.sessionStartDate}
                </h3>
              </div>

              {/* Total Slots */}
              <div className="bg-white/[0.03] hover:bg-white/[0.05] transition border border-white/10 rounded-2xl p-6">

                <p className="text-gray-400 text-sm mb-2">
                  Total Slots
                </p>

                <h3 className="font-semibold text-lg">
                  {tutor.totalSlot}
                </h3>
              </div>
            </div>

            {/* Bottom Booking Box */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 border border-blue-500/20 rounded-[28px] p-8 mt-4">

              {/* Hourly Fee */}
              <div>

                <p className="text-gray-400 text-sm">
                  Hourly Fee
                </p>

                <h2 className="text-5xl font-black text-blue-400 mt-2">
                  $
                  {tutor.hourlyFee}
                  <span className="text-2xl">
                    /hr
                  </span>
                </h2>
              </div>

              {/* Booking Button */}
              <button className="bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-300 px-10 py-4 rounded-2xl font-bold text-lg shadow-[0_10px_30px_rgba(37,99,235,0.4)]">

                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}