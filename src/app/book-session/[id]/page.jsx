import BookingForm from "@/components/BookingForm";

async function getTutor(id) {

  const res = await fetch(
    `http://127.0.0.1:5000/tutors/${id}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function BookSessionPage({
  params,
}) {

  const { id } = await params;

  const tutor = await getTutor(id);

  return (
    <div className="min-h-screen bg-[#020817] text-white p-10">

      <div className="max-w-3xl mx-auto bg-[#071226] border border-white/10 rounded-3xl p-10">

        <h1 className="text-4xl font-black mb-8">
          Book Session
        </h1>

        <BookingForm tutor={tutor} />

      </div>

    </div>
  );
}