import { ElectronPreview } from "@/components/previews/ElectronPreview";
import { LuminaPreview } from "@/components/previews/LuminaPreview";
import { HSBotPreview } from "@/components/previews/HSBotPreview";
import { LedgerPreview } from "@/components/previews/LedgerPreview";
import { PhishingPreview } from "@/components/previews/PhishingPreview";
import { HSCODEPreview } from "@/components/previews/HSCODEPreview";
import { AcademiaPreview } from "@/components/previews/AcademiaPreview";
import { PendulumPreview } from "@/components/previews/PendulumPreview";
import { GalaxyVisionPreview } from "@/components/previews/GalaxyVisionPreview";
import { GravityLLMPreview } from "@/components/previews/GravityLLMPreview";

const registry: Record<string, React.ComponentType<{ className?: string }>> = {
  "gravity-llm": GravityLLMPreview,
  electron: ElectronPreview,
  pendulum: PendulumPreview,
  lumina: LuminaPreview,
  hsbot: HSBotPreview,
  ledger: LedgerPreview,
  phishing: PhishingPreview,
  hscode: HSCODEPreview,
  academia: AcademiaPreview,
  "galaxy-vision": GalaxyVisionPreview,
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
