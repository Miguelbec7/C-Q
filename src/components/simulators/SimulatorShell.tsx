import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AlertTriangle, HelpCircle } from "lucide-react";

export function SimulatorShell({
  title,
  description,
  breadcrumbLabel,
  children,
}: {
  title: string;
  description: string;
  breadcrumbLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ label: "Simuladores", href: "/simuladores" }, { label: breadcrumbLabel, href: "#" }]} />

      <div className="bg-navy-950 py-12 sm:py-16">
        <Container>
          <h1 className="max-w-2xl text-balance text-3xl font-bold text-white sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-balance text-navy-300">{description}</p>
        </Container>
      </div>

      <Container className="py-10 sm:py-14">
        {children}

        <div className="mt-10 flex items-start gap-3 rounded-2xl border border-gold-200 bg-gold-50 p-4 text-sm text-navy-700">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold-600" />
          <p>
            Simulação meramente indicativa, baseada em pressupostos simplificados. Não dispensa a análise
            detalhada das condições de crédito pelas instituições financeiras nem constitui proposta
            contratual. Para uma análise personalizada, fale com a C&amp;Q Finanças.
          </p>
        </div>
      </Container>
    </div>
  );
}

export function HelpTooltip({ children }: { children: React.ReactNode }) {
  return (
    <span className="group relative inline-flex">
      <HelpCircle className="h-3.5 w-3.5 cursor-help text-navy-300" tabIndex={0} />
      <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-72 -translate-x-1/2 rounded-xl border border-navy-100 bg-white p-3 text-left text-xs font-normal leading-relaxed text-navy-600 opacity-0 shadow-premium transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
        {children}
      </span>
    </span>
  );
}

export function FieldLabel({
  children,
  tooltip,
}: {
  children: React.ReactNode;
  tooltip?: React.ReactNode;
}) {
  return (
    <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-navy-700">
      {children}
      {tooltip && <HelpTooltip>{tooltip}</HelpTooltip>}
    </label>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  placeholder,
  suffix,
  step = "any",
  tooltip,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  suffix?: string;
  step?: string;
  tooltip?: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <div>
      <FieldLabel tooltip={tooltip}>{label}</FieldLabel>
      <div className="relative">
        <input
          type="number"
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full rounded-xl border border-navy-200 bg-white px-4 py-2.5 text-navy-900 outline-none transition-colors focus:border-navy-400 focus:ring-2 focus:ring-navy-100 disabled:cursor-not-allowed disabled:bg-navy-50 disabled:text-navy-400"
        />
        {suffix && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-navy-400">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  tooltip,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  tooltip?: React.ReactNode;
}) {
  return (
    <div>
      <FieldLabel tooltip={tooltip}>{label}</FieldLabel>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-navy-200 bg-white px-4 py-2.5 text-navy-900 outline-none transition-colors focus:border-navy-400 focus:ring-2 focus:ring-navy-100"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ResultStat({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "gold" | "success" | "danger";
}) {
  const toneClasses: Record<string, string> = {
    default: "text-navy-950",
    gold: "text-gold-600",
    success: "text-emerald-600",
    danger: "text-red-600",
  };
  return (
    <div className="rounded-xl bg-navy-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-navy-400">{label}</p>
      <p className={`mt-1 text-xl font-bold ${toneClasses[tone]}`}>{value}</p>
    </div>
  );
}
