import Image from "next/image";

import { FaStar } from "react-icons/fa";

export default function Testimonials() {

  const testimonials = [
    {
      id: 1,

      name: "Sarah Johnson",

      role: "Student",

      image:
        "https://i.ibb.co/7t8B7H2d/images.jpg",

      review:
        "TutorQueue made finding tutors very easy and flexible.",
    },

    {
      id: 2,

      name: "David Miller",

      role: "Student",

      image:
        "https://i.ibb.co/7t8B7H2d/images.jpg",

      review:
        "Amazing platform for booking learning sessions quickly.",
    },

    {
      id: 3,

      name: "Emma Watson",

      role: "Student",

      image:
        "https://i.ibb.co/7t8B7H2d/images.jpg",

      review:
        "The tutors are experienced and very supportive.",
    },
  ];

  return (

    <section className="py-6 md:py-10 lg:py-12">

      <div className="max-w-7xl mx-auto px-6">

        {/* ================= HEADING ================= */}

        <div className="text-center mb-8 md:mb-14">

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black dark:text-white">

            What Students Say

          </h2>

          <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">

            Trusted by students from different categories.

          </p>

        </div>

        {/* ================= TESTIMONIAL GRID ================= */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {testimonials.map(
            (testimonial) => (

              <div
                key={testimonial.id}
                className="
                  bg-white dark:bg-white/5
                  backdrop-blur-md

                  border border-gray-200 dark:border-white/10

                  rounded-3xl
                  p-8

                  shadow-lg dark:shadow-2xl

                  hover:-translate-y-2
                  hover:shadow-2xl

                  transition-all duration-300
                "
              >

                {/* ================= STARS ================= */}

                <div className="flex text-yellow-400 mb-5 gap-1">

                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />

                </div>

                {/* ================= REVIEW ================= */}

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">

                  "
                  {testimonial.review}
                  "

                </p>

                {/* ================= USER ================= */}

                <div className="flex items-center gap-4 mt-8">

                  <Image
                    src={
                      testimonial.image
                    }
                    alt={
                      testimonial.name
                    }
                    width={60}
                    height={60}
                    className="
                      rounded-full
                      object-cover
                      border-2 border-blue-500
                    "
                  />

                  <div>

                    <h4 className="font-bold text-lg text-black dark:text-white">

                      {
                        testimonial.name
                      }

                    </h4>

                    <p className="text-gray-500 dark:text-gray-400 text-sm">

                      {
                        testimonial.role
                      }

                    </p>

                  </div>

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </section>
  );
}