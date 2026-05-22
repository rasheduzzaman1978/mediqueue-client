"use client";

import { useRouter } from "next/navigation";

export default function Categories() {

  const router = useRouter();

  const categories = [
    "Mathematics",
    "Physics",
    "Biology",
    "Programming",
    "English",
    "Chemistry",
  ];

  // HANDLE CATEGORY CLICK

  const handleCategoryClick = (
    category
  ) => {

    router.push(
      `/find-tutors?category=${category}`
    );
  };

  return (

    <section className="max-w-7xl mx-auto px-6 py-6 md:py-10 lg:py-12">

      {/* HEADING */}

      <div className="text-center mb-8">

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black dark:text-white">

          Popular Categories

        </h2>

        <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">

          Browse tutors easily by your preferred learning category.

        </p>

      </div>

      {/* CATEGORY GRID */}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

        {categories.map(
          (category) => (

            <button
              key={category}
              onClick={() =>
                handleCategoryClick(
                  category
                )
              }
              className="bg-white dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white shadow-lg dark:shadow-2xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 rounded-3xl py-10 px-4 text-center font-bold text-black dark:text-white cursor-pointer"
            >

              {category}

            </button>
          )
        )}

      </div>

    </section>
  );
}