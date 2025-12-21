import { HeroSection } from "@/components/HeroSection";
import { IjazSection } from "@/components/IjazSection";
import { TawhidSection } from "@/components/TawhidSection";
import { ScienceSection } from "@/components/ScienceSection";
import { IlmGnoseSection } from "@/components/IlmGnoseSection";
import { Footer } from "@/components/Footer";
import { ChatInterface } from "@/components/ChatInterface";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <IjazSection />
      <TawhidSection />
      <ScienceSection />
      <IlmGnoseSection />
      <Footer />
      <ChatInterface />
    </main>
  );
};

export default Index;
