import { Reveal } from "@/components/ui/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  theme = "dark",
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  theme?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  const muted = theme === "dark" ? "text-muted-dark" : "text-muted-light";
  const eyebrowColor = theme === "dark" ? "text-white/45" : "text-ink/45";

  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-3xl text-center" : ""} ${className}`}
    >
      {eyebrow ? (
        <Reveal y={18}>
          <p className={`eyebrow mb-5 ${eyebrowColor}`}>{eyebrow}</p>
        </Reveal>
      ) : null}
      <Reveal y={26} delay={0.05}>
        <h2 className="display-lg text-[clamp(2rem,4.6vw,3.8rem)]">{title}</h2>
      </Reveal>
      {description ? (
        <Reveal y={22} delay={0.12}>
          <p className={`mt-6 max-w-xl text-[17px] leading-relaxed ${muted} ${align === "center" ? "mx-auto" : ""}`}>
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}