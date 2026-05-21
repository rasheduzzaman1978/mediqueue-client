"use client";

import { useEffect, useState } from "react";

import { authClient } from "@/lib/auth-client";

import Link from "next/link";

import { toast } from "react-toastify";

export default function MyTutorsPage() {

  const [tutors, setTutors] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const { data: session } =
    authClient.useSession();

  useEffect(() => {

    if (session?.user?.email) {

      fetch(
        `http://127.0.0.1:5000/my-tutors?email=${session.user.email}`
      )
        .then((res) =>
          res.json()
        )
        .then((data) => {

          setTutors(data);

          setLoading(false);
        });
    }
  }, [session]);

  const handleDelete =
    async (id) => {

      const confirmDelete =
        confirm(
          "Delete this tutor?"
        );

      if (!confirmDelete) return;

      const res = await fetch(
        `http://127.0.0.1:5000/tutors/${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await res.json();

      if (data.success) {

        toast.success(
          "Tutor deleted"
        );

        setTutors(
          tutors.filter(
            (tutor) =>
              tutor._id !== id
          )
        );
      }
    };

  if (loading) {

    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020817] text-white p-10">

      <h1 className="text-4xl font-black mb-10">

        My Tutors

      </h1>

      {tutors.length === 0 ? (

        <div className="bg-[#071226] border border-white/10 rounded-3xl p-10 text-center">

          <h2 className="text-2xl font-bold">

            You haven’t added any tutors yet.

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
                  Subject
                </th>

                <th className="p-5 text-left">
                  Fee
                </th>

                <th className="p-5 text-left">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {tutors.map(
                (tutor) => (

                  <tr
                    key={tutor._id}
                    className="border-b border-white/5"
                  >

                    <td className="p-5">
                      {
                        tutor.tutorName
                      }
                    </td>

                    <td className="p-5">
                      {
                        tutor.subject
                      }
                    </td>

                    <td className="p-5">
                      $
                      {
                        tutor.hourlyFee
                      }
                    </td>

                    <td className="p-5 flex gap-3">

                      <Link
                        href={`/tutors/edit/${tutor._id}`}
                        className="bg-blue-600 px-4 py-2 rounded-lg"
                      >
                        Update
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(
                            tutor._id
                          )
                        }
                        className="bg-red-600 px-4 py-2 rounded-lg"
                      >
                        Delete
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