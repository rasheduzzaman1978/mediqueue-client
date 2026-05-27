"use client";

import React, {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  X,
  Save,
  BookOpen,
  MapPin,
  DollarSign,
  Clock3,
  CalendarDays,
  School,
  ImageIcon,
  Users,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function EditTutorClient({
  id,
}) {

  const router = useRouter();

  // ================= SESSION =================

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  // ================= STATES =================

  const [loading, setLoading] =
    useState(true);

  const [formData, setFormData] =
    useState({
      tutorName: "",
      photo: "",
      subject: "",
      availableDays: "",
      availableTime: "",
      hourlyFee: "",
      totalSlot: "",
      sessionStartDate: "",
      institution: "",
      experience: "",
      location: "",
      teachingMode: "",
    });

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
  // FETCH TUTOR
  // ==================================================

  useEffect(() => {

    async function fetchTutor() {

      try {

        if (!session?.user) {

          return;
        }

        // ================= GET TOKEN =================

        const {
          data: tokenData,
        } =
          await authClient.token();

        // ================= FETCH REQUEST =================

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${tokenData?.token}`,
            },
          }
        );

        if (!res.ok) {

          throw new Error(
            "Failed to fetch tutor"
          );
        }

        const data =
          await res.json();

        setFormData({
          tutorName:
            data.tutorName || "",

          photo:
            data.photo || "",

          subject:
            data.subject || "",

          availableDays:
            data.availableDays || "",

          availableTime:
            data.availableTime || "",

          hourlyFee:
            data.hourlyFee || "",

          totalSlot:
            data.totalSlot || "",

          sessionStartDate:
            data.sessionStartDate || "",

          institution:
            data.institution || "",

          experience:
            data.experience || "",

          location:
            data.location || "",

          teachingMode:
            data.teachingMode || "",
        });

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to load tutor"
        );

      } finally {

        setLoading(false);
      }
    }

    if (session?.user) {

      fetchTutor();
    }

  }, [id, session]);

  // ==================================================
  // HANDLE CHANGE
  // ==================================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ==================================================
  // HANDLE UPDATE
  // ==================================================

  const handleUpdate =
  async (e) => {

    e.preventDefault();

    try {

      // ================= GET TOKEN =================

      const {
        data: tokenData,
      } =
        await authClient.token();

      // ================= UPDATE REQUEST =================

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${tokenData?.token}`,
          },

          body: JSON.stringify(
            formData
          ),
        }
      );

      const data =
        await res.json();

      // ================= SUCCESS =================

      if (res.ok) {

        toast.success(
          "Tutor Updated Successfully!"
        );

        router.refresh();

        setTimeout(() => {

          router.push("/tutors");

        }, 1000);

      } else {

        toast.error(
          data.message ||
          "Update failed!"
        );
      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Something went wrong!"
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
        flex
        items-center
        justify-center
        bg-gray-100
        text-black
      ">

        <h1 className="
          text-2xl
          font-bold
        ">

          Loading...

        </h1>

      </div>
    );
  }

  if (!session) {

    return null;
  }

  return (

    <div className="
      min-h-screen
      bg-black/70
      backdrop-blur-sm
      flex
      items-center
      justify-center
      px-4
      py-10
      text-black
    ">

      <div className="
        relative
        w-full
        max-w-5xl
        bg-white
        rounded-3xl
        shadow-2xl
        overflow-hidden
      ">

        {/* TOP BAR */}

        <div className="
          sticky
          top-0
          z-20
          bg-white
          border-b
          px-8
          py-5
          flex
          items-center
          justify-between
        ">

          <div>

            <h1 className="
              text-2xl
              md:text-3xl
              font-bold
              text-gray-900
            ">

              Update Tutor

            </h1>

            <p className="
              text-gray-500
              mt-1
            ">

              Edit tutor information beautifully

            </p>

          </div>

          <button
            onClick={() =>
              router.back()
            }
            className="
              w-11
              h-11
              rounded-full
              bg-gray-100
              hover:bg-red-100
              text-gray-500
              hover:text-red-500
              transition
              flex
              items-center
              justify-center
            "
          >

            <X size={22} />

          </button>

        </div>

        {/* FORM */}

        <form
          onSubmit={
            handleUpdate
          }
          className="
            p-8
            space-y-6
          "
        >

          {/* Tutor Name */}

          <div>

            <label className="block mb-2 font-medium">
              Tutor Name
            </label>

            <input
              type="text"
              name="tutorName"
              value={formData.tutorName}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-4"
            />

          </div>

          {/* GRID */}

          <div className="grid md:grid-cols-2 gap-5">

            {/* Photo */}

            <div>

              <label className="block mb-2 font-medium">
                Photo URL
              </label>

              <div className="relative">

                <ImageIcon
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type="text"
                  name="photo"
                  value={formData.photo}
                  onChange={handleChange}
                  className="w-full border rounded-xl pl-11 pr-4 py-4"
                />

              </div>

            </div>

            {/* Subject */}

            <div>

              <label className="block mb-2 font-medium">
                Subject
              </label>

              <div className="relative">

                <BookOpen
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border rounded-xl pl-11 pr-4 py-4"
                />

              </div>

            </div>

            {/* Location */}

            <div>

              <label className="block mb-2 font-medium">
                Location
              </label>

              <div className="relative">

                <MapPin
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border rounded-xl pl-11 pr-4 py-4"
                />

              </div>

            </div>

            {/* Hourly Fee */}

            <div>

              <label className="block mb-2 font-medium">
                Hourly Fee
              </label>

              <div className="relative">

                <DollarSign
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type="number"
                  name="hourlyFee"
                  value={formData.hourlyFee}
                  onChange={handleChange}
                  className="w-full border rounded-xl pl-11 pr-4 py-4"
                />

              </div>

            </div>

            {/* Available Days */}

            <div>

              <label className="block mb-2 font-medium">
                Available Days
              </label>

              <input
                type="text"
                name="availableDays"
                value={formData.availableDays}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-4"
              />

            </div>

            {/* Available Time */}

            <div>

              <label className="block mb-2 font-medium">
                Available Time
              </label>

              <div className="relative">

                <Clock3
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type="text"
                  name="availableTime"
                  value={formData.availableTime}
                  onChange={handleChange}
                  className="w-full border rounded-xl pl-11 pr-4 py-4"
                />

              </div>

            </div>

            {/* Total Slot */}

            <div>

              <label className="block mb-2 font-medium">
                Total Slots
              </label>

              <div className="relative">

                <Users
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type="number"
                  name="totalSlot"
                  value={formData.totalSlot}
                  onChange={handleChange}
                  className="w-full border rounded-xl pl-11 pr-4 py-4"
                />

              </div>

            </div>

            {/* Session Date */}

            <div>

              <label className="block mb-2 font-medium">
                Session Start Date
              </label>

              <div className="relative">

                <CalendarDays
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type="date"
                  name="sessionStartDate"
                  value={formData.sessionStartDate}
                  onChange={handleChange}
                  className="w-full border rounded-xl pl-11 pr-4 py-4"
                />

              </div>

            </div>

            {/* Institution */}

            <div>

              <label className="block mb-2 font-medium">
                Institution
              </label>

              <div className="relative">

                <School
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  className="w-full border rounded-xl pl-11 pr-4 py-4"
                />

              </div>

            </div>

            {/* Teaching Mode */}

            <div>

              <label className="block mb-2 font-medium">
                Teaching Mode
              </label>

              <select
                name="teachingMode"
                value={formData.teachingMode}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-4"
              >

                <option value="">
                  Select Mode
                </option>

                <option value="Online">
                  Online
                </option>

                <option value="Offline">
                  Offline
                </option>

                <option value="Hybrid">
                  Hybrid
                </option>

              </select>

            </div>

          </div>

          {/* Experience */}

          <div>

            <label className="block mb-2 font-medium">
              Experience
            </label>

            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              rows={5}
              className="w-full border rounded-xl px-4 py-4 resize-none"
            />

          </div>

          {/* BUTTONS */}

          <div className="
            flex
            items-center
            justify-end
            gap-4
            pt-6
          ">

            <button
              type="button"
              onClick={() =>
                router.back()
              }
              className="
                px-6
                py-3
                rounded-xl
                border
                font-semibold
              "
            >

              Cancel

            </button>

            <button
              type="submit"
              className="
                px-6
                py-3
                rounded-xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-500
                text-white
                font-semibold
                flex
                items-center
                gap-2
              "
            >

              <Save size={18} />

              Save Changes

            </button>

          </div>

        </form>

        </div>

    </div>
  );
}