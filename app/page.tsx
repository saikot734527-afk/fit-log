import HeroSection from "@/components/home/HeroSection";
import LibrarySection from "@/components/home/LibrarySection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0c0d12] pb-20">
      <HeroSection />
      <LibrarySection />
    </div>
  );
}
