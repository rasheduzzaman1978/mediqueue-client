import Image from "next/image";

import { FaStar } from "react-icons/fa";

export default function Testimonials() {

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Student",
      image:
        "https://i.ibb.co.com/7t8B7H2d/images.jpg",
      review:
        "TutorQueue made finding tutors very easy and flexible.",
    },

    {
      id: 2,
      name: "David Miller",
      role: "Student",
      image:
        "https://i.ibb.co.com/7t8B7H2d/images.jpg",
      review:
        "Amazing platform for booking learning sessions quickly.",
    },

    {
      id: 3,
      name: "Emma Watson",
      role: "Student",
      image:
        "https://i.ibb.co.com/7t8B7H2d/images.jpg",
      review:
        "The tutors are experienced and very supportive.",
    },
  ];

  return (
    <section className="bg-[#0B1120] py-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">
            What Students Say
          </h2>

          <p className="text-gray-400 mt-4">
            Trusted by students from different categories.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white/5 p-8 rounded-3xl"
            >
              <div className="flex text-yellow-400 mb-4 gap-1">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className="text-gray-400 leading-relaxed">
                "{testimonial.review}"
              </p>

              <div className="flex items-center gap-4 mt-6">

                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />

                <div>
                  <h4 className="font-semibold">
                    {testimonial.name}
                  </h4>

                  <p className="text-gray-500 text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}