import { HeroSection } from "@/components/HeroSection";
import { ChatSection } from "@/components/ChatSection";
import { IjazSection } from "@/components/IjazSection";
import { TawhidSection } from "@/components/TawhidSection";
import { ScienceSection } from "@/components/ScienceSection";
import { IlmGnoseSection } from "@/components/IlmGnoseSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ChatSection />
      <IjazSection />
      <TawhidSection />
      <ScienceSection />
      <IlmGnoseSection />
      <Footer />
    </main>
  );
};

export default Index;
