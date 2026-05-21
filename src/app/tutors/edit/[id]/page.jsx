"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  X,
  Save,
  BookOpen,
  MapPin,
  DollarSign,
} from "lucide-react";

import {
  ToastContainer,
  toast,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function TutorsEditPage({
  params,
}) {

  const { id } = React.use(params);

  const router = useRouter();

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

  // FETCH TUTOR
  useEffect(() => {

    async function fetchTutor() {

      try {

        const res = await fetch(
          `http://localhost:5000/tutors/${id}`
        );

        const data = await res.json();

        setFormData(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    }

    fetchTutor();

  }, [id]);

  // HANDLE CHANGE
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

  // HANDLE UPDATE
 const handleUpdate = async (e) => {

  e.preventDefault();

  try {

    const res = await fetch(
      `http://127.0.0.1:5000/tutors/${id}`,
      {
        method: "PATCH",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          formData
        ),
      }
    );

    const data =
      await res.json();

    console.log(data);

    if (data.success) {

      toast.success(
        "Tutor Updated Successfully!"
      );

      setTimeout(() => {

        router.push(
          "/my-tutors"
        );

      }, 1500);

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

  return (

    <div className="min-h-screen bg-black/70 backdrop-blur-sm flex items-center justify-center px-4 py-10">

      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* TOP BAR */}
        <div className="sticky top-0 z-20 bg-white border-b px-8 py-5 flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-gray-900">

              Update Tutor
            </h1>

            <p className="text-gray-500 mt-1">

              Edit tutor information beautifully
            </p>
          </div>

          {/* CLOSE BUTTON */}
          <button
            onClick={() => router.back()}
            className="w-11 h-11 rounded-full bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-500 transition flex items-center justify-center"
          >

            <X size={22} />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleUpdate}
          className="p-8 space-y-7"
        >

          {/* Tutor Name */}
          <div>

            <label className="text-sm font-medium text-gray-700 mb-2 block">

              Tutor Name
            </label>

            <input
              type="text"
              name="tutorName"
              value={formData.tutorName}
              onChange={handleChange}
              placeholder="Enter tutor name"
              className="w-full border border-gray-200 rounded-xl px-5 py-4 outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition"
            />
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 gap-5">

            {/* Subject */}
            <div>

              <label className="text-sm font-medium text-gray-700 mb-2 block">

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
                  placeholder="Subject"
                  className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-4 outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition"
                />
              </div>
            </div>

            {/* Location */}
            <div>

              <label className="text-sm font-medium text-gray-700 mb-2 block">

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
                  placeholder="Location"
                  className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-4 outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition"
                />
              </div>
            </div>

            {/* Hourly Fee */}
            <div>

              <label className="text-sm font-medium text-gray-700 mb-2 block">

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
                  placeholder="Hourly Fee"
                  className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-4 outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition"
                />
              </div>
            </div>

            {/* Available Days */}
            <div>

              <label className="text-sm font-medium text-gray-700 mb-2 block">

                Available Days
              </label>

              <input
                type="text"
                name="availableDays"
                value={formData.availableDays}
                onChange={handleChange}
                placeholder="Available Days"
                className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition"
              />
            </div>

            {/* Available Time */}
            <div>

              <label className="text-sm font-medium text-gray-700 mb-2 block">

                Available Time
              </label>

              <input
                type="text"
                name="availableTime"
                value={formData.availableTime}
                onChange={handleChange}
                placeholder="Available Time"
                className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition"
              />
            </div>

            {/* Institution */}
            <div>

              <label className="text-sm font-medium text-gray-700 mb-2 block">

                Institution
              </label>

              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder="Institution"
                className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition"
              />
            </div>

            {/* Teaching Mode */}
            <div>

              <label className="text-sm font-medium text-gray-700 mb-2 block">

                Teaching Mode
              </label>

              <input
                type="text"
                name="teachingMode"
                value={formData.teachingMode}
                onChange={handleChange}
                placeholder="Teaching Mode"
                className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition"
              />
            </div>

            {/* Session Date */}
            <div>

              <label className="text-sm font-medium text-gray-700 mb-2 block">

                Session Date
              </label>

              <input
                type="date"
                name="sessionStartDate"
                value={
                  formData.sessionStartDate
                }
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition"
              />
            </div>

            {/* Total Slot */}
            <div>

              <label className="text-sm font-medium text-gray-700 mb-2 block">

                Total Slot
              </label>

              <input
                type="number"
                name="totalSlot"
                value={formData.totalSlot}
                onChange={handleChange}
                placeholder="Total Slot"
                className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition"
              />
            </div>
          </div>

          {/* IMAGE URL */}
          <div>

            <label className="text-sm font-medium text-gray-700 mb-2 block">

              Tutor Photo URL
            </label>

            <input
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              placeholder="Paste image URL"
              className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition"
            />
          </div>

          {/* EXPERIENCE */}
          <div>

            <label className="text-sm font-medium text-gray-700 mb-2 block">

              Experience
            </label>

            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              rows={6}
              placeholder="Tutor Experience"
              className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 resize-none transition"
            />
          </div>

          {/* BUTTONS */}
<div className="flex items-center justify-end gap-4 pt-8 border-t border-gray-200 mt-8">
  {/* Cancel Button */}
  <button
    type="button"
    onClick={() => router.back()}
    className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm font-semibold flex items-center gap-2 shadow-sm"
  >
    <X size={18} />
    Cancel
  </button>

  {/* Save Button */}
  <button
    type="submit"
    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black font-semibold text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200"
  >
    <Save size={18} />
    Save Changes
  </button>
</div>
        </form>
      </div>

      {/* TOAST */}
      <ToastContainer />
    </div>
  );
}