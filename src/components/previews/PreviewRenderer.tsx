import { LuminaPreview } from "@/components/previews/LuminaPreview";
import { HSBotPreview } from "@/components/previews/HSBotPreview";
import { LedgerPreview } from "@/components/previews/LedgerPreview";
import { PhishingPreview } from "@/components/previews/PhishingPreview";
import { HSCODEPreview } from "@/components/previews/HSCODEPreview";
import { AcademiaPreview } from "@/components/previews/AcademiaPreview";
import { PendulumPreview } from "@/components/previews/PendulumPreview";

const registry: Record<string, React.ComponentType<{ className?: string }>> = {
  pendulum: PendulumPreview,
  lumina: LuminaPreview,
  hsbot: HSBotPreview,
  ledger: LedgerPreview,
  phishing: PhishingPreview,
  hscode: HSCODEPreview,
  academia: AcademiaPreview,
};

export function PreviewRenderer({
  preview,
  className,
}: {
  preview: string;
  className?: string;
}) {
  const Component = registry[preview] ?? LuminaPreview;
  return <Component className={className} />;
}