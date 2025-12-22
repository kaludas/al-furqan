import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  delay?: number;
}

export const GlassCard = ({ children, className, glow = false, delay = 0 }: GlassCardProps) => {
  return (
    <div
      className={cn(
        glow ? "glass-card-glow" : "glass-card",
        "p-6 md:p-8",
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};
