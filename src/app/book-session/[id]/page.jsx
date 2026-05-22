import BookingForm from "@/components/BookingForm";
import Link from "next/link";
import { X } from "lucide-react";

async function getTutor(id) {

  const res = await fetch(
    `http://127.0.0.1:5000/tutors/${id}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function BookSessionPage({
  params,
}) {

  const { id } = await params;

  const tutor = await getTutor(id);

  return (

    <div className="min-h-screen bg-[#020817] text-white p-10">

      <div className="max-w-3xl mx-auto bg-[#071226] border border-white/10 rounded-3xl p-10">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">

          <h1 className="text-3xl md:text-4xl font-black">
            Book Session
          </h1>

          {/* Cross Icon */}
          <Link
            href="/tutors"
            className="text-gray-400 hover:text-white transition"
          >

            <X size={32} />

          </Link>

        </div>

        {/* Booking Form */}
        <BookingForm tutor={tutor} />

      </div>

    </div>
  );
}