// pages/HomePage.jsx

import AvailableTutors from "@/components/home/AvailableTutors";
import Categories from "@/components/home/Categories";
import HeroSection from "@/components/home/HeroSection";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";

const HomePage = () => {
  return (
    <main className="bg-[#020817] text-white min-h-screen overflow-hidden">
      
      {/* Hero Section */}
      <section>
        <HeroSection />
      </section>

      {/* Available Tutors */}
      <section className="py-20 px-4 md:px-8">
        <AvailableTutors />
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 md:px-8 bg-white/5">
        <WhyChooseUs />
      </section>

      {/* Categories */}
      <section className="py-20 px-4 md:px-8">
        <Categories />
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 md:px-8 bg-white/5">
        <Testimonials />
      </section>
    </main>
  );
};

export default HomePage;