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
      <div className="min-h-screen bg-[#020817] flex items-center justify-center text-white text-3xl font-black">

        Loading...

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020817] text-white px-4 md:px-10 py-10">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

        <div>

          <h1 className="text-5xl font-black mb-2">

            My Tutors

          </h1>

          <p className="text-gray-400">

            Manage all your tutors professionally.

          </p>

        </div>

        <Link
          href="/add-tutor"
          className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105 px-6 py-4 rounded-2xl font-bold"
        >

          + Add Tutor

        </Link>
      </div>

      {/* ================= STATS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* Tutors */}

        <div className="bg-[#071226] border border-white/10 rounded-3xl p-6">

          <div className="flex items-center justify-between mb-5">

            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-2xl text-blue-400">

              <HiOutlineUsers />

            </div>

            <span className="text-gray-400 text-sm">

              Total Tutors

            </span>
          </div>

          <h2 className="text-4xl font-black">

            {totalTutors}

          </h2>
        </div>

        {/* Slots */}

        <div className="bg-[#071226] border border-white/10 rounded-3xl p-6">

          <div className="flex items-center justify-between mb-5">

            <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center text-2xl text-green-400">

              🎯

            </div>

            <span className="text-gray-400 text-sm">

              Available Slots

            </span>
          </div>

          <h2 className="text-4xl font-black">

            {totalSlots}

          </h2>
        </div>

        {/* Subjects */}

        <div className="bg-[#071226] border border-white/10 rounded-3xl p-6">

          <div className="flex items-center justify-between mb-5">

            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center text-2xl text-purple-400">

              <MdOutlineSubject />

            </div>

            <span className="text-gray-400 text-sm">

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

        <BsSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

        <input
          type="text"
          placeholder="Search tutors or subjects..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full bg-[#071226] border border-white/10 rounded-2xl pl-14 pr-5 py-4 outline-none focus:border-blue-500 transition"
        />
      </div>

      {/* ================= EMPTY STATE ================= */}

      {filteredTutors.length === 0 ? (

        <div className="bg-[#071226] border border-white/10 rounded-[32px] p-16 text-center">

          <div className="text-7xl mb-6">

            🚀

          </div>

          <h2 className="text-3xl font-black mb-4">

            No Tutors Found

          </h2>

          <p className="text-gray-400 mb-8 max-w-xl mx-auto">

            Start by adding your first tutor and manage everything professionally.

          </p>

          <Link
            href="/add-tutor"
            className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-2xl font-bold inline-block"
          >

            Add Tutor

          </Link>
        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {filteredTutors.map(
            (tutor) => (

              <div
                key={tutor._id}
                className="group bg-[#071226] border border-white/10 hover:border-blue-500/30 rounded-[32px] overflow-hidden transition-all duration-300"
              >

                {/* IMAGE */}

                <div className="relative h-[280px] overflow-hidden">

                  <Image
                    src={tutor.photo}
                    alt={
                      tutor.tutorName
                    }
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                  <div className="absolute top-5 left-5 bg-blue-600 px-4 py-2 rounded-full text-sm font-semibold">

                    {tutor.subject}

                  </div>
                </div>

                {/* CONTENT */}

                <div className="p-6">

                  <h2 className="text-2xl font-black mb-2">

                    {tutor.tutorName}

                  </h2>

                  <p className="text-gray-400 mb-6 line-clamp-1">

                    {tutor.institution}

                  </p>

                  <div className="flex items-center justify-between mb-6">

                    <div>

                      <p className="text-gray-400 text-sm">

                        Hourly Fee

                      </p>

                      <h3 className="text-2xl font-black text-green-400">

                        $
                        {tutor.hourlyFee}

                      </h3>
                    </div>

                    <div className="text-right">

                      <p className="text-gray-400 text-sm">

                        Available Slots

                      </p>

                      <h3 className="text-xl font-black text-blue-400">

                        {tutor.totalSlot}

                      </h3>
                    </div>
                  </div>

                  {/* ACTIONS */}

                  <div className="flex gap-3">

                    {/* UPDATE */}

                    <button
                      onClick={() =>
                        openUpdateModal(
                          tutor
                        )
                      }
                      className="flex-1 bg-blue-600 hover:bg-blue-700 transition py-3 rounded-2xl font-semibold flex items-center justify-center gap-2"
                    >

                      <BsPencilSquare />

                      Update

                    </button>

                    {/* DELETE */}

                    <button
                      onClick={() =>
                        openDeleteModal(
                          tutor._id
                        )
                      }
                      className="flex-1 bg-red-600 hover:bg-red-700 transition py-3 rounded-2xl font-semibold flex items-center justify-center gap-2"
                    >

                      <BsTrash3 />

                      Delete

                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* ================= UPDATE MODAL ================= */}

      {
        showUpdateModal && (

          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">

            <div className="bg-[#071226] w-full max-w-2xl rounded-[32px] p-8 relative border border-white/10">

              <button
                onClick={() =>
                  setShowUpdateModal(
                    false
                  )
                }
                className="absolute top-5 right-5 text-white text-2xl"
              >

                <BsX />

              </button>

              <h2 className="text-4xl font-black mb-8">

                Update Tutor

              </h2>

              <form
                onSubmit={
                  handleUpdate
                }
                className="space-y-5"
              >

                <input
                  type="text"
                  name="tutorName"
                  value={
                    updateForm.tutorName
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Tutor Name"
                  className="w-full bg-[#020817] border border-white/10 rounded-2xl p-4 outline-none"
                />

                <input
                  type="text"
                  name="subject"
                  value={
                    updateForm.subject
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Subject"
                  className="w-full bg-[#020817] border border-white/10 rounded-2xl p-4 outline-none"
                />

                <input
                  type="text"
                  name="institution"
                  value={
                    updateForm.institution
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Institution"
                  className="w-full bg-[#020817] border border-white/10 rounded-2xl p-4 outline-none"
                />

                <input
                  type="number"
                  name="hourlyFee"
                  value={
                    updateForm.hourlyFee
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Hourly Fee"
                  className="w-full bg-[#020817] border border-white/10 rounded-2xl p-4 outline-none"
                />

                <input
                  type="number"
                  name="totalSlot"
                  value={
                    updateForm.totalSlot
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Total Slots"
                  className="w-full bg-[#020817] border border-white/10 rounded-2xl p-4 outline-none"
                />

                <input
                  type="text"
                  name="photo"
                  value={
                    updateForm.photo
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Photo URL"
                  className="w-full bg-[#020817] border border-white/10 rounded-2xl p-4 outline-none"
                />

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 transition py-4 rounded-2xl font-black text-lg"
                >

                  Save Changes

                </button>
              </form>
            </div>
          </div>
        )
      }

      {/* ================= DELETE MODAL ================= */}

      {
        showDeleteModal && (

          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">

            <div className="bg-[#071226] w-full max-w-md rounded-[32px] p-8 border border-white/10 text-center">

              <h2 className="text-3xl font-black mb-4">

                Confirm Delete

              </h2>

              <p className="text-gray-400 mb-8">

                Are you sure you want to permanently delete this tutor?

              </p>

              <div className="flex gap-4">

                <button
                  onClick={
                    confirmDelete
                  }
                  className="flex-1 bg-red-600 hover:bg-red-700 transition py-3 rounded-2xl font-bold"
                >

                  Yes Delete

                </button>

                <button
                  onClick={() =>
                    setShowDeleteModal(
                      false
                    )
                  }
                  className="flex-1 bg-gray-700 hover:bg-gray-800 transition py-3 rounded-2xl font-bold"
                >

                  Cancel

                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}