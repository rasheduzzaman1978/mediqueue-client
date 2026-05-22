"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";

export default function BookingForm({
  tutor,
}) {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  // Hydration Fix
  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {

    setMounted(true);

  }, []);

  // Better Auth Session
  const { data: session } =
    authClient.useSession();

  const handleBooking = async (e) => {

    e.preventDefault();

    setLoading(true);

    const form = e.target;

    const bookingData = {

      studentName:
        form.studentName.value,

      phone:
        form.phone.value,

      tutorId:
        tutor._id,

      tutorName:
        tutor.tutorName,

      studentEmail:
        session?.user?.email,
    };

    try {

      const res = await fetch(
        "http://127.0.0.1:5000/bookings",
        {
          method: "POST",

          headers: {
            "content-type":
              "application/json",
          },

          body: JSON.stringify(
            bookingData
          ),
        }
      );

      const data = await res.json();

      if (data.success) {

        toast.success(
          "Booking successful"
        );

        router.push("/tutors");

        router.refresh();

      } else {

        toast.error(
          data.message
        );
      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {

    return null;
  }

  return (

    <form
      onSubmit={handleBooking}
      className="space-y-6"
    >

      {/* Student Name */}
      <div>

        <label className="block mb-2 text-sm text-gray-400">
          Student Name:
        </label>

        <input
          type="text"
          name="studentName"
          required
          defaultValue={
            session?.user?.name || ""
          }
          className="w-full bg-gray-100 dark:bg-[#0B1730] border border-white/10 rounded-xl px-5 py-3 outline-none"
        />

      </div>

      {/* Phone */}
      <div>

        <label className="block mb-2 text-sm text-gray-400">
          Phone:
        </label>

        <input
          type="text"
          name="phone"
          required
          placeholder="Enter phone number"
          className="w-full bg-gray-100 dark:bg-[#0B1730] border border-white/10 rounded-xl px-5 py-3 outline-none"
        />

      </div>

      {/* Tutor ID */}
      <div>

        <label className="block mb-2 text-sm text-gray-400">
          Tutor ID:
        </label>

        <input
          type="text"
          value={tutor._id}
          readOnly
          className="w-full bg-gray-100 dark:bg-[#0B1730] border border-white/10 rounded-xl px-5 py-3 outline-none"
        />

      </div>

      {/* Tutor Name */}
      <div>

        <label className="block mb-2 text-sm text-gray-400">
          Tutor Name:
        </label>

        <input
          type="text"
          value={tutor.tutorName}
          readOnly
          className="w-full bg-gray-100 dark:bg-[#0B1730] border border-white/10 rounded-xl px-5 py-3 outline-none"
        />

      </div>

      {/* Student Email */}
      <div>

        <label className="block mb-2 text-sm text-gray-400">
          Student Email:
        </label>

        <input
          type="email"
          value={
            session?.user?.email || ""
          }
          readOnly
          className="w-full bg-gray-100 dark:bg-[#0B1730] border border-white/10 rounded-xl px-5 py-3 outline-none"
        />

      </div>

      {/* Available Slots */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5">

        <p className="text-lg">

          Available Slots:

          <strong>
            {" "}
            {tutor.totalSlot}
          </strong>

        </p>

      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={
          tutor.totalSlot === 0 ||
          loading
        }
        className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-4 font-bold disabled:opacity-50"
      >

        {
          tutor.totalSlot === 0

            ? "Fully Booked"

            : loading

            ? "Processing..."

            : "Confirm Booking"
        }

      </button>

    </form>
  );
}