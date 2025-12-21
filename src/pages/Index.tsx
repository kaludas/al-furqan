import { HeroSection } from "@/components/HeroSection";
import { IjazSection } from "@/components/IjazSection";
import { TawhidSection } from "@/components/TawhidSection";
import { ScienceSection } from "@/components/ScienceSection";
import { IlmGnoseSection } from "@/components/IlmGnoseSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <IjazSection />
      <TawhidSection />
      <ScienceSection />
      <IlmGnoseSection />
      <Footer />
    </main>
  );
};

export default Index;
