import Navbar from "components/Navbar";
import HeroSection from "components/HeroSection";
import FeaturesSection from "components/FeaturesSection";
import FeedbacksSection from "components/FeedbacksSection";
import PlansSection from "components/PlansSection";

function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white to-neutral-300">
        <Navbar />
        <HeroSection />
      </div>
      <FeaturesSection />
      <FeedbacksSection />
      <PlansSection />
    </>
  );
}

export default Home;
