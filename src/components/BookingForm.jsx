"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function BookingForm({ tutor }) {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [mounted, setMounted] =
    useState(false);

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  // ================= HYDRATION FIX =================

  useEffect(() => {

    setMounted(true);

  }, []);

  // ================= PROTECT ROUTE =================

  useEffect(() => {

    if (
      mounted &&
      !isPending &&
      !session
    ) {

      router.push("/login");
    }

  }, [
    mounted,
    session,
    isPending,
    router,
  ]);

  // ================= HANDLE BOOKING =================

  const handleBooking =
    async (e) => {

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

        bookingStatus:
          "active",
      };

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
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${tokenData?.token}`,
            },

            body: JSON.stringify(
              bookingData
            ),
          }
        );

        const data =
          await res.json();

        // ================= SUCCESS =================

        if (
          res.ok &&
          data.success
        ) {

          toast.success(
            "Booking successful"
          );

          router.push(
            "/my-bookings"
          );

          router.refresh();

        } else {

          toast.error(
            data.message ||
            "Booking failed"
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

  // ================= LOADING =================

  if (!mounted) {

    return null;
  }

  if (isPending) {

    return (

      <div className="
        flex
        items-center
        justify-center
        py-10
      ">

        <h2 className="
          text-xl
          font-bold
        ">

          Loading...

        </h2>

      </div>
    );
  }

  if (!session) {

    return null;
  }

  return (

    <form
      onSubmit={handleBooking}
      className="
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        dark:border-white/10
      "
    >

      <div className="overflow-x-auto">

        <table className="
          w-full
          border-collapse
        ">

          <tbody>

            {/* STUDENT NAME */}

            <tr className="border-b border-gray-200 dark:border-white/10">

              <td className="bg-gray-50 dark:bg-[#0B1730] px-5 py-4 font-semibold w-[220px]">

                Student Name

              </td>

              <td className="px-5 py-4">

                <input
                  type="text"
                  name="studentName"
                  required
                  defaultValue={
                    session?.user?.name || ""
                  }
                  className="
                    w-full
                    bg-transparent
                    outline-none
                  "
                />

              </td>

            </tr>

            {/* PHONE */}

            <tr className="border-b border-gray-200 dark:border-white/10">

              <td className="bg-gray-50 dark:bg-[#0B1730] px-5 py-4 font-semibold">

                Phone

              </td>

              <td className="px-5 py-4">

                <input
                  type="text"
                  name="phone"
                  required
                  placeholder="Enter phone number"
                  className="
                    w-full
                    bg-transparent
                    outline-none
                  "
                />

              </td>

            </tr>

            {/* TUTOR ID */}

            <tr className="border-b border-gray-200 dark:border-white/10">

              <td className="bg-gray-50 dark:bg-[#0B1730] px-5 py-4 font-semibold">

                Tutor ID

              </td>

              <td className="px-5 py-4">

                <input
                  type="text"
                  value={tutor._id}
                  readOnly
                  className="
                    w-full
                    bg-transparent
                    outline-none
                  "
                />

              </td>

            </tr>

            {/* TUTOR NAME */}

            <tr className="border-b border-gray-200 dark:border-white/10">

              <td className="bg-gray-50 dark:bg-[#0B1730] px-5 py-4 font-semibold">

                Tutor Name

              </td>

              <td className="px-5 py-4">

                <input
                  type="text"
                  value={tutor.tutorName}
                  readOnly
                  className="
                    w-full
                    bg-transparent
                    outline-none
                  "
                />

              </td>

            </tr>

            {/* STUDENT EMAIL */}

            <tr className="border-b border-gray-200 dark:border-white/10">

              <td className="bg-gray-50 dark:bg-[#0B1730] px-5 py-4 font-semibold">

                Student Email

              </td>

              <td className="px-5 py-4">

                <input
                  type="email"
                  value={
                    session?.user?.email || ""
                  }
                  readOnly
                  className="
                    w-full
                    bg-transparent
                    outline-none
                  "
                />

              </td>

            </tr>

            {/* AVAILABLE SLOT */}

            <tr>

              <td className="bg-gray-50 dark:bg-[#0B1730] px-5 py-4 font-semibold">

                Available Slots

              </td>

              <td className="px-5 py-4">

                <span
                  className="
                    inline-flex
                    items-center
                    justify-center
                    px-4
                    py-2
                    rounded-xl
                    bg-blue-500/10
                    text-blue-500
                    font-bold
                  "
                >

                  {tutor.totalSlot}

                </span>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

      {/* BUTTON */}

      <div className="
        p-5
        border-t
        border-gray-200
        dark:border-white/10
      ">

        <button
          type="submit"

          disabled={
            tutor.totalSlot === 0 ||
            loading
          }

          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            transition-all
            duration-300
            rounded-xl
            py-4
            font-bold
            text-white
            disabled:opacity-50
          "
        >

          {
            tutor.totalSlot === 0

              ? "Fully Booked"

              : loading

              ? "Processing..."

              : "Confirm Booking"
          }

        </button>

      </div>

    </form>
  );
}