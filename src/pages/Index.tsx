import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ExpertChat } from "@/components/ExpertChat";
import { ReligionComparator } from "@/components/ReligionComparator";
import { IjazModule } from "@/components/IjazModule";
import { ProphetTimeline } from "@/components/ProphetTimeline";
import { PropheciesModule } from "@/components/PropheciesModule";
import { ScienceLab } from "@/components/ScienceLab";
import { TawhidSection } from "@/components/TawhidSection";
import { FitraTest } from "@/components/FitraTest";
import { SymbolScanner } from "@/components/SymbolScanner";
import { Footer } from "@/components/Footer";
import { HamanModule } from "@/components/HamanModule";
import { RingCompositionModule } from "@/components/RingCompositionModule";
import { EntropyModule } from "@/components/EntropyModule";
import { OccultDisenchantmentModule } from "@/components/OccultDisenchantmentModule";


const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div id="hero">
        <HeroSection />
      </div>
      <ExpertChat />
      <SymbolScanner />
      <ReligionComparator />
      <div id="tawhid">
        <TawhidSection />
      </div>
      <HamanModule />
      <RingCompositionModule />
      <IjazModule />
      <ScienceLab />
      <EntropyModule />
      <OccultDisenchantmentModule />
      <PropheciesModule />
      <ProphetTimeline />
      <FitraTest />
      <Footer />
      
    </main>
  );
};

export default Index;
