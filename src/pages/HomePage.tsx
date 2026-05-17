import VideoBackground from "../components/VideoBackground";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

export default function HomePage() {
  return (
    <>
      <VideoBackground />
      <Navbar />
      <main>
        <HeroSection />
      </main>
    </>
  );
}
