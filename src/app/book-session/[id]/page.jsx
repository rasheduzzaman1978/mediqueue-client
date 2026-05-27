import BookingForm from "@/components/BookingForm";

import Link from "next/link";

import { X } from "lucide-react";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function getTutor(id, token = null) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${id}`,
    {
      cache: "no-store",
      headers: token
        ? {
            authorization: `Bearer ${token}`,
          }
        : {},
    }
  );

  return res.json();
}

export default async function BookSessionPage({
  params,
}) {

  const { id } = await params;

  const session = await auth.api.getToken({
    headers: await headers(),
  });

  const token = session?.token;

  const tutor = await getTutor(id, token);

  return (

    <div className="min-h-screen bg-gray-100 dark:bg-gradient-to-b dark:from-[#020817] dark:to-[#071226] text-black dark:text-white px-4 md:px-6 py-12 transition-colors duration-300">

      <div className="
        max-w-3xl mx-auto
        bg-white dark:bg-white/5
        backdrop-blur-xl
        border border-gray-200 dark:border-white/10
        rounded-3xl
        p-8 md:p-10
        shadow-2xl
        transition-all duration-300
      ">

        {/* Header */}

        <div className="flex items-start justify-between mb-10">

          <div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black">

              Book Session

            </h1>

            <p className="text-gray-600 dark:text-gray-400 mt-3">

              Confirm your booking details and reserve your tutor session.

            </p>

          </div>

          {/* Cross Icon */}

          <Link
            href="/tutors"
            className="
              p-2 rounded-xl
              text-gray-500 dark:text-gray-400
              hover:text-black dark:hover:text-white
              hover:bg-gray-200 dark:hover:bg-white/10
              transition-all duration-300
            "
          >

            <X size={32} />

          </Link>

        </div>

        {/* Tutor Preview */}

        <div className="
          flex items-center gap-4
          bg-gray-100 dark:bg-[#0B1730]
          border border-gray-200 dark:border-white/10
          rounded-2xl
          p-5
          mb-8
        ">

          <Image
            src={tutor?.photo || "/default-user.png"}
            alt={tutor?.tutorName || "Tutor"}
            width={64}
            height={64}
            className="rounded-full object-cover border-2 border-blue-500"
          />

          <div>

            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">

              {tutor.tutorName}

            </h2>

            <p className="text-gray-600 dark:text-gray-400">

              {tutor.subject}

            </p>

          </div>

        </div>

        {/* Booking Form */}

        <BookingForm tutor={tutor} />

      </div>

    </div>
  );
}