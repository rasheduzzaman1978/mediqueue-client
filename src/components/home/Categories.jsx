export default function Categories() {

  const categories = [
    "Mathematics",
    "Physics",
    "Biology",
    "Programming",
    "English",
    "Chemistry",
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold">
          Popular Categories
        </h2>

        <p className="text-gray-400 mt-4">
          Browse tutors by categories.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

        {categories.map((category) => (
          <div
            key={category}
            className="bg-[#0B1120] hover:bg-blue-600 transition duration-300 rounded-2xl py-10 text-center font-semibold cursor-pointer"
          >
            {category}
          </div>
        ))}
      </div>
    </section>
  );
}