import AvailableTutors from "@/components/home/AvailableTutors";
import HeroSection from "@/components/home/HeroSection";


export default function HomePage() {
  return (
    <div className="bg-[#020817] text-white">
      <HeroSection />
      <AvailableTutors />
     
    </div>
  );
}