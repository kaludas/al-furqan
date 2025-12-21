import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  arabicTitle?: string;
  subtitle?: string;
  className?: string;
}

export const SectionTitle = ({ title, arabicTitle, subtitle, className }: SectionTitleProps) => {
  return (
    <div className={cn("text-center mb-12", className)}>
      {arabicTitle && (
        <p className="text-2xl md:text-3xl text-gradient-gold font-display mb-2 animate-glow-pulse">
          {arabicTitle}
        </p>
      )}
      <h2 className="text-3xl md:text-5xl font-display font-semibold text-foreground mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          {subtitle}
        </p>
      )}
      <div className="mt-6 flex justify-center">
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>
    </div>
  );
};
