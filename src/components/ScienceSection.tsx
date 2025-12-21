import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";

const passages = [
  {
    topic: "Embryologie",
    verse: "« Nous avons créé l'homme d'un extrait d'argile, puis Nous en fîmes une goutte de sperme dans un reposoir solide. Ensuite, Nous avons fait du sperme une adhérence; et de l'adhérence Nous avons créé un embryon; puis, de cet embryon Nous avons créé des os et Nous avons revêtu les os de chair. »",
    reference: "Sourate Al-Mu'minun (23:12-14)",
    quran: "Description détaillée des stades embryonnaires (nutfa, alaqa, mudgha) correspondant aux observations modernes.",
    epoch: "Les connaissances grecques de Galien étaient imprécises sur l'ordre ossification/musculature.",
    occult: "L'alchimie médiévale parlait d'homunculus créés artificiellement, sans base embryologique.",
  },
  {
    topic: "Expansion de l'Univers",
    verse: "« Le ciel, Nous l'avons construit par Notre puissance et Nous l'étendons [constamment]. »",
    reference: "Sourate Adh-Dhariyat (51:47)",
    quran: "Le verbe 'musi'un' implique une expansion continue, concept validé par Hubble en 1929.",
    epoch: "L'univers était considéré statique par la science jusqu'au XXe siècle.",
    occult: "Les cosmologies ésotériques proposaient des émanations et sphères fixes, non une expansion.",
  },
  {
    topic: "Cycle de l'Eau",
    verse: "« N'as-tu pas vu qu'Allah fait descendre l'eau du ciel, puis Il l'achemine vers des sources dans la terre. »",
    reference: "Sourate Az-Zumar (39:21)",
    quran: "Description du cycle hydrologique complet : évaporation, précipitation, infiltration.",
    epoch: "Aristote pensait que l'eau souterraine venait de cavernes, non de l'infiltration.",
    occult: "Les quatre éléments hermétiques traitaient l'eau comme essence statique, non cyclique.",
  },
];

export const ScienceSection = () => {
  return (
    <section className="relative py-24 px-4">
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container max-w-6xl relative z-10">
        <SectionTitle
          arabicTitle="العلم في القرآن"
          title="Rigueur Scientifique"
          subtitle="Passages coraniques décrivant des phénomènes naturels comparés aux connaissances de l'époque et aux croyances ésotériques."
        />

        <div className="space-y-8">
          {passages.map((passage, index) => (
            <GlassCard key={index} className="animate-fade-up" delay={index * 150}>
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-3 mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium mb-3">
                    {passage.topic}
                  </span>
                  <blockquote className="text-foreground/90 italic border-l-2 border-primary pl-4">
                    {passage.verse}
                    <footer className="text-primary text-xs mt-2 not-italic font-medium">
                      {passage.reference}
                    </footer>
                  </blockquote>
                </div>
                
                <div className="p-4 rounded-lg bg-primary/10">
                  <h4 className="text-primary font-medium mb-2 text-sm">
                    📖 Description Coranique
                  </h4>
                  <p className="text-foreground/80 text-sm">
                    {passage.quran}
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="text-secondary-foreground font-medium mb-2 text-sm">
                    ⏳ Connaissance de l'Époque
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {passage.epoch}
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="text-muted-foreground font-medium mb-2 text-sm">
                    🔮 Croyances Ésotériques
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {passage.occult}
                  </p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
