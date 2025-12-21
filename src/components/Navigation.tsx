import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
const navItems = [{
  id: "hero",
  label: "Accueil",
  arabic: "الرئيسية"
}, {
  id: "expert",
  label: "Expert IA",
  arabic: "الخبير"
}, {
  id: "ijaz",
  label: "I'jaz",
  arabic: "الإعجاز"
}, {
  id: "timeline",
  label: "Chronologie",
  arabic: "التاريخ"
}, {
  id: "laboratory",
  label: "Laboratoire",
  arabic: "المختبر"
}, {
  id: "tawhid",
  label: "Tawhid",
  arabic: "التوحيد"
}, {
  id: "fitra",
  label: "Fitra",
  arabic: "الفطرة"
}];
export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Find active section
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
      setIsMobileOpen(false);
    }
  };
  return <>
      <nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-500", isScrolled ? "glass-card py-3 border-b border-glass" : "py-6 bg-transparent")}>
        <div className="container max-w-7xl flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2">القرآن
Al Furqan<span className="text-2xl font-display text-gradient-gold">القرآن</span>
            <span className="hidden sm:block text-foreground font-display text-lg">Al </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.slice(1).map(item => <button key={item.id} onClick={() => scrollTo(item.id)} className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300", activeSection === item.id ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50")}>
                {item.label}
              </button>)}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="lg:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors">
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={cn("fixed inset-0 z-40 lg:hidden transition-all duration-500", isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}>
        <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
        <div className="relative h-full flex flex-col items-center justify-center gap-4 p-8">
          {navItems.map(item => <button key={item.id} onClick={() => scrollTo(item.id)} className={cn("flex items-center gap-4 px-6 py-3 rounded-xl text-lg font-display transition-all duration-300", activeSection === item.id ? "bg-primary/20 text-primary" : "text-foreground hover:bg-secondary/50")}>
              <span className="text-gradient-gold">{item.arabic}</span>
              <span>{item.label}</span>
            </button>)}
        </div>
      </div>
    </>;
};