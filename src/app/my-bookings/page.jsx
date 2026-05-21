"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { toast } from "react-toastify";

export default function MyBookingsPage() {

  const router = useRouter();

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const { data: session } =
    authClient.useSession();

  useEffect(() => {

    if (session?.user?.email) {

      fetch(
        `http://127.0.0.1:5000/bookings?email=${session.user.email}`
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
          `http://127.0.0.1:5000/bookings/${id}`,
          {
            method: "PATCH",
          }
        );

        const data =
          await res.json();

        if (data.success) {

          toast.success(
            "Booking cancelled"
          );

          // Refresh UI
          router.refresh();

          // Update local state
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
      <div className="min-h-screen bg-[#020817] text-white flex items-center justify-center text-2xl font-bold">

        Loading...

      </div>
    );
  }

  // ================= UI =================

  return (
    <div className="min-h-screen bg-[#020817] text-white p-10">

      <h1 className="text-5xl font-black mb-10">

        My Booked Sessions

      </h1>

      {bookings.length === 0 ? (

        <div className="bg-[#071226] border border-white/10 rounded-3xl p-10 text-center">

          <h2 className="text-2xl font-bold">

            You haven’t booked any sessions yet.

          </h2>

        </div>

      ) : (

        <div className="overflow-x-auto bg-[#071226] border border-white/10 rounded-3xl">

          <table className="w-full">

            <thead>

              <tr className="border-b border-white/10">

                <th className="p-5 text-left">
                  Tutor
                </th>

                <th className="p-5 text-left">
                  Student
                </th>

                <th className="p-5 text-left">
                  Email
                </th>

                <th className="p-5 text-left">
                  Status
                </th>

                <th className="p-5 text-left">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {bookings.map(
                (booking) => (

                  <tr
                    key={booking._id}
                    className="border-b border-white/5"
                  >

                    <td className="p-5">
                      {
                        booking.tutorName
                      }
                    </td>

                    <td className="p-5">
                      {
                        booking.studentName
                      }
                    </td>

                    <td className="p-5">
                      {
                        booking.studentEmail
                      }
                    </td>

                    <td className="p-5">

                      <span className={`px-3 py-1 rounded-full text-sm ${
                        booking.bookingStatus ===
                        "cancelled"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-green-500/20 text-green-400"
                      }`}>

                        {
                          booking.bookingStatus
                        }

                      </span>

                    </td>

                    <td className="p-5">

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
                        className="bg-red-600 px-4 py-2 rounded-lg disabled:opacity-50"
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
      )}
    </div>
  );
}