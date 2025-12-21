import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ExpertChat } from "@/components/ExpertChat";
import { IjazModule } from "@/components/IjazModule";
import { ProphetTimeline } from "@/components/ProphetTimeline";
import { ScienceLab } from "@/components/ScienceLab";
import { TawhidSection } from "@/components/TawhidSection";
import { FitraTest } from "@/components/FitraTest";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div id="hero">
        <HeroSection />
      </div>
      <ExpertChat />
      <IjazModule />
      <ProphetTimeline />
      <ScienceLab />
      <div id="tawhid">
        <TawhidSection />
      </div>
      <FitraTest />
      <Footer />
    </main>
  );
};

export default Index;
