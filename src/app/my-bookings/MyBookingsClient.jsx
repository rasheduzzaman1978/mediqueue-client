"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { toast } from "react-toastify";

export default function MyBookingsClient() {

  const router = useRouter();

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const { data: session } =
    authClient.useSession();

  // ================= FETCH BOOKINGS =================

  useEffect(() => {

    if (session?.user?.email) {

      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings?email=${session.user.email}`
      )
        .then((res) =>
          res.json()
        )
        .then((data) => {

          setBookings(data);

          setLoading(false);
        });
    }

  }, [session]);

  // ================= CANCEL BOOKING =================

  const handleCancel =
    async (id) => {

      const confirmCancel =
        confirm(
          "Cancel this booking?"
        );

      if (!confirmCancel) return;

      try {

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${id}`,
          {
            method: "PATCH",
          }
        );

        const data =
          await res.json();

        if (data.success) {

          toast.success(
            "Booking cancelled successfully"
          );

          // UPDATE UI

          setBookings(
            bookings.map(
              (booking) => {

                if (
                  booking._id === id
                ) {

                  return {
                    ...booking,
                    bookingStatus:
                      "cancelled",
                  };
                }

                return booking;
              }
            )
          );

          router.refresh();

        } else {

          toast.error(
            data.message ||
              "Failed to cancel booking"
          );
        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Something went wrong"
        );
      }
    };

  // ================= LOADING =================

  if (loading) {

    return (

      <div className="min-h-screen bg-gray-100 dark:bg-gradient-to-b dark:from-[#020817] dark:to-[#071226] text-black dark:text-white flex items-center justify-center text-2xl md:text-3xl font-black transition-colors duration-300">

        Loading...

      </div>
    );
  }

  // ================= UI =================

  return (

    <div className="min-h-screen bg-gray-100 dark:bg-gradient-to-b dark:from-[#020817] dark:to-[#071226] text-black dark:text-white px-4 md:px-10 py-10 md:py-12 transition-colors duration-300">

      {/* HEADING */}

      <div className="mb-8 md:mb-10">

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 leading-tight">

          My Booked Sessions

        </h1>

        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">

          View and manage all your booked tutor sessions.

        </p>

      </div>

      {/* EMPTY STATE */}

      {bookings.length === 0 ? (

        <div className="
          bg-white dark:bg-white/5
          backdrop-blur-md
          border border-gray-200 dark:border-white/10
          rounded-3xl
          p-10 md:p-16
          text-center
          shadow-xl
          transition-all duration-300
        ">

          <div className="text-5xl md:text-7xl mb-6">

            📚

          </div>

          <h2 className="text-2xl md:text-3xl font-black mb-4">

            No Bookings Found

          </h2>

          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">

            You haven’t booked any tutor sessions yet.

          </p>

        </div>

      ) : (

        <>
          {/* ================= DESKTOP TABLE ================= */}

          <div className="
            hidden lg:block
            overflow-x-auto
            rounded-3xl
            border border-gray-200 dark:border-white/10
            bg-white dark:bg-white/5
            backdrop-blur-md
            shadow-xl
          ">

            <table className="w-full border-separate border-spacing-0">

              {/* TABLE HEAD */}

              <thead>

                <tr>

                  <th className="p-5 text-center border-b border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-[#071226] font-bold">

                    Tutor Name

                  </th>

                  <th className="p-5 text-center border-b border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-[#071226] font-bold">

                    Student Name

                  </th>

                  <th className="p-5 text-center border-b border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-[#071226] font-bold">

                    Email

                  </th>

                  <th className="p-5 text-center border-b border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-[#071226] font-bold">

                    Status

                  </th>

                  <th className="p-5 text-center border-b border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-[#071226] font-bold">

                    Action

                  </th>

                </tr>

              </thead>

              {/* TABLE BODY */}

              <tbody>

                {bookings.map(
                  (booking) => (

                    <tr
                      key={booking._id}
                      className="hover:bg-gray-100 dark:hover:bg-white/[0.03] transition text-center"
                    >

                      {/* TUTOR NAME */}

                      <td className="p-5 border-b border-gray-200 dark:border-white/10 font-medium">

                        {booking.tutorName}

                      </td>

                      {/* STUDENT NAME */}

                      <td className="p-5 border-b border-gray-200 dark:border-white/10">

                        {booking.studentName}

                      </td>

                      {/* EMAIL */}

                      <td className="p-5 border-b border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300">

                        {booking.studentEmail}

                      </td>

                      {/* STATUS */}

                      <td className="p-5 border-b border-gray-200 dark:border-white/10">

                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            booking.bookingStatus ===
                            "cancelled"
                              ? "bg-red-500/20 text-red-500"
                              : "bg-green-500/20 text-green-500"
                          }`}
                        >

                          {
                            booking.bookingStatus
                          }

                        </span>

                      </td>

                      {/* ACTION */}

                      <td className="p-5 border-b border-gray-200 dark:border-white/10">

                        <button
                          disabled={
                            booking.bookingStatus ===
                            "cancelled"
                          }
                          onClick={() =>
                            handleCancel(
                              booking._id
                            )
                          }
                          className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 ${
                            booking.bookingStatus ===
                            "cancelled"
                              ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                              : "bg-red-600 hover:bg-red-700 text-white"
                          }`}
                        >

                          {
                            booking.bookingStatus ===
                            "cancelled"
                              ? "Cancelled"
                              : "Cancel"
                          }

                        </button>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

          {/* ================= MOBILE + TABLET CARD VIEW ================= */}

          <div className="grid lg:hidden gap-5">

            {bookings.map(
              (booking) => (

                <div
                  key={booking._id}
                  className="
                    bg-white dark:bg-white/5
                    backdrop-blur-md
                    border border-gray-200 dark:border-white/10
                    rounded-3xl
                    p-5
                    space-y-4
                    shadow-lg
                    transition-all duration-300
                  "
                >

                  {/* Tutor */}

                  <div>

                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">

                      Tutor Name

                    </p>

                    <h2 className="text-xl font-bold">

                      {booking.tutorName}

                    </h2>

                  </div>

                  {/* Student */}

                  <div>

                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">

                      Student Name

                    </p>

                    <h2 className="font-medium">

                      {booking.studentName}

                    </h2>

                  </div>

                  {/* Email */}

                  <div>

                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">

                      Email

                    </p>

                    <p className="break-all">

                      {booking.studentEmail}

                    </p>

                  </div>

                  {/* Status */}

                  <div>

                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">

                      Status

                    </p>

                    <span
                      className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                        booking.bookingStatus ===
                        "cancelled"
                          ? "bg-red-500/20 text-red-500"
                          : "bg-green-500/20 text-green-500"
                      }`}
                    >

                      {
                        booking.bookingStatus
                      }

                    </span>

                  </div>

                  {/* Action */}

                  <button
                    disabled={
                      booking.bookingStatus ===
                      "cancelled"
                    }
                    onClick={() =>
                      handleCancel(
                        booking._id
                      )
                    }
                    className={`w-full py-3 rounded-2xl font-semibold transition-all duration-300 ${
                      booking.bookingStatus ===
                      "cancelled"
                        ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700 text-white"
                    }`}
                  >

                    {
                      booking.bookingStatus ===
                      "cancelled"
                        ? "Cancelled"
                        : "Cancel Booking"
                    }

                  </button>

                </div>
              )
            )}

          </div>
        </>
      )}
    </div>
  );
}