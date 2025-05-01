import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";

function Home() {
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white to-gray-300">
        <Navbar />
        <HeroSection />
      </div>
      <FeaturesSection />
    </>
  );
}

export default Home;
