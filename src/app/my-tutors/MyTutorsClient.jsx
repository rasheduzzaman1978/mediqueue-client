"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

import {
  BsPencilSquare,
} from "react-icons/bs";

import { authClient } from "@/lib/auth-client";

import { DeleteAlert } from "@/components/DeleteAlert";

export default function MyTutorsClient() {

  // ================= ROUTER =================

  const router = useRouter();

  // ================= STATES =================

  const [tutors, setTutors] =
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
  // FETCH TUTORS
  // ==================================================

  useEffect(() => {

    const fetchTutors =
      async () => {

        try {

          if (!session?.user) {

            setLoading(false);

            return;
          }

          // ================= GET TOKEN =================

          const {
            data: tokenData,
          } =
            await authClient.token();

          // ================= API REQUEST =================

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/my-tutors`,
            {
              headers: {
                Authorization:
                  `Bearer ${tokenData?.token}`,
              },
            }
          );

          // ================= HANDLE ERROR =================

          if (!res.ok) {

            throw new Error(
              "Failed to fetch tutors"
            );
          }

          const data =
            await res.json();

          // ================= SAFE ARRAY =================

          setTutors(
            Array.isArray(data)
              ? data
              : []
          );

        } catch (error) {

          console.log(error);

          toast.error(
            "Failed to load tutors"
          );

          setTutors([]);

        } finally {

          setLoading(false);
        }
      };

    if (session?.user) {

      fetchTutors();
    }

  }, [session]);

  // ==================================================
  // SESSION LOADING
  // ==================================================

  if (isPending) {

    return (

      <div className="min-h-screen bg-gray-100 dark:bg-gradient-to-b dark:from-[#020817] dark:to-[#071226] flex items-center justify-center text-black dark:text-white text-3xl font-black">

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

  // ==================================================
  // DATA LOADING
  // ==================================================

  if (loading) {

    return (

      <div className="min-h-screen bg-gray-100 dark:bg-gradient-to-b dark:from-[#020817] dark:to-[#071226] flex items-center justify-center text-black dark:text-white text-3xl font-black">

        Loading...

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100 dark:bg-gradient-to-b dark:from-[#020817] dark:to-[#071226] text-black dark:text-white px-4 md:px-8 py-10">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

        <div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-2">

            My Tutors

          </h1>

          <p className="text-gray-600 dark:text-gray-400">

            Manage your private tutors professionally.

          </p>

        </div>

        <Link
          href="/add-tutor"
          className="
            bg-blue-600 hover:bg-blue-700
            transition-all duration-300
            hover:scale-105
            px-6 py-4
            rounded-2xl
            font-bold
            text-white
            w-full md:w-auto
            text-center
          "
        >

          + Add Tutor

        </Link>

      </div>

      {/* ================= EMPTY STATE ================= */}

      {tutors.length === 0 ? (

        <div
          className="
            bg-white dark:bg-white/5
            border border-gray-200 dark:border-white/10
            rounded-3xl
            py-24
            flex flex-col items-center justify-center
            text-center
            shadow-xl
            backdrop-blur-md
          "
        >

          <div className="text-7xl mb-6">
            📚
          </div>

          <h2 className="text-3xl font-black mb-3">
            No Tutors Found
          </h2>

          <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8 px-4">
            You haven't added any tutors yet.
            Start by creating your first tutor profile.
          </p>

          <Link
            href="/add-tutor"
            className="
              bg-blue-600 hover:bg-blue-700
              px-7 py-4
              rounded-2xl
              text-white
              font-bold
              transition-all duration-300
              hover:scale-105
            "
          >
            + Add Tutor
          </Link>

        </div>

      ) : (

        /* ================= TABLE ================= */

        <div
          className="
            bg-white dark:bg-white/5
            border border-gray-200 dark:border-white/10
            rounded-3xl
            shadow-2xl
            backdrop-blur-md
            overflow-hidden
          "
        >

          <div className="overflow-x-auto">

            <table className="w-full min-w-[720px]">

              <thead>

                <tr
                  className="
                    border-b border-gray-200
                    dark:border-white/10
                    bg-gray-50 dark:bg-white/5
                  "
                >

                  <th className="px-4 md:px-6 py-4 md:py-5 text-left text-sm md:text-base whitespace-nowrap">
                    Tutor
                  </th>

                  <th className="px-4 md:px-6 py-4 md:py-5 text-left text-sm md:text-base whitespace-nowrap">
                    Subject
                  </th>

                  <th className="hidden lg:table-cell px-6 py-5 text-left whitespace-nowrap">
                    Institution
                  </th>

                  <th className="px-4 md:px-6 py-4 md:py-5 text-left text-sm md:text-base whitespace-nowrap">
                    Fee
                  </th>

                  <th className="px-4 md:px-6 py-4 md:py-5 text-left text-sm md:text-base whitespace-nowrap">
                    Slots
                  </th>

                  <th className="px-4 md:px-6 py-4 md:py-5 text-center text-sm md:text-base whitespace-nowrap">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {Array.isArray(tutors) &&
                  tutors.map((tutor) => (

                    <tr
                      key={tutor._id}
                      className="
                        border-b border-gray-100
                        dark:border-white/5
                        hover:bg-gray-50
                        dark:hover:bg-white/5
                        transition-all duration-300
                      "
                    >

                      {/* Tutor */}

                      <td className="px-4 md:px-6 py-4 md:py-5">

                        <div className="flex items-center gap-3 min-w-[180px]">

                          <Image
                            src={tutor.photo}
                            alt={tutor.tutorName}
                            width={60}
                            height={60}
                            className="
                              w-12 h-12 md:w-[60px] md:h-[60px]
                              rounded-2xl
                              object-cover
                              border
                              border-gray-200
                              dark:border-white/10
                              flex-shrink-0
                            "
                          />

                          <div className="min-w-0">

                            <h3 className="font-bold text-sm md:text-lg truncate">
                              {tutor.tutorName}
                            </h3>

                            <p className="hidden md:block text-sm text-gray-500 dark:text-gray-400">
                              Private Tutor
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Subject */}

                      <td className="px-4 md:px-6 py-4 md:py-5">

                        <span
                          className="
                            inline-flex
                            items-center
                            px-3 md:px-4 py-2
                            rounded-xl
                            bg-purple-100
                            dark:bg-purple-500/20
                            text-purple-700
                            dark:text-purple-300
                            font-semibold
                            text-xs md:text-sm
                            whitespace-nowrap
                          "
                        >
                          {tutor.subject}
                        </span>

                      </td>

                      {/* Institution */}

                      <td className="hidden lg:table-cell px-6 py-5 whitespace-nowrap">

                        {tutor.institution}

                      </td>

                      {/* Fee */}

                      <td className="px-4 md:px-6 py-4 md:py-5 whitespace-nowrap">

                        <span className="font-bold text-green-600 dark:text-green-400 text-sm md:text-base">

                          ${tutor.hourlyFee}/hr

                        </span>

                      </td>

                      {/* Slots */}

                      <td className="px-4 md:px-6 py-4 md:py-5">

                        <span
                          className="
                            inline-flex
                            items-center
                            justify-center
                            min-w-[38px]
                            h-[38px]
                            rounded-xl
                            bg-blue-100
                            dark:bg-blue-500/20
                            text-blue-700
                            dark:text-blue-300
                            font-bold
                            text-xs md:text-sm
                          "
                        >
                          {tutor.totalSlot}
                        </span>

                      </td>

                      {/* Actions */}

                      <td className="px-4 md:px-6 py-4 md:py-5">

                        <div className="flex items-center justify-center gap-3 min-w-[140px]">

                          {/* UPDATE */}

                          <Link
                            href={`/tutors/edit/${tutor._id}`}
                            className="
                              w-10 h-10 md:w-11 md:h-11
                              rounded-2xl
                              bg-blue-500/15
                              hover:bg-blue-500
                              text-blue-500
                              hover:text-white
                              flex items-center justify-center
                              transition-all duration-300
                              hover:scale-110
                              flex-shrink-0
                            "
                          >
                            <BsPencilSquare className="text-sm md:text-lg" />
                          </Link>

                          {/* DELETE */}

                          <DeleteAlert tutor={tutor} />

                        </div>

                      </td>

                    </tr>
                  ))}

              </tbody>

            </table>

          </div>

        </div>
      )}

    </div>
  );
}