import AvailableTutors from "@/components/home/AvailableTutors";
import Categories from "@/components/home/Categories";
import HeroSection from "@/components/home/HeroSection";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";


export default function HomePage() {
  return (
    <div className="bg-[#020817] text-white">
      <HeroSection />
      <AvailableTutors />
      {/* Other sections like WhyChooseUs, Testimonials, etc. can be added here */}
      <WhyChooseUs />
      <Categories />
      <Testimonials />
     
    </div>
  );
}