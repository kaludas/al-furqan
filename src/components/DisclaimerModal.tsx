import { useState } from "react";
import { Scale, BookOpen, FlaskConical, MessageCircle, Building, Shield, FileText, AlertTriangle, Mail, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const DisclaimerModal = () => {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);

  const content = {
    fr: {
      trigger: "Mentions Légales",
      title: "Mentions Légales & Politique de Confidentialité",
      warning: "⚠️ Avertissement : Ce site analyse des courants ésotériques et des symboles occultes à des fins de réfutation et d'éducation théologique. Certains contenus visuels ou textuels peuvent heurter la sensibilité des plus jeunes ou des personnes non averties.",
      tabs: {
        legal: "Mentions Légales",
        privacy: "Confidentialité",
        terms: "CGU",
      },
      legalSection: {
        title: "1. Mentions Légales",
        items: [
          {
            label: "Éditeur du site",
            value: "Le site Al-Furqan : Le Discriminateur est édité par Webstori.",
          },
          {
            label: "SIRET",
            value: "98503478400019",
          },
          {
            label: "Contact",
            value: "contact.webstori@gmail.com",
          },
        ],
        hosting: {
          title: "Hébergement",
          company: "Hostwinds LLC",
          address: "12101 Tukwila International Blvd, 3rd Floor Suite 320, Seattle, WA 98168, USA",
          phone: "(888) 404-1279",
          email: "legal@hostwinds.com",
        },
        intellectual: {
          title: "Propriété intellectuelle",
          content: "L'ensemble de l'interface, des algorithmes de comparaison et des textes originaux (analyses, synthèses) est la propriété exclusive de l'éditeur. Les citations de textes sacrés (Coran, Bible, Torah) et les extraits d'ouvrages historiques ou ésotériques restent la propriété de leurs auteurs ou ayants droit respectifs et sont utilisés à des fins d'analyse et d'enseignement.",
        },
      },
      privacySection: {
        title: "2. Politique de Confidentialité (RGPD)",
        dataCollection: {
          title: "Collecte des données",
          intro: "Nous collectons uniquement les données strictement nécessaires au fonctionnement des outils :",
          items: [
            "Images : Les images que vous uploadez pour l'analyse des symboles.",
            "Données techniques : Votre adresse IP (pour la sécurité et la prévention des abus).",
          ],
        },
        retention: {
          title: "Durée de conservation",
          items: [
            "Images : Elles sont traitées instantanément par l'IA et sont supprimées de nos serveurs après analyse. Nous ne conservons aucune base de données de vos images personnelles.",
            "Logs : Les données de connexion sont conservées pour une durée maximale de 12 mois.",
          ],
        },
        cookies: {
          title: "Cookies",
          content: "Ce site utilise des cookies essentiels au fonctionnement de la session et des outils de mesure d'audience anonymes. Vous pouvez les refuser via les réglages de votre navigateur.",
        },
      },
      termsSection: {
        title: "3. Conditions Générales d'Utilisation (CGU)",
        items: [
          {
            icon: BookOpen,
            title: "Clause de non-responsabilité (IA)",
            content: "Les analyses et \"Verdicts\" sont générés par une Intelligence Artificielle. Bien que programmée sur des sources académiques et théologiques rigoureuses, l'IA peut commettre des erreurs factuelles ou interprétatives. L'utilisateur est tenu de vérifier les informations auprès de sources primaires.",
          },
          {
            icon: Shield,
            title: "Usage autorisé",
            content: "L'utilisateur s'engage à ne pas détourner les outils (Scanner, Miroir d'Iblis) pour générer des contenus incitant à la haine, à la violence ou à la discrimination.",
          },
          {
            icon: Scale,
            title: "Absence de valeur juridique ou cléricale",
            content: "Le contenu de ce site est strictement éducatif et apologétique. Les conclusions présentées ne constituent en aucun cas une Fatwa, un avis juridique ou une direction spirituelle officielle. Pour toute question de pratique religieuse, veuillez consulter un savant qualifié.",
          },
        ],
      },
      footer: "En utilisant cette plateforme, vous reconnaissez avoir lu et accepté ces mentions.",
    },
    en: {
      trigger: "Legal Notice",
      title: "Legal Notices & Privacy Policy",
      warning: "⚠️ Warning: This site analyzes esoteric currents and occult symbols for the purposes of refutation and theological education. Some visual or textual content may be sensitive for younger audiences or uninformed persons.",
      tabs: {
        legal: "Legal Notices",
        privacy: "Privacy",
        terms: "Terms",
      },
      legalSection: {
        title: "1. Legal Notices",
        items: [
          {
            label: "Site Editor",
            value: "The site Al-Furqan: The Discriminator is published by Webstori.",
          },
          {
            label: "SIRET",
            value: "98503478400019",
          },
          {
            label: "Contact",
            value: "contact.webstori@gmail.com",
          },
        ],
        hosting: {
          title: "Hosting",
          company: "Hostwinds LLC",
          address: "12101 Tukwila International Blvd, 3rd Floor Suite 320, Seattle, WA 98168, USA",
          phone: "(888) 404-1279",
          email: "legal@hostwinds.com",
        },
        intellectual: {
          title: "Intellectual Property",
          content: "The entire interface, comparison algorithms, and original texts (analyses, syntheses) are the exclusive property of the publisher. Quotations from sacred texts (Quran, Bible, Torah) and excerpts from historical or esoteric works remain the property of their respective authors or rights holders and are used for analysis and teaching purposes.",
        },
      },
      privacySection: {
        title: "2. Privacy Policy (GDPR)",
        dataCollection: {
          title: "Data Collection",
          intro: "We collect only the data strictly necessary for the operation of the tools:",
          items: [
            "Images: The images you upload for symbol analysis.",
            "Technical data: Your IP address (for security and abuse prevention).",
          ],
        },
        retention: {
          title: "Data Retention",
          items: [
            "Images: They are processed instantly by the AI and are deleted from our servers after analysis. We do not maintain any database of your personal images.",
            "Logs: Connection data is retained for a maximum of 12 months.",
          ],
        },
        cookies: {
          title: "Cookies",
          content: "This site uses cookies essential for session operation and anonymous audience measurement tools. You can refuse them via your browser settings.",
        },
      },
      termsSection: {
        title: "3. Terms of Use",
        items: [
          {
            icon: BookOpen,
            title: "AI Disclaimer",
            content: "Analyses and \"Verdicts\" are generated by Artificial Intelligence. Although programmed on rigorous academic and theological sources, the AI may make factual or interpretive errors. Users are required to verify information from primary sources.",
          },
          {
            icon: Shield,
            title: "Authorized Use",
            content: "Users agree not to misuse the tools (Scanner, Mirror of Iblis) to generate content inciting hatred, violence, or discrimination.",
          },
          {
            icon: Scale,
            title: "No Legal or Clerical Value",
            content: "The content of this site is strictly educational and apologetic. The conclusions presented do not constitute a Fatwa, legal opinion, or official spiritual direction. For any questions regarding religious practice, please consult a qualified scholar.",
          },
        ],
      },
      footer: "By using this platform, you acknowledge that you have read and accepted these notices.",
    },
  };

  const t = content[language as keyof typeof content] || content.fr;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
          <Scale className="w-4 h-4" />
          {t.trigger}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] p-0 glass-card border-glass">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-3 text-xl font-display text-gradient-gold">
            <Scale className="w-6 h-6 text-primary" />
            {t.title}
          </DialogTitle>
        </DialogHeader>
        
        {/* Warning Banner */}
        <div className="mx-6 mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
          <p className="text-xs text-amber-200/90 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            {t.warning}
          </p>
        </div>

        <Tabs defaultValue="legal" className="w-full">
          <TabsList className="w-full justify-start px-6 pt-4 bg-transparent border-b border-glass rounded-none">
            <TabsTrigger value="legal" className="data-[state=active]:bg-primary/20">
              <Building className="w-4 h-4 mr-2" />
              {t.tabs.legal}
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-primary/20">
              <Shield className="w-4 h-4 mr-2" />
              {t.tabs.privacy}
            </TabsTrigger>
            <TabsTrigger value="terms" className="data-[state=active]:bg-primary/20">
              <FileText className="w-4 h-4 mr-2" />
              {t.tabs.terms}
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[50vh] px-6 py-4">
            {/* Legal Notices Tab */}
            <TabsContent value="legal" className="mt-0 space-y-4">
              <h3 className="font-display text-lg text-foreground">{t.legalSection.title}</h3>
              
              <div className="space-y-3">
                {t.legalSection.items.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="text-sm font-medium text-primary">{item.label} :</span>
                    <span className="text-sm text-muted-foreground">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-lg bg-background/30 border border-glass mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-5 h-5 text-primary" />
                  <h4 className="font-medium text-foreground">{t.legalSection.hosting.title}</h4>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p className="font-medium">{t.legalSection.hosting.company}</p>
                  <p>{t.legalSection.hosting.address}</p>
                  <p>Tel: {t.legalSection.hosting.phone}</p>
                  <p className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {t.legalSection.hosting.email}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-background/30 border border-glass">
                <h4 className="font-medium text-foreground mb-2">{t.legalSection.intellectual.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.legalSection.intellectual.content}
                </p>
              </div>
            </TabsContent>

            {/* Privacy Tab */}
            <TabsContent value="privacy" className="mt-0 space-y-4">
              <h3 className="font-display text-lg text-foreground">{t.privacySection.title}</h3>
              
              <div className="p-4 rounded-lg bg-background/30 border border-glass">
                <h4 className="font-medium text-foreground mb-2">{t.privacySection.dataCollection.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{t.privacySection.dataCollection.intro}</p>
                <ul className="space-y-1">
                  {t.privacySection.dataCollection.items.map((item, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-background/30 border border-glass">
                <h4 className="font-medium text-foreground mb-2">{t.privacySection.retention.title}</h4>
                <ul className="space-y-2">
                  {t.privacySection.retention.items.map((item, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-background/30 border border-glass">
                <h4 className="font-medium text-foreground mb-2">{t.privacySection.cookies.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.privacySection.cookies.content}
                </p>
              </div>
            </TabsContent>

            {/* Terms Tab */}
            <TabsContent value="terms" className="mt-0 space-y-4">
              <h3 className="font-display text-lg text-foreground">{t.termsSection.title}</h3>
              
              {t.termsSection.items.map((item, index) => (
                <div key={index} className="p-4 rounded-lg bg-background/30 border border-glass">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-display text-base text-foreground">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.content}
                  </p>
                </div>
              ))}
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="p-4 border-t border-glass">
          <p className="text-xs text-muted-foreground text-center">
            {t.footer}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
