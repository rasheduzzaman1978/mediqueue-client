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

  // ================= SESSION =================

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  // ==================================================
  // PROTECT ROUTE
  // ==================================================

  useEffect(() => {

    if (
      !isPending &&
      !session
    ) {

      router.push("/login");
    }

  }, [
    session,
    isPending,
    router,
  ]);

  // ==================================================
  // FETCH BOOKINGS
  // ==================================================

  useEffect(() => {

    const fetchBookings =
      async () => {

        try {

          // ================= GET TOKEN =================

          const {
            data: tokenData,
          } =
            await authClient.token();

          // ================= API REQUEST =================

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`,
            {
              headers: {
                Authorization:
                  `Bearer ${tokenData?.token}`,
              },
            }
          );

          if (!res.ok) {

            throw new Error(
              "Failed to fetch bookings"
            );
          }

          const data =
            await res.json();

          setBookings(data);

        } catch (error) {

          console.log(error);

          toast.error(
            "Failed to load bookings"
          );

        } finally {

          setLoading(false);
        }
      };

    if (session?.user) {

      fetchBookings();
    }

  }, [session]);

  // ==================================================
  // CANCEL BOOKING
  // ==================================================

  const handleCancel =
    async (id) => {

      const confirmCancel =
        confirm(
          "Cancel this booking?"
        );

      if (!confirmCancel) return;

      try {

        // ================= GET TOKEN =================

        const {
          data: tokenData,
        } =
          await authClient.token();

        // ================= API REQUEST =================

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${id}`,
          {
            method: "PATCH",

            headers: {
              Authorization:
                `Bearer ${tokenData?.token}`,
            },
          }
        );

        const data =
          await res.json();

        // ================= SUCCESS =================

        if (data.success) {

          toast.success(
            "Booking cancelled successfully"
          );

          // ================= UPDATE UI =================

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

  // ==================================================
  // LOADING
  // ==================================================

  if (isPending || loading) {

    return (

      <div className="
        min-h-screen
        bg-gray-100
        dark:bg-gradient-to-b
        dark:from-[#020817]
        dark:to-[#071226]
        text-black
        dark:text-white
        flex
        items-center
        justify-center
        text-2xl
        md:text-3xl
        font-black
      ">

        Loading...

      </div>
    );
  }

  // ==================================================
  // BLOCK UNAUTHORIZED USER
  // ==================================================

  if (!session) {

    return null;
  }

  return (

    <div className="
      min-h-screen
      bg-gray-100
      dark:bg-gradient-to-b
      dark:from-[#020817]
      dark:to-[#071226]
      text-black
      dark:text-white
      px-4
      md:px-10
      py-10
      md:py-12
    ">

      {/* ================= HEADING ================= */}

      <div className="mb-8 md:mb-10">

        <h1 className="
          text-3xl
          sm:text-4xl
          md:text-5xl
          font-black
          mb-3
        ">

          My Booked Sessions

        </h1>

        <p className="
          text-sm
          md:text-base
          text-gray-600
          dark:text-gray-400
        ">

          View and manage all your booked tutor sessions.

        </p>

      </div>

      {/* ================= EMPTY STATE ================= */}

      {bookings.length === 0 ? (

        <div className="
          bg-white
          dark:bg-white/5
          backdrop-blur-md
          border
          border-gray-200
          dark:border-white/10
          rounded-3xl
          p-10
          md:p-16
          text-center
          shadow-xl
        ">

          <div className="
            text-5xl
            md:text-7xl
            mb-6
          ">

            📚

          </div>

          <h2 className="
            text-2xl
            md:text-3xl
            font-black
            mb-4
          ">

            No Bookings Found

          </h2>

          <p className="
            text-sm
            md:text-base
            text-gray-600
            dark:text-gray-400
          ">

            You haven’t booked any tutor sessions yet.

          </p>

        </div>

      ) : (

        <>

          {/* ================= DESKTOP TABLE ================= */}

          <div className="
            hidden
            lg:block
            overflow-x-auto
            rounded-3xl
            border
            border-gray-200
            dark:border-white/10
            bg-white
            dark:bg-white/5
            backdrop-blur-md
            shadow-xl
          ">

            <table className="
              w-full
              border-collapse
            ">

              <thead>

                <tr className="
                  bg-gray-100
                  dark:bg-[#0B1730]
                  text-left
                ">

                  <th className="px-6 py-4">
                    Tutor
                  </th>

                  <th className="px-6 py-4">
                    Student
                  </th>

                  <th className="px-6 py-4">
                    Email
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {bookings.map(
                  (booking) => (

                    <tr
                      key={booking._id}
                      className="
                        border-t
                        border-gray-200
                        dark:border-white/10
                        hover:bg-gray-50
                        dark:hover:bg-white/5
                      "
                    >

                      {/* Tutor */}

                      <td className="px-6 py-5 font-semibold">

                        {booking.tutorName}

                      </td>

                      {/* Student */}

                      <td className="px-6 py-5">

                        {booking.studentName}

                      </td>

                      {/* Email */}

                      <td className="px-6 py-5 break-all">

                        {booking.studentEmail}

                      </td>

                      {/* Status */}

                      <td className="px-6 py-5">

                        <span
                          className={`
                            inline-flex
                            px-4
                            py-2
                            rounded-full
                            text-sm
                            font-semibold

                            ${
                              booking.bookingStatus ===
                              "cancelled"

                                ? "bg-red-500/20 text-red-500"

                                : "bg-green-500/20 text-green-500"
                            }
                          `}
                        >

                          {booking.bookingStatus}

                        </span>

                      </td>

                      {/* Action */}

                      <td className="px-6 py-5 text-center">

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

                          className={`
                            px-5
                            py-2.5
                            rounded-xl
                            font-semibold

                            ${
                              booking.bookingStatus ===
                              "cancelled"

                                ? "bg-gray-300 dark:bg-gray-700 text-gray-500"

                                : "bg-red-600 hover:bg-red-700 text-white"
                            }
                          `}
                        >

                          {
                            booking.bookingStatus ===
                            "cancelled"

                              ? "Cancelled"

                              : "Cancel Booking"
                          }

                        </button>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

          {/* ================= MOBILE GRID ================= */}

          <div className="
            grid
            gap-5
            lg:hidden
          ">

            {bookings.map(
              (booking) => (

                <div
                  key={booking._id}
                  className="
                    bg-white
                    dark:bg-white/5
                    backdrop-blur-md
                    border
                    border-gray-200
                    dark:border-white/10
                    rounded-3xl
                    p-5
                    shadow-xl
                  "
                >

                  {/* Tutor */}

                  <div className="mb-4">

                    <h2 className="
                      text-xl
                      font-bold
                    ">

                      {booking.tutorName}

                    </h2>

                    <p className="
                      text-gray-500
                      dark:text-gray-400
                      mt-1
                      break-all
                    ">

                      {booking.studentEmail}

                    </p>

                  </div>

                  {/* Student */}

                  <div className="mb-3">

                    <span className="
                      text-sm
                      text-gray-500
                    ">

                      Student

                    </span>

                    <p className="font-medium">

                      {booking.studentName}

                    </p>

                  </div>

                  {/* Status */}

                  <div className="mb-5">

                    <span
                      className={`
                        inline-flex
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-semibold

                        ${
                          booking.bookingStatus ===
                          "cancelled"

                            ? "bg-red-500/20 text-red-500"

                            : "bg-green-500/20 text-green-500"
                        }
                      `}
                    >

                      {booking.bookingStatus}

                    </span>

                  </div>

                  {/* Button */}

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

                    className={`
                      w-full
                      py-3
                      rounded-xl
                      font-semibold

                      ${
                        booking.bookingStatus ===
                        "cancelled"

                          ? "bg-gray-300 dark:bg-gray-700 text-gray-500"

                          : "bg-red-600 hover:bg-red-700 text-white"
                      }
                    `}
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