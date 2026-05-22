"use client";

import { useEffect, useMemo, useState } from "react";

import Image from "next/image";

import Link from "next/link";

import { toast } from "react-toastify";

import {
  BsPencilSquare,
  BsTrash3,
  BsSearch,
  BsX,
} from "react-icons/bs";

import {
  HiOutlineUsers,
} from "react-icons/hi2";

import {
  MdOutlineSubject,
} from "react-icons/md";

import { authClient } from "@/lib/auth-client";

export default function MyTutorsPage() {

  // ================= STATES =================

  const [tutors, setTutors] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  // ================= UPDATE MODAL =================

  const [showUpdateModal, setShowUpdateModal] =
    useState(false);

  const [selectedTutor, setSelectedTutor] =
    useState(null);

  const [updateForm, setUpdateForm] =
    useState({
      tutorName: "",
      subject: "",
      institution: "",
      hourlyFee: "",
      totalSlot: "",
      photo: "",
    });

  // ================= DELETE MODAL =================

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [deleteId, setDeleteId] =
    useState(null);

  // ================= SESSION =================

  const { data: session } =
    authClient.useSession();

  // ================= FETCH TUTORS =================

  useEffect(() => {

    const fetchTutors =
      async () => {

        if (
          !session?.user?.email
        ) {

          setLoading(false);

          return;
        }

        try {

          const res = await fetch(
            `http://127.0.0.1:5000/my-tutors?email=${session.user.email}`
          );

          const data =
            await res.json();

          setTutors(data);

        } catch (error) {

          console.log(error);

          toast.error(
            "Failed to load tutors"
          );

        } finally {

          setLoading(false);
        }
      };

    fetchTutors();

  }, [session]);

  // ================= SEARCH =================

  const filteredTutors =
    useMemo(() => {

      return tutors.filter(
        (tutor) =>
          tutor.tutorName
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          tutor.subject
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }, [search, tutors]);

  // ================= STATS =================

  const totalTutors =
    tutors.length;

  const totalSlots =
    tutors.reduce(
      (acc, tutor) =>
        acc +
        parseInt(
          tutor.totalSlot || 0
        ),
      0
    );

  const totalSubjects =
    new Set(
      tutors.map(
        (tutor) =>
          tutor.subject
      )
    ).size;

  // ================= OPEN UPDATE MODAL =================

  const openUpdateModal =
    (tutor) => {

      setSelectedTutor(tutor);

      setUpdateForm({
        tutorName:
          tutor.tutorName || "",
        subject:
          tutor.subject || "",
        institution:
          tutor.institution || "",
        hourlyFee:
          tutor.hourlyFee || "",
        totalSlot:
          tutor.totalSlot || "",
        photo:
          tutor.photo || "",
      });

      setShowUpdateModal(true);
    };

  // ================= HANDLE INPUT =================

  const handleChange =
    (e) => {

      setUpdateForm({
        ...updateForm,
        [e.target.name]:
          e.target.value,
      });
    };

  // ================= UPDATE =================

  const handleUpdate =
    async (e) => {

      e.preventDefault();

      try {

        const res = await fetch(
          `http://127.0.0.1:5000/tutors/${selectedTutor._id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              updateForm
            ),
          }
        );

        const data =
          await res.json();

        if (data.success) {

          const updatedTutors =
            tutors.map((tutor) =>
              tutor._id ===
              selectedTutor._id
                ? {
                    ...tutor,
                    ...updateForm,
                  }
                : tutor
            );

          setTutors(
            updatedTutors
          );

          toast.success(
            "Tutor updated successfully"
          );

          setShowUpdateModal(
            false
          );

        } else {

          toast.error(
            data.message ||
              "Update failed"
          );
        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Something went wrong"
        );
      }
    };

  // ================= OPEN DELETE MODAL =================

  const openDeleteModal =
    (id) => {

      setDeleteId(id);

      setShowDeleteModal(true);
    };

  // ================= DELETE =================

  const confirmDelete =
    async () => {

      try {

        const res = await fetch(
          `http://127.0.0.1:5000/tutors/${deleteId}`,
          {
            method: "DELETE",
          }
        );

        const data =
          await res.json();

        if (data.success) {

          toast.success(
            "Tutor deleted successfully"
          );

          setTutors(
            tutors.filter(
              (tutor) =>
                tutor._id !==
                deleteId
            )
          );

          setShowDeleteModal(
            false
          );

        } else {

          toast.error(
            data.message ||
              "Delete failed"
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

      <div className="min-h-screen bg-gray-100 dark:bg-gradient-to-b dark:from-[#020817] dark:to-[#071226] flex items-center justify-center text-black dark:text-white text-3xl font-black transition-colors duration-300">

        Loading...

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100 dark:bg-gradient-to-b dark:from-[#020817] dark:to-[#071226] text-black dark:text-white px-4 md:px-10 py-10 transition-colors duration-300">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

        <div>

          <h1 className="text-3xl md:text-5xl font-black mb-2">

            My Tutors

          </h1>

          <p className="text-gray-600 dark:text-gray-400">

            Manage all your tutors professionally.

          </p>

        </div>

        <Link
          href="/add-tutor"
          className="
            bg-blue-600 hover:bg-blue-700
            dark:bg-blue-500 dark:hover:bg-blue-600
            transition-all duration-300
            hover:scale-105
            px-6 py-4
            rounded-2xl
            font-bold
            text-white
          "
        >

          + Add Tutor

        </Link>

      </div>

      {/* ================= STATS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* Tutors */}

        <div className="
          bg-white dark:bg-white/5
          border border-gray-200 dark:border-white/10
          backdrop-blur-md
          rounded-3xl
          p-6
          shadow-lg
        ">

          <div className="flex items-center justify-between mb-5">

            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-2xl text-blue-500 dark:text-blue-400">

              <HiOutlineUsers />

            </div>

            <span className="text-gray-500 dark:text-gray-400 text-sm">

              Total Tutors

            </span>

          </div>

          <h2 className="text-4xl font-black">

            {totalTutors}

          </h2>

        </div>

        {/* Slots */}

        <div className="
          bg-white dark:bg-white/5
          border border-gray-200 dark:border-white/10
          backdrop-blur-md
          rounded-3xl
          p-6
          shadow-lg
        ">

          <div className="flex items-center justify-between mb-5">

            <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center text-2xl text-green-500 dark:text-green-400">

              🎯

            </div>

            <span className="text-gray-500 dark:text-gray-400 text-sm">

              Available Slots

            </span>

          </div>

          <h2 className="text-4xl font-black">

            {totalSlots}

          </h2>

        </div>

        {/* Subjects */}

        <div className="
          bg-white dark:bg-white/5
          border border-gray-200 dark:border-white/10
          backdrop-blur-md
          rounded-3xl
          p-6
          shadow-lg
        ">

          <div className="flex items-center justify-between mb-5">

            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center text-2xl text-purple-500 dark:text-purple-400">

              <MdOutlineSubject />

            </div>

            <span className="text-gray-500 dark:text-gray-400 text-sm">

              Subjects

            </span>

          </div>

          <h2 className="text-4xl font-black">

            {totalSubjects}

          </h2>

        </div>

      </div>

      {/* ================= SEARCH ================= */}

      <div className="relative mb-10">

        <BsSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-lg" />

        <input
          type="text"
          placeholder="Search tutors or subjects..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
            w-full
            bg-white dark:bg-[#071226]
            border border-gray-300 dark:border-white/10
            rounded-2xl
            pl-14 pr-5 py-4
            outline-none
            focus:ring-2
            focus:ring-blue-500
            transition-all duration-300
          "
        />

      </div>
    </div>
  );
}