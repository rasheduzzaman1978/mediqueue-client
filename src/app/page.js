
import AvailableTutors from "@/components/home/AvailableTutors";

import Categories from "@/components/home/Categories";

import HeroSection from "@/components/home/HeroSection";

import WhyChooseUs from "@/components/home/WhyChooseUs";

export const metadata = {
  title: "Home | Mediqueue",
};

const HomePage = () => {

  return (

    <main className="
      min-h-screen
      overflow-hidden

      text-black dark:text-white

      transition-colors duration-300
    ">

      {/* ================= HERO SECTION ================= */}

      <section className="px-4 md:px-8 pt-8">

        <HeroSection />

      </section>

      {/* ================= AVAILABLE TUTORS ================= */}

      <section className="py-20 px-4 md:px-8">

        <AvailableTutors />

      </section>

      {/* ================= WHY CHOOSE US ================= */}

      <section className="
        py-6 md:py-8 lg:py-12 px-4 md:px-8

        bg-black/[0.02]
        dark:bg-white/[0.02]

        backdrop-blur-md
      ">

        <WhyChooseUs />

      </section>

      {/* ================= CATEGORIES ================= */}

      <section className="py-20 px-4 md:px-8">

        <Categories />

      </section>

      

    </main>
  );
};

export default HomePage;