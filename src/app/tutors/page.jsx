// app/tutors/page.jsx

import TutorsSearchFilter from "@/components/TutorsSearchFilter";

export default function TutorsPage() {

  return (

    <div
      className="
        min-h-screen
        bg-gray-100
        dark:bg-gradient-to-b
        dark:from-[#020817]
        dark:to-[#071226]
        text-black
        dark:text-white
        px-6
        py-12
        transition-colors
        duration-300
      "
    >

      {/* ================= HEADING ================= */}

      <div className="text-center mb-14">

        <h1
          className="
            text-4xl
            md:text-5xl
            font-black
            mb-4
          "
        >

          Our Tutors

        </h1>

        <p
          className="
            text-gray-600
            dark:text-gray-400
            text-lg
          "
        >

          Learn from expert tutors and
          book your preferred session
          easily.

        </p>

      </div>

      {/* ================= SEARCH + FILTER + TUTORS ================= */}

      <TutorsSearchFilter />

    </div>
  );
}