import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";

const miracles = [
  {
    title: "Structure Linguistique Unique",
    description: "Le Coran utilise un style qui n'est ni poésie (shi'r), ni prose (nathr), mais une forme inédite (nazm) qui a défié les maîtres de la langue arabe.",
    verse: "« Dis : Si les hommes et les djinns s'unissaient pour produire quelque chose de semblable à ce Coran, ils n'y parviendraient pas, même s'ils s'aidaient mutuellement. »",
    reference: "Sourate Al-Isra (17:88)",
  },
  {
    title: "Cohérence Interne Parfaite",
    description: "Révélé sur 23 ans dans des contextes variés, le Coran maintient une cohérence thématique et stylistique impossible à reproduire humainement.",
    verse: "« Ne méditent-ils pas sur le Coran ? S'il provenait d'un autre que Dieu, ils y trouveraient de nombreuses contradictions. »",
    reference: "Sourate An-Nisa (4:82)",
  },
  {
    title: "Le Défi Non Relevé",
    description: "Depuis 1400 ans, malgré de nombreuses tentatives, aucun texte n'a pu égaler la richesse rhétorique d'une seule sourate.",
    verse: "« Si vous avez un doute sur ce que Nous avons révélé à Notre serviteur, produisez donc une sourate semblable. »",
    reference: "Sourate Al-Baqara (2:23)",
  },
];

export const IjazSection = () => {
  return (
    <section className="relative py-24 px-4">
      <div className="container max-w-6xl">
        <SectionTitle
          arabicTitle="الإعجاز القرآني"
          title="L'Inimitabilité du Coran"
          subtitle="Les preuves linguistiques traditionnellement citées comme témoignages de l'origine divine du texte sacré."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {miracles.map((miracle, index) => (
            <GlassCard key={index} delay={index * 150} className="animate-fade-up">
              <div className="h-full flex flex-col">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <span className="text-gradient-gold font-display text-xl font-bold">{index + 1}</span>
                </div>
                
                <h3 className="font-display text-xl text-foreground mb-3">
                  {miracle.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-6 flex-grow">
                  {miracle.description}
                </p>
                
                <blockquote className="border-l-2 border-primary pl-4 italic text-foreground/90 text-sm mb-2">
                  {miracle.verse}
                </blockquote>
                
                <p className="text-primary text-xs font-medium">
                  {miracle.reference}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
