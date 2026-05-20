// app/add-tutor/page.jsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AddTutorPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const handleAddTutor = async (e) => {
    e.preventDefault();

    setLoading(true);

    const form = e.target;

    const tutorData = {
      tutorName: form.tutorName.value,
      photo: form.photo.value,
      subject: form.subject.value,
      availableDays:
        form.availableDays.value,
      availableTime:
        form.availableTime.value,
      hourlyFee: form.hourlyFee.value,
      totalSlot: form.totalSlot.value,
      sessionStartDate:
        form.sessionStartDate.value,
      institution:
        form.institution.value,
      experience:
        form.experience.value,
      location: form.location.value,
      teachingMode:
        form.teachingMode.value,

      createdAt: new Date(),
    };

    try {
      const res = await fetch(
        "http://localhost:5000/tutors",
        {
          method: "POST",
          headers: {
            "content-type":
              "application/json",
          },
          body: JSON.stringify(
            tutorData
          ),
        }
      );

      const data = await res.json();

      if (data.insertedId) {
        toast.success(
          "Tutor added successfully!"
        );

        form.reset();

        setTimeout(() => {
          router.push("/tutors");
        }, 1000);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to add tutor!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white py-16 px-6">

      <div className="max-w-4xl mx-auto bg-[#0B1120] border border-white/10 rounded-3xl p-8 md:p-12">

        {/* Heading */}
        <div className="text-center mb-10">

          <h1 className="text-4xl font-black">
            Add New Tutor
          </h1>

          <p className="text-gray-400 mt-4">
            Create tutor profile and
            start offering learning
            sessions.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleAddTutor}
          className="space-y-8"
        >

          {/* Row 1 */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Tutor Name */}
            <div>
              <label className="block mb-2 font-medium">
                Tutor Name
              </label>

              <input
                type="text"
                name="tutorName"
                required
                placeholder="Enter tutor name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Photo */}
            <div>
              <label className="block mb-2 font-medium">
                Photo URL
              </label>

              <input
                type="text"
                name="photo"
                required
                placeholder="Enter image URL"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Subject */}
            <div>
              <label className="block mb-2 font-medium">
                Subject / Category
              </label>

              <select
                name="subject"
                required
                className="w-full text-black bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="">
                  Select Subject
                </option>

                <option value="Mathematics">
                  Mathematics
                </option>

                <option value="Physics">
                  Physics
                </option>

                <option value="Biology">
                  Biology
                </option>

                <option value="Programming">
                  Programming
                </option>

                <option value="English">
                  English
                </option>

                <option value="Chemistry">
                  Chemistry
                </option>
              </select>
            </div>

            {/* Teaching Mode */}
            <div>
              <label className="block mb-2 font-medium">
                Teaching Mode
              </label>

              <select
                name="teachingMode"
                required
                className="w-full text-black bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
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

                <option value="Both">
                  Both
                </option>
              </select>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Available Days */}
            <div>
              <label className="block mb-2 font-medium">
                Available Days
              </label>

              <input
                type="text"
                name="availableDays"
                required
                placeholder="Example: Sun - Thu"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Available Time */}
            <div>
              <label className="block mb-2 font-medium">
                Available Time Slot
              </label>

              <input
                type="text"
                name="availableTime"
                required
                placeholder="Example: 5 PM - 8 PM"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Hourly Fee */}
            <div>
              <label className="block mb-2 font-medium">
                Hourly Fee
              </label>

              <input
                type="number"
                name="hourlyFee"
                required
                placeholder="Enter hourly fee"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Total Slot */}
            <div>
              <label className="block mb-2 font-medium">
                Total Slot
              </label>

              <input
                type="number"
                name="totalSlot"
                required
                placeholder="Enter total slots"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Row 5 */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Session Date */}
            <div>
              <label className="block mb-2 font-medium">
                Session Start Date
              </label>

              <input
                type="date"
                name="sessionStartDate"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block mb-2 font-medium">
                Location
              </label>

              <input
                type="text"
                name="location"
                required
                placeholder="Area / City"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Institution */}
          <div>
            <label className="block mb-2 font-medium">
              Institution
            </label>

            <input
              type="text"
              name="institution"
              required
              placeholder="Enter institution name"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block mb-2 font-medium">
              Experience
            </label>

            <textarea
              name="experience"
              rows="5"
              required
              placeholder="Write tutor experience..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            ></textarea>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-4 rounded-2xl font-bold text-lg disabled:opacity-50"
          >
            {loading
              ? "Adding Tutor..."
              : "Add Tutor"}
          </button>
        </form>
      </div>
    </div>
  );
}