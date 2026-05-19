import Image from "next/image";
import Link from "next/link";

export default function AvailableTutors() {

  const tutors = [
    {
      id: 1,
      name: "John Doe",
      subject: "Mathematics",
      fee: "$25/hr",
      time: "5 PM - 8 PM",
      experience: "5+ years experience",
      image:
        "https://i.ibb.co.com/j1K0Dt1/desktop-wallpaper-list-of-most-liked-facebook-pages-in-bangladesh-shakib-al-hasan.jpg",
    },

    {
      id: 2,
      name: "Sarah Wilson",
      subject: "Physics",
      fee: "$30/hr",
      time: "4 PM - 7 PM",
      experience: "Expert physics tutor",
      image:
        "https://i.ibb.co.com/j1K0Dt1/desktop-wallpaper-list-of-most-liked-facebook-pages-in-bangladesh-shakib-al-hasan.jpg",
    },

    {
      id: 3,
      name: "Michael Brown",
      subject: "Programming",
      fee: "$40/hr",
      time: "6 PM - 10 PM",
      experience: "Professional web mentor",
      image:
        "https://i.ibb.co.com/j1K0Dt1/desktop-wallpaper-list-of-most-liked-facebook-pages-in-bangladesh-shakib-al-hasan.jpg",
    },

    {
      id: 4,
      name: "Emma Watson",
      subject: "Biology",
      fee: "$28/hr",
      time: "3 PM - 6 PM",
      experience: "Biology specialist",
      image:
        "https://i.ibb.co.com/j1K0Dt1/desktop-wallpaper-list-of-most-liked-facebook-pages-in-bangladesh-shakib-al-hasan.jpg",
    },

    {
      id: 5,
      name: "David Miller",
      subject: "English",
      fee: "$20/hr",
      time: "7 PM - 9 PM",
      experience: "English language expert",
      image:
        "https://i.ibb.co.com/j1K0Dt1/desktop-wallpaper-list-of-most-liked-facebook-pages-in-bangladesh-shakib-al-hasan.jpg",
    },

    {
      id: 6,
      name: "Sophia Lee",
      subject: "Chemistry",
      fee: "$35/hr",
      time: "2 PM - 5 PM",
      experience: "Chemistry tutor",
      image:
        "https://i.ibb.co.com/j1K0Dt1/desktop-wallpaper-list-of-most-liked-facebook-pages-in-bangladesh-shakib-al-hasan.jpg",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold">
          Available Tutors
        </h2>

        <p className="text-gray-400 mt-4">
          Discover experienced tutors easily.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {tutors.map((tutor) => (
          <div
            key={tutor.id}
            className="bg-[#0B1120] border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500 transition"
          >
            <Image
              src={tutor.image}
              alt={tutor.name}
              width={500}
              height={300}
              className="w-full h-60 object-cover"
            />

            <div className="p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">
                  {tutor.name}
                </h3>

                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                  {tutor.subject}
                </span>
              </div>

              <p className="text-gray-400 mt-4">
                {tutor.experience}
              </p>

              <div className="flex justify-between mt-6 text-sm text-gray-300">
                <span>{tutor.fee}</span>

                <span>{tutor.time}</span>
              </div>

              <Link
                href="/tutors"
                className="block text-center bg-blue-600 hover:bg-blue-700 mt-6 py-3 rounded-xl font-semibold transition"
              >
                Book Session
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}