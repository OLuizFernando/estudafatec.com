import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

function Home() {
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <Navbar />
        <HeroSection />
      </div>
    </>
  );
}

export default Home;
